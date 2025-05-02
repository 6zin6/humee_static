"use client"

import { Button } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { Heart, Menu, X } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from "next/navigation";
import { Session } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet"

const Header = () => {
    const [ session, setSession ] = useState<Session | null>(null)
    const [ loading, setLoading ] = useState(true)
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const supabase = createClient();

        const getInitialSession = async () => {
            setLoading(true)
            try {
                const { data: { session } } = await supabase.auth.getSession()
                setSession(session)
            } catch (error) {
                console.error('セッション取得エラー', error)
            } finally {
                setLoading(false)
            }
        }

        getInitialSession()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    const isAuthPage = pathname === '/login' || pathname === '/register/company' || pathname === '/resister/facility'

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between">
                {/* ロゴ部分 - 常に表示 */}
                <div className="flex items-center">
                    <a className="flex items-center space-x-2" href="/">
                        <Heart className="h-6 w-6" />
                        <span className="font-bold">Humee</span>
                    </a>
                    {/* デスクトップ表示時のナビゲーション */}
                    <div className="hidden md:block ml-6">
                        <MainNav />
                    </div>
                </div>

                {/* 右側のアクション部分 */}
                <div className="flex items-center space-x-2">
                    <ThemeToggle />
                    <Button variant="outline" asChild className="hidden md:inline-flex">
                        <Link href="/contact">
                            お問い合わせ
                        </Link>
                    </Button>

                    {/* モバイル用ハンバーガーメニュー */}
                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">メニューを開く</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
                            <div className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center">
                                        <Heart className="h-6 w-6 mr-2" />
                                        <span className="font-bold">Humee</span>
                                    </div>
                                </div>
                                
                                <div className="space-y-4 flex-1">
                                    <div className="flex flex-col space-y-2">
                                        <Link 
                                            href="/about" 
                                            className="flex items-center py-2 px-3 rounded-md hover:bg-muted"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Humeeとは
                                        </Link>
                                        <Link 
                                            href="/contact" 
                                            className="flex items-center py-2 px-3 rounded-md hover:bg-muted"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            お問い合わせ
                                        </Link>
                                    </div>
                                </div>
                                
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}

export default Header