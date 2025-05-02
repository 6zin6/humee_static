"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import ImageUpload from "@/components/ImageUpload";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building2, Heart, Mail, Phone, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

type Company = {
  id: string;
  companyName: string;
  email: string;
  representative: string;
  phoneNumber: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  companySize: string;
  industry: string;
  description: string | null;
  websiteUrl: string | null;
  imageUrl: string | null;
  created_at: Date;
  updated_at: Date;
}

type CompanyProfileClientProps = {
  company: Company;
  industryDisplay: string;
  companySizeDisplay: string;
}

const companyProfileSchema = z.object({
  companyName: z.string().min(1, "会社名を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  representative: z.string().min(1, "代表者名を入力してください"),
  phoneNumber: z.string().min(1, "電話番号を入力してください"),
  address: z.string().min(1, "住所を入力してください"),
  companySize: z.string().min(1, "企業規模を選択してください"),
  industry: z.string().min(1, "業界を選択してください"),
  description: z.string(),
  websiteUrl: z.string().url("有効なURLを入力してください").optional().or(z.literal("")),
  imageUrl: z.string().optional(),
})

export default function CompanyProfileClient({
  company,
  industryDisplay,
  companySizeDisplay
}: CompanyProfileClientProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const form = useForm<z.infer<typeof companyProfileSchema>>({
    resolver: zodResolver(companyProfileSchema),
    defaultValues: {
      companyName: company.companyName,
      email: company.email,
      representative: company.representative,
      phoneNumber: company.phoneNumber,
      address: `${company.prefecture}${company.city}${company.address}`,
      companySize: company.companySize,
      industry: company.industry,
      description: company.description || "",
      websiteUrl: company.websiteUrl || "",
      imageUrl: company.imageUrl || ""
    }
  })

  async function onSubmit(values: z.infer<typeof companyProfileSchema>) {
    setIsLoading(true)

    try {
      let imageUrl = values.imageUrl || "";
      try {
        if (values.imageUrl && values.imageUrl.startsWith("{")) {
          const imageData = JSON.parse(values.imageUrl);
          imageUrl = imageData.url || "";
        }
      } catch (e) {
        imageUrl = values.imageUrl || "";
      }

      const response = await fetch('/api/company/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          imageUrl: imageUrl
        }),
      })

      if (!response.ok) {
        throw new Error('プロフィールの更新に失敗しました')
      }

      router.refresh()
      setIsEditing(false)
    } catch (error) {
      console.error('更新エラー:', error)
      alert('プロフィールの更新中にエラーが発生しました')
    } finally {
      setIsLoading(false)
    }
  } 

  return (
    <>
      <div className="flex items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold flex-1">企業プロフィール</h1>
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "キャンセル" : "編集"}
          </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-32 w-32">
                      {company.imageUrl ? (
                        <AvatarImage src={company.imageUrl} alt={company.companyName}/>
                      ) : (
                        <AvatarFallback>
                          <Building2 className="h-16 w-16" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <h2 className="mt-4 text-xl font-semibold">{company.companyName}</h2>
                    <p className="text-sm text-muted-foreground">{company.industry === "it" ? "IT・通信" : ""}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>連絡先情報</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{company.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{company.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      {company.postalCode}
                      {company.prefecture}
                      {company.city}
                      {company.address}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {isEditing ? (
                <Card>
                  <CardHeader>
                    <CardTitle>プロフィールを編集</CardTitle>
                    <CardDescription>
                      企業情報を更新します
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="flex flex-col items-center py-4">
                          <h3 className="font-medium mb-2">プロフィール画像</h3>
                          <ImageUpload
                            onImageUrlChange={(url) => form.setValue("imageUrl", url)}
                            defaultImageUrl={company.imageUrl || ""}
                            userType="companies"
                            isNewUser={false}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>会社名</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>メールアドレス</FormLabel>
                              <FormControl>
                                <Input type="email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="representative"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>代表者名</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>電話番号</FormLabel>
                              <FormControl>
                                <Input type="tel" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>住所</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="companySize"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>企業規模</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="企業規模を選択" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="small">小規模（50人未満）</SelectItem>
                                  <SelectItem value="medium">中規模（50-300人）</SelectItem>
                                  <SelectItem value="large">大規模（300人以上）</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="industry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>業界</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="業界を選択" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="it">IT・通信</SelectItem>
                                  <SelectItem value="manufacturing">製造</SelectItem>
                                  <SelectItem value="retail">小売</SelectItem>
                                  <SelectItem value="service">サービス</SelectItem>
                                  <SelectItem value="finance">金融</SelectItem>
                                  <SelectItem value="other">その他</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="websiteUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Webサイト</FormLabel>
                              <FormControl>
                                <Input type="url" placeholder="https://..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>会社概要</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="会社の事業内容や特徴について記入してください"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex gap-4">
                          <Button type="submit" className="flex-1">保存</Button>
                          <Button
                            type="button"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsEditing(false)}
                          >
                            キャンセル
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              ) : (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>会社概要</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">事業内容</h3>
                        <p className="text-muted-foreground">{company.description}</p>
                      </div>
                      <Separator />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">企業規模</h3>
                          <p className="text-muted-foreground">
                            {company.companySize}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">代表者</h3>
                          <p className="text-muted-foreground">{company.representative}</p>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium mb-2">Webサイト</h3>
                        {company.websiteUrl ? (
                          <a
                          href={company.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                          >
                            {company.websiteUrl}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">未設定</p>
                        )}
                        
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>実績</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-2">
                          <p className="text-3xl font-bold">12</p>
                          <p className="text-sm text-muted-foreground">完了案件</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-3xl font-bold">4.8</p>
                          <p className="text-sm text-muted-foreground">平均評価</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-3xl font-bold">8</p>
                          <p className="text-sm text-muted-foreground">取引施設数</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
    </>
  )
}