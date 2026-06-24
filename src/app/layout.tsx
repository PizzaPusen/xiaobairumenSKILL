import type { Metadata } from "next";
import { Playfair_Display, Inter, Noto_Serif_SC } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-hero",
  weight: ["300", "400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIGC 片场 - 从影视到 AIGC，一站上手",
  description: "为影视人打造的 AIGC 学习与创作工具箱，零门槛、本地即开即用",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${notoSerifSC.variable} font-sans film-grain`}
        style={{
          backgroundColor: "hsl(230, 25%, 5%)",
          color: "hsl(210, 20%, 98%)",
          margin: 0,
        }}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <main className="container mx-auto px-4 sm:px-6 py-10 pb-28 md:pb-12 min-h-screen max-w-6xl">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
