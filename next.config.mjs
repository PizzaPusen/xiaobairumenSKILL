/** @type {import('next').NextConfig} */
const repo = "xiaobairumenSKILL";
const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : undefined,
  images: {
    unoptimized: true,
  },
  // 修复 Windows 下 EISDIR readlink 错误
  webpack: (config) => {
    config.resolve.symlinks = false;
    if (process.platform === "win32") {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
