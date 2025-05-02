"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
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
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Users, Heart, Mail, Phone, MapPin } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const facilityProfileSchema = z.object({
  facilityName: z.string().min(1, "施設名を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  representative: z.string().min(1, "代表者名を入力してください"),
  phoneNumber: z.string().min(1, "電話番号を入力してください"),
  address: z.string().min(1, "住所を入力してください"),
  facilityType: z.string().min(1, "施設種別を選択してください"),
  capacity: z.string().min(1, "定員数を入力してください"),
  description: z.string(),
  disabilityTypes: z.array(z.string()).min(1, "対応可能な障害種別を選択してください"),
  specialties: z.array(z.string()).min(1, "得意な作業を選択してください"),
})

const disabilityTypes = [
  { id: "physical", label: "身体障害" },
  { id: "intellectual", label: "知的障害" },
  { id: "mental", label: "精神障害" },
  { id: "developmental", label: "発達障害" },
]

const specialties = [
  { id: "dataEntry", label: "データ入力" },
  { id: "packaging", label: "封入・梱包" },
  { id: "assembly", label: "組立作業" },
  { id: "cleaning", label: "清掃" },
  { id: "farming", label: "農作業" },
]

// モックデータ（実際はAPIから取得）
const facilityProfile = {
  facilityName: "Humme福祉作業所",
  email: "info@facility.example.com",
  representative: "鈴木一郎",
  phoneNumber: "03-9876-5432",
  address: "東京都新宿区新宿1-1-1",
  facilityType: "b",
  capacity: "20",
  description: "当施設は、障害者の就労支援を行う福祉作業所です。データ入力や軽作業を中心に、利用者の特性に合わせた作業を提供しています。",
  disabilityTypes: ["intellectual", "mental"],
  specialties: ["dataEntry", "packaging"],
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&h=128&fit=crop&crop=faces",
}

export default function FacilityProfile() {
  const [isEditing, setIsEditing] = useState(false)
  
  const form = useForm<z.infer<typeof facilityProfileSchema>>({
    resolver: zodResolver(facilityProfileSchema),
    defaultValues: facilityProfile,
  })

  async function onSubmit(values: z.infer<typeof facilityProfileSchema>) {
    // 実際のAPI呼び出しをここで行う
    console.log(values)
    setIsEditing(false)
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

      <main className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h1 className="text-3xl font-bold flex-1">施設プロフィール</h1>
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
                      <AvatarImage src={facilityProfile.avatar} />
                      <AvatarFallback>
                        <Users className="h-16 w-16" />
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="mt-4 text-xl font-semibold">{facilityProfile.facilityName}</h2>
                    <p className="text-sm text-muted-foreground">
                      {facilityProfile.facilityType === "b" ? "就労継続支援B型" : ""}
                    </p>
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
                    <span className="text-sm">{facilityProfile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{facilityProfile.phoneNumber}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{facilityProfile.address}</span>
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
                      施設情報を更新します
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="facilityName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>施設名</FormLabel>
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
                          name="facilityType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>施設種別</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="施設種別を選択" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="b">就労継続支援B型</SelectItem>
                                  <SelectItem value="a">就労継続支援A型</SelectItem>
                                  <SelectItem value="transition">就労移行支援</SelectItem>
                                  <SelectItem value="development">就労定着支援</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="capacity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>定員数</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="disabilityTypes"
                          render={() => (
                            <FormItem>
                              <FormLabel>対応可能な障害種別</FormLabel>
                              <div className="grid grid-cols-2 gap-4">
                                {disabilityTypes.map((type) => (
                                  <FormField
                                    key={type.id}
                                    control={form.control}
                                    name="disabilityTypes"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={type.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(type.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, type.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== type.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {type.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="specialties"
                          render={() => (
                            <FormItem>
                              <FormLabel>得意な作業</FormLabel>
                              <div className="grid grid-cols-2 gap-4">
                                {specialties.map((specialty) => (
                                  <FormField
                                    key={specialty.id}
                                    control={form.control}
                                    name="specialties"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={specialty.id}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(specialty.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, specialty.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== specialty.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal">
                                            {specialty.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>施設概要</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="施設の特徴や取り組みについて記入してください"
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
                      <CardTitle>施設概要</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-2">施設の特徴</h3>
                        <p className="text-muted-foreground">{facilityProfile.description}</p>
                      </div>
                      <Separator />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-medium mb-2">定員数</h3>
                          <p className="text-muted-foreground">{facilityProfile.capacity}名</p>
                        </div>
                        <div>
                          <h3 className="font-medium mb-2">代表者</h3>
                          <p className="text-muted-foreground">{facilityProfile.representative}</p>
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium mb-2">対応可能な障害種別</h3>
                        <div className="flex flex-wrap gap-2">
                          {facilityProfile.disabilityTypes.map((type) => (
                            <Badge key={type} variant="secondary">
                              {disabilityTypes.find(t => t.id === type)?.label}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="font-medium mb-2">得意な作業</h3>
                        <div className="flex flex-wrap gap-2">
                          {facilityProfile.specialties.map((specialty) => (
                            <Badge key={specialty} variant="outline">
                              {specialties.find(s => s.id === specialty)?.label}
                            </Badge>
                          ))}
                        </div>
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
                          <p className="text-3xl font-bold">15</p>
                          <p className="text-sm text-muted-foreground">完了案件</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-3xl font-bold">4.9</p>
                          <p className="text-sm text-muted-foreground">平均評価</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-3xl font-bold">6</p>
                          <p className="text-sm text-muted-foreground">取引企業数</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}