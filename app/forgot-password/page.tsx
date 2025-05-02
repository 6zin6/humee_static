"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import { useState } from "react";
import Header from "@/components/Header";

const forgotPasswordSchema = z.object({
    email: z.string().email("有効なメールアドレスを入力してください"),
});

const ForgotPassword = () => {
    const router = useRouter();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ successMessage, setSuccessMessage ] = useState<string | null>(null);
    const [ errorMessage, setErrorMessage ] = useState<string | null>(null);

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        }
    });

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        setIsLoading(true);
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const supabase = createClient();

            const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw new Error(error.message);

            setSuccessMessage(
                `パスワードリセット用のメールを ${values.email} に送信しました。メール内のリンクをクリックしてパスワードをリセットしてください。`
            );

            router.push(`/reset-password-confirm?email=${encodeURIComponent(values.email)}`);
        } catch (error) {
            console.error('パスワードリセットエラー', error);
            setErrorMessage(
                error instanceof Error ? error.message : "パスワードリセットメールの送信に失敗しました"
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
                <h1 className="text-2xl font-bold mb-6">パスワードをお忘れの方</h1>

                {successMessage ? (
                    <div className="bg-green-100 dark:bg-green-900 p-4 rounded-md mb-6">
                    <p className="text-green-800 dark:text-green-100">{successMessage}</p>
                    </div>
                ) : (
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
                            name="email"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>メールアドレス</FormLabel>
                                <FormControl>
                                <Input
                                    type="email"
                                    placeholder="登録したメールアドレス"
                                    {...field}
                                />
                                </FormControl>
                                <FormDescription>
                                パスワードリセット用のメールを送信します
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                            <>
                                <span className="mr-2">送信中...</span>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                            </>
                            ) : (
                            "パスワードリセットメールを送信"
                            )}
                        </Button>
                        </form>
                    </Form>

                    <div className="mt-6 text-center">
                        <Link href="/login" className="text-sm text-primary hover:underline">
                        ログインページに戻る
                        </Link>
                    </div>
                    </>
                )}
                </div>
            </div>
        </div>
    )

}

export default ForgotPassword