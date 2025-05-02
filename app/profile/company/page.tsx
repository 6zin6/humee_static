
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import CompanyProfileClient from './client-component'
import Header from "@/components/Header";

export default async function CompanyProfile() {
  const supabase = createClient();

  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    redirect('/login');
  }

  const company = await prisma.company.findFirst({
    where: {
      email: session.user.email,
    }
  });

  if (!company) {
    return (
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-4">企業情報が見つかりません</h1>
        <p>企業情報の登録が完了していないようです。管理者にお問い合わせください。</p>
      </div>
    )
  }

  const industryMap: { [key: string]: string} = {
    it: "IT・通信",
    manufacturing: "製造",
    retail: "小売",
    service: "サービス",
    finance: "金融",
    other: "その他"
  }

  const companySizeMap: { [key: string]: string} = {
    small: "小規模（50人未満）",
    medium: "中規模（50-300人）",
    large: "大規模（300人以上）"
  }

  return (
    <div className="min-h-screen bg-background">
      <Header/>

      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          <CompanyProfileClient 
            company={company}
            industryDisplay={industryMap[company.industry] || company.industry}
            companySizeDisplay={companySizeMap[company.companySize] || company.companySize}
          />
        </div>
      </main>
    </div>
  )
}