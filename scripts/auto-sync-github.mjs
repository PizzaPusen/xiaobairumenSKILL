#!/usr/bin/env node
/**
 * 自动将本地修改 commit + push 到 GitHub main。
 * --watch  监听文件变化（打开项目时后台运行）
 * --once   单次延迟同步（Cursor 钩子调用）
 */
import { execSync, spawn } from "child_process";
import { watch } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const BRANCH = "main";
const WATCH_DEBOUNCE_MS = 20_000;
const ONCE_DEBOUNCE_MS = 8_000;

const IGNORE = /^(node_modules|\.next|out|\.git)([\\/]|$)|\.env(\.local)?$|auto-sync\.lock$/;

let debounceTimer;
let syncing = false;

function log(...args) {
  console.log(`[auto-sync ${new Date().toLocaleTimeString("zh-CN")}]`, ...args);
}

function gitEnv() {
  const safe = ROOT.replace(/\\/g, "/");
  return {
    ...process.env,
    GIT_CONFIG_COUNT: "1",
    GIT_CONFIG_KEY_0: "safe.directory",
    GIT_CONFIG_VALUE_0: safe,
  };
}

function run(cmd) {
  return execSync(cmd, { cwd: ROOT, encoding: "utf8", env: gitEnv(), stdio: ["pipe", "pipe", "pipe"] });
}

function hasChanges() {
  const status = run("git status --porcelain");
  return status.trim().length > 0;
}

function sync() {
  if (syncing) return;
  syncing = true;
  try {
    if (!hasChanges()) {
      log("无变更，跳过");
      return;
    }
    run("git add -A");
    const msg = `auto-sync: ${new Date().toISOString().replace("T", " ").slice(0, 19)}`;
    run(`git commit -m "${msg}"`);
    run("git -c http.version=HTTP/1.1 push origin " + BRANCH);
    log("已推送到 GitHub，Actions 将自动部署站点");
  } catch (err) {
    const detail = err.stderr?.toString?.() || err.stdout?.toString?.() || err.message;
    log("失败:", detail.trim());
  } finally {
    syncing = false;
  }
}

function scheduleSync(delay) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(sync, delay);
}

function shouldIgnore(filepath) {
  const rel = path.relative(ROOT, filepath);
  if (!rel || rel.startsWith("..")) return true;
  return IGNORE.test(rel.replace(/\\/g, "/"));
}

function startWatch() {
  log(`监听中… 停止修改约 ${WATCH_DEBOUNCE_MS / 1000}s 后自动推送`);
  watch(ROOT, { recursive: true }, (_event, filename) => {
    if (!filename || shouldIgnore(filename)) return;
    scheduleSync(WATCH_DEBOUNCE_MS);
  });
}

function startOnce() {
  scheduleSync(ONCE_DEBOUNCE_MS);
  setTimeout(() => process.exit(0), ONCE_DEBOUNCE_MS + 60_000);
}

const mode = process.argv.includes("--once") ? "once" : "watch";

if (mode === "once") {
  startOnce();
} else {
  startWatch();
  process.stdin.resume();
}
