"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // 간단한 인증 체크
    if (
      username === process.env.NEXT_PUBLIC_AUTH_USERNAME &&
      password === process.env.NEXT_PUBLIC_AUTH_PASSWORD
    ) {
      // 로그인 성공 시 쿠키 설정
      document.cookie = `dalian_auth=${JSON.stringify({
        username,
        isLoggedIn: true,
        loginTime: Date.now(),
      })}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7일

      // 메인 페이지로 리다이렉트
      router.push("/");
    } else {
      setError("아이디 또는 비밀번호가 잘못되었습니다.");
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">로그인</h2>
        <p className="mt-1 text-sm text-gray-600">
          관리자 계정으로 로그인하세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            아이디
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="아이디를 입력하세요"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-3">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? "로그인 중..." : "로그인"}
        </button>
      </form>
    </div>
  );
}
