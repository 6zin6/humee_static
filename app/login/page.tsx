"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Building2, Users, Loader2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { useRouter, useSearchParams } from "next/navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

const loginSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
})

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [ redirectUrl, setRedirectUrl ] = useState('/dashboard');
  const [userType, setUserType] = useState<"company" | "facility">("company");
  const [ isLoading, setIsLoading ] = useState(false);
  const [ loginError, setLoginError ] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams) {
      const redirect = searchParams.get('redirect');
      if (redirect) {
        setRedirectUrl(redirect);
      }
    }
  }, [searchParams]);
  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)
    setLoginError(null)

    try {
      const supabase = createClient();

      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) throw error

      const userData = data.user?.user_metadata
      const userRole = userData?.role 

      let dashboardPath = '/dashboard'

      if (userRole === 'company') {
        dashboardPath = '/dashboard/company'
      } else if (userRole === 'facility') {
        dashboardPath = '/dashboard/facility'
      }

      const finalRedirectUrl = redirectUrl !== '/dashboard' ? redirectUrl : dashboardPath

      router.push(finalRedirectUrl);
      router.refresh()
    } catch (error) {
      console.error('ログインエラー', error);

      if (error instanceof Error) {
        if (error.message.includes('Invalid login credentials')) {
          setLoginError('メールアドレスまたはパスワードが正しくありません')
        } else if (error.message.includes('Email not confirmed')) {
          setLoginError('メールアドレスが確認されていません。メールをご確認ください')
        } else {
          setLoginError(error.message)
        }
      } else {
        setLoginError('ログイン処理中にエラーが発生しました')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6" />
            <span className="font-bold">Humme</span>
          </Link>
          <ThemeToggle />
        </div>
      </header>

      <main className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">ログイン</CardTitle>
              <CardDescription>
                アカウントにログインして、サービスをご利用ください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={userType} onValueChange={(value) => setUserType(value as "company" | "facility")} className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="company" className="flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    企業
                  </TabsTrigger>
                  <TabsTrigger value="facility" className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    福祉施設
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {loginError && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>メールアドレス</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder={userType === "company" ? "company@example.com" : "facility@example.com"}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>パスワード</FormLabel>
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
                        <Loader2 className="mr-2 h-4 w-4 animate-spin">
                          ログイン中...
                        </Loader2>
                      </>
                    ) : (
                      "ログイン"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="text-sm text-muted-foreground text-center">
                アカウントをお持ちでない方は
                <Link
                  href={`/register/${userType}`}
                  className="text-primary hover:underline"
                >
                  新規登録
                </Link>
                へ
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:underline text-center"
              >
                パスワードをお忘れの方
              </Link>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}