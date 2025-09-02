import type { Config } from "tailwindcss";

const config: Config = {
  // 필수: Tailwind가 스타일을 적용할 파일들 지정
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  // 선택: 기본 디자인 확장 (나중에 필요할 때 추가)
  theme: {
    extend: {
      // CSS 변수와 연동되는 색상들
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
};

export default config;
