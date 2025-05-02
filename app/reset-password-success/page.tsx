"use client"

import Header from "@/components/Header";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ResetPasswordSuccess = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header/>

            <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
                <div className="w-full max-w-md text-center">
                    <div className="flex justify-center mb-6">
                        <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                    
                    <h1 className="text-2xl font-bold mb-6">パスワードの変更が完了しました</h1>
                    
                    <div className="bg-card p-6 rounded-lg shadow-md mb-8">
                        <p className="mb-4">
                        パスワードが正常に更新されました。
                        </p>
                        <p className="mb-4">
                        新しいパスワードで再度ログインしてください。
                        </p>
                    </div>

                    <div className="flex flex-col space-y-4">
                        <Link href="/login" passHref>
                        <Button className="w-full">
                            ログインページへ
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
    )
}

export default ResetPasswordSuccess