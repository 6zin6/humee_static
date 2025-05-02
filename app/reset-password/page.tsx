"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useSearchParams } from "next/navigation";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "パスワードは8文字以上で入力してください"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    let isMounted = true;
    
    const checkAuthStatus = async () => {
      try {
        // Supabaseクライアントを初期化（毎回新しいインスタンスを作成）
        const supabase = createClient();
        console.log("Supabaseクライアント初期化");
        
        // URLにcodeパラメータがある場合、サーバー側認証フロー（PKCE）を使用している可能性がある
        const code = searchParams?.get('code');
        if (code) {
          console.log("URLにcodeパラメータがあります:", code);
          
          try {
            // codeを使用してセッションを交換
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) {
              console.error("コード交換エラー:", error);
              throw error;
            }
            
            if (data.session) {
              console.log("セッション交換成功!");
              if (isMounted) {
                setIsTokenValid(true);
              }
            }
          } catch (e) {
            console.error("コード交換中のエラー:", e);
            if (isMounted) {
              setErrorMessage("認証情報の交換に失敗しました。リンクが無効か期限切れの可能性があります。");
            }
          }
        } else {
          // URLのハッシュを確認する（暗黙的フロー）
          console.log("URLハッシュを確認中...");
          
          // 現在のセッションを確認
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("セッション取得エラー:", error);
            if (isMounted) {
              setErrorMessage("認証セッションの取得に失敗しました");
            }
          } else if (data.session) {
            console.log("既存のセッションが見つかりました");
            if (isMounted) {
              setIsTokenValid(true);
            }
          } else {
            console.log("セッションが見つかりません");
            if (isMounted) {
              setErrorMessage("パスワードリセットのリンクが無効か期限切れです。再度リセットをお試しください。");
            }
          }
        }
      } catch (error) {
        console.error("認証チェックエラー:", error);
        if (isMounted) {
          setErrorMessage("認証処理中にエラーが発生しました");
        }
      } finally {
        // 認証チェック完了
        if (isMounted) {
          setIsAuthChecking(false);
        }
      }
    };

    // 少し遅延を入れてから認証状態をチェック
    const timer = setTimeout(() => {
      checkAuthStatus();
    }, 1000);

    return () => {
      // コンポーネントがアンマウントされたらクリーンアップ
      isMounted = false;
      clearTimeout(timer);
    };
  }, [searchParams]);

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();

      // パスワードの更新
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });

      if (error) {
        console.error("パスワード更新エラー:", error);
        throw new Error(error.message);
      }

      console.log("パスワード更新成功");
      // 成功したら完了ページへリダイレクト
      router.push("/reset-password-success");
    } catch (error) {
      console.error("パスワード更新処理エラー:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "パスワードの更新に失敗しました"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">新しいパスワードの設定</h1>

          {isAuthChecking ? (
            <div className="flex justify-center items-center p-8">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              <span className="ml-3">認証情報を確認中...</span>
            </div>
          ) : isTokenValid ? (
            <>
              {errorMessage && (
                <div className="bg-red-100 dark:bg-red-900 p-4 rounded-md mb-6">
                  <p className="text-red-800 dark:text-red-100">{errorMessage}</p>
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>新しいパスワード</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormDescription>
                          8文字以上で入力してください
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>新しいパスワード（確認）</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="mr-2">処理中...</span>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                      </>
                    ) : (
                      "パスワードを更新する"
                    )}
                  </Button>
                </form>
              </Form>
            </>
          ) : (
            <div className="bg-yellow-100 dark:bg-yellow-900 p-6 rounded-lg">
              <p className="text-yellow-800 dark:text-yellow-100 mb-4">{errorMessage}</p>
              <div className="flex justify-center">
                <Link href="/forgot-password">
                  <Button>パスワードリセットをやり直す</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;