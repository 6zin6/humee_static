"use client";

import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function AuthError() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
        <div className="w-full max-w-md text-center">
          <div className="flex justify-center mb-6">
            <AlertTriangle className="h-16 w-16 text-yellow-500" />
          </div>
          
          <h1 className="text-2xl font-bold mb-6">認証エラー</h1>
          
          <div className="bg-card p-6 rounded-lg shadow-md mb-8">
            <p className="mb-4">
              認証処理中にエラーが発生しました。
            </p>
            <p className="mb-4">
              パスワードリセットリンクが無効か期限切れの可能性があります。再度パスワードリセットをお試しください。
            </p>
          </div>

          <div className="flex flex-col space-y-4">
            <Link href="/forgot-password" passHref>
              <Button className="w-full">
                パスワードリセットをやり直す
              </Button>
            </Link>
            
            <Link href="/" passHref>
              <Button variant="ghost" className="w-full">
                トップページへ戻る
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}