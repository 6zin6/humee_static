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
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { CalendarIcon, Heart } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

const projectFormSchema = z.object({
  title: z.string().min(1, "案件タイトルを入力してください"),
  description: z.string().min(1, "案件の詳細を入力してください"),
  category: z.string().min(1, "カテゴリーを選択してください"),
  budget: z.string().min(1, "予算を入力してください"),
  deadline: z.date({
    required_error: "納期を選択してください",
  }),
  difficulty: z.string().min(1, "難易度を選択してください"),
  requirements: z.string(),
  notes: z.string(),
})

export default function CreateProject() {
  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      budget: "",
      requirements: "",
      notes: "",
    },
  })

  async function onSubmit(values: z.infer<typeof projectFormSchema>) {
    console.log(values)
    // Here we would typically handle the project creation
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
            <h1 className="text-3xl font-bold">新規案件作成</h1>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>案件タイトル</FormLabel>
                    <FormControl>
                      <Input placeholder="データ入力業務" {...field} />
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
                    <FormLabel>案件の詳細</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="案件の詳細な説明を入力してください"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>カテゴリー</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="カテゴリーを選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="dataEntry">データ入力</SelectItem>
                        <SelectItem value="packaging">封入・梱包</SelectItem>
                        <SelectItem value="assembly">組立作業</SelectItem>
                        <SelectItem value="cleaning">清掃</SelectItem>
                        <SelectItem value="farming">農作業</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>予算</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="30000" {...field} />
                    </FormControl>
                    <FormDescription>円単位で入力してください</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>納期</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={`w-full pl-3 text-left font-normal ${!field.value && "text-muted-foreground"}`}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: ja })
                            ) : (
                              <span>納期を選択</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>難易度</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="難易度を選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">簡単</SelectItem>
                        <SelectItem value="medium">普通</SelectItem>
                        <SelectItem value="hard">難しい</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>必要なスキル・経験</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="必要なスキルや経験を入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>備考</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="その他の注意事項や補足情報を入力してください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">作成する</Button>
                <Button type="button" variant="outline" className="flex-1">
                  下書き保存
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}