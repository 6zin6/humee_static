"use client"

import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";


const VerifiedPage = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const supabase = createClient();
            const { data } = await supabase.auth.getSession();

            if (data.session) {
                setIsAuthenticated(true);
            }
        };

        checkAuth();
    }, []);

    const handleLogin = () => {
        if(isAuthenticated) {
            router.push('/profile/company');
        } else {
            router.push('/login');
        }
    }

  return (
    <div className="min-h-screen bg-background">
        <Header />

        <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
            <div className="w-full max-w-md text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                
                <h1 className="text-3xl font-bold mb-6">メール認証が完了しました</h1>
                
                <div className="bg-card p-6 rounded-lg shadow-md mb-8">
                    <p className="mb-4">
                    おめでとうございます！アカウント登録が完了しました。
                    </p>
                    <p className="mb-4">
                    これで全ての機能をご利用いただけます。
                    </p>
                </div>

                <div className="flex flex-col space-y-4">
                    <Button 
                    onClick={handleLogin} 
                    className="w-full"
                    >
                    {isAuthenticated ? 'プロフィールへ進む' : 'ログインする'}
                    </Button>
                    
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

export default VerifiedPage