"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"

const ResetPasswordConfirm = () => {
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
                <div className="w-full max-w-md text-center">
                <h1 className="text-2xl font-bold mb-6">パスワードリセットメールを送信しました</h1>
                
                <div className="bg-card p-6 rounded-lg shadow-md mb-8">
                    <p className="mb-4">
                    {email ? `${email} 宛` : ''}にパスワードリセットメールを送信しました。
                    </p>
                    <p className="mb-6">
                    メール内のリンクをクリックして、新しいパスワードを設定してください。
                    </p>
                    <div className="text-sm text-muted-foreground">
                    <p>メールが届かない場合は、迷惑メールフォルダもご確認ください。</p>
                    <p className="mt-2">数分経ってもメールが届かない場合は、再度お試しください。</p>
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    <Link href="/forgot-password" passHref>
                    <Button variant="outline" className="w-full">
                        パスワードリセットをやり直す
                    </Button>
                    </Link>
                    <Link href="/login" passHref>
                    <Button variant="ghost" className="w-full">
                        ログインページへ戻る
                    </Button>
                    </Link>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordConfirm