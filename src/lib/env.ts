import { z } from "zod";

// 환경변수 스키마 정의
const envSchema = z.object({
  // Node.js 환경
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  // Next.js 공개 환경변수
  NEXT_PUBLIC_APP_URL: z.url().default("http://localhost:3000"),
  NEXT_PUBLIC_APP_NAME: z.string().default("Dalian"),

  // 서버 전용 환경변수 (필요시 주석 해제)
  DATABASE_URL: z.url(),
  // API_SECRET_KEY: z.string().min(32),
  // GOOGLE_CLIENT_ID: z.string(),
  // GOOGLE_CLIENT_SECRET: z.string(),

  // 프로덕션에서만 필수인 환경변수 예시
  // ...(process.env.NODE_ENV === 'production' ? {
  //   SENTRY_DSN: z.string().url(),
  //   ANALYTICS_ID: z.string(),
  // } : {}),
});

// 환경변수 타입 추출
export type Env = z.infer<typeof envSchema>;

// 환경변수 검증 함수
function validateEnv(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.issues.map(
        issue => `${issue.path.join(".")}: ${issue.message}`
      );

      throw new Error(
        `❌ Invalid environment variables:\n${missingVars.join("\n")}\n\n` +
          `Please check your .env.local file and ensure all required variables are set.`
      );
    }
    throw error;
  }
}

// 검증된 환경변수 export
export const env = validateEnv();

// 개발 환경에서만 검증 결과 로깅
if (env.NODE_ENV === "development") {
  console.log("✅ Environment variables validated successfully");
}
