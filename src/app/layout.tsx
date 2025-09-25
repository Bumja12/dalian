import { StackProvider, StackTheme } from "@stackframe/stack";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { stackServerApp } from "@/stack";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // 기본 정보
  title: "Dalian | 당신의 프로젝트",
  description: "현대적인 웹 애플리케이션 플랫폼",

  // SEO 최적화
  keywords: ["웹", "애플리케이션", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Your Name" }],
  creator: "Your Name",

  // 오픈 그래프 (페이스북, 링크드인 등 소셜 미디어 공유용)
  openGraph: {
    title: "Dalian | 당신의 프로젝트",
    description: "현대적인 웹 애플리케이션 플랫폼",
    url: "https://your-domain.com",
    siteName: "Dalian",
    images: [
      {
        url: "/og-image.jpg", // public 폴더에 og-image.jpg 추가 필요
        width: 1200,
        height: 630,
        alt: "Dalian 프로젝트",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },

  // 트위터 카드
  twitter: {
    card: "summary_large_image",
    title: "Dalian | 당신의 프로젝트",
    description: "현대적인 웹 애플리케이션 플랫폼",
    images: ["/og-image.jpg"],
    creator: "@your_twitter", // 트위터 계정이 있다면
  },

  // 추가 메타 태그들
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // 뷰포트 및 테마
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },

  // 파비콘 및 앱 아이콘
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <div className="min-h-screen bg-white">{children}</div>
          </StackTheme>
        </StackProvider>
      </body>
    </html>
  );
}
