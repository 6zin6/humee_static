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
import { Checkbox } from "@/components/ui/checkbox"
import { Users, Heart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const facilityFormSchema = z.object({
  facilityName: z.string().min(1, "施設名を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z.string().min(8, "パスワードは8文字以上で入力してください"),
  confirmPassword: z.string(),
  representative: z.string().min(1, "代表者名を入力してください"),
  phoneNumber: z.string().min(1, "電話番号を入力してください"),
  address: z.string().min(1, "住所を入力してください"),
  facilityType: z.string().min(1, "施設種別を選択してください"),
  capacity: z.string().min(1, "定員数を入力してください"),
  description: z.string(),
  disabilityTypes: z.array(z.string()).min(1, "対応可能な障害種別を選択してください"),
  specialties: z.array(z.string()).min(1, "得意な作業を選択してください"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "パスワードが一致しません",
  path: ["confirmPassword"],
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

export default function FacilityRegistration() {
  const form = useForm<z.infer<typeof facilityFormSchema>>({
    resolver: zodResolver(facilityFormSchema),
    defaultValues: {
      facilityName: "",
      email: "",
      password: "",
      confirmPassword: "",
      representative: "",
      phoneNumber: "",
      address: "",
      facilityType: "",
      capacity: "",
      description: "",
      disabilityTypes: [],
      specialties: [],
    },
  })

  async function onSubmit(values: z.infer<typeof facilityFormSchema>) {
    console.log(values)
    // Here we would typically handle the registration process
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

      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-2 mb-8">
            <Users className="h-8 w-8" />
            <h1 className="text-3xl font-bold">福祉施設アカウント登録</h1>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="facilityName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>施設名</FormLabel>
                    <FormControl>
                      <Input placeholder="Humme福祉作業所" {...field} />
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
                      <Input type="email" placeholder="facility@example.com" {...field} />
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
                    <FormLabel>パスワード（確認）</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
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
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">登録する</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}