// app/dashboard/company/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Building2, Heart, Mail, Phone, MapPin } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

export default async function CompanyDashboard() {
  const supabase = createClient()
  
  // セッション確認
  const { data: { session } } = await (await supabase).auth.getSession()
  
  if (!session) {
    redirect('/login')
  }
  
  // ユーザーに紐づく企業情報を取得
  const company = await prisma.company.findFirst({
    where: {
      email: session.user.email,
    },
  })
  
  if (!company) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">企業情報が見つかりません</h1>
        <p>企業情報の登録が完了していないようです。管理者にお問い合わせください。</p>
      </div>
    )
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

        <div className="container py-8">
            <h1 className="text-2xl font-bold mb-6">企業ダッシュボード</h1>
        
            <div className="bg-card rounded-lg shadow p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">企業情報</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="text-muted-foreground">会社名</p>
                    <p className="font-medium">{company.companyName}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">メールアドレス</p>
                    <p className="font-medium">{company.email}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">代表者名</p>
                    <p className="font-medium">{company.representative}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">電話番号</p>
                    <p className="font-medium">{company.phoneNumber}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">住所</p>
                    <p className="font-medium">
                    〒{company.postalCode} {company.prefecture}{company.city}{company.address}
                    </p>
                </div>
                <div>
                    <p className="text-muted-foreground">業界</p>
                    <p className="font-medium">{company.industry}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">企業規模</p>
                    <p className="font-medium">{company.companySize}</p>
                </div>
                {company.websiteUrl && (
                    <div>
                    <p className="text-muted-foreground">WebサイトURL</p>
                    <p className="font-medium">{company.websiteUrl}</p>
                    </div>
                )}
                </div>
            </div>
        
        {/* ここに他のダッシュボード機能を追加 */}
        </div>

    </div>
    
  )
}