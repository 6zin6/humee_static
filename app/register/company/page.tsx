"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const companyFormSchema = z
  .object({
    companyName: z.string().min(1, "会社名を入力してください"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z.string().min(8, "パスワードは8文字以上で入力してください"),
    confirmPassword: z.string(),
    representative: z.string().min(1, "代表者名を入力してください"),
    phoneNumber: z.string().min(1, "電話番号を入力してください"),
    postalCode: z.string().min(1, "郵便番号を入力してください"),
    prefecture: z.string().min(1, "都道府県を選択してください"),
    city: z.string().min(1, "市町村を選択してください"),
    address: z.string().min(1, "それ以降の住所を入力してください"),
    companySize: z.string().min(1, "企業規模を選択してください"),
    industry: z.string().min(1, "業界を選択してください"),
    description: z.string(),
    websiteUrl: z.string(),
    imageUrl: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

export default function CompanyRegistration() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      representative: "",
      phoneNumber: "",
      postalCode: "",
      prefecture: "",
      city: "",
      address: "",
      companySize: "",
      industry: "",
      description: "",
      websiteUrl: "",
      imageUrl: "",
    },
  });

  async function onSubmit(values: z.infer<typeof companyFormSchema>) {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const supabase = createClient();

      let imageInfo = { url: "", tempId: null, path: ""};
      try {
        if (values.imageUrl) {
          imageInfo = JSON.parse(values.imageUrl);
        }
      } catch (e) {

      }

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            company_name: values.companyName,
            role: 'company',
          }
        }
      });

      if (authError) throw new Error(authError.message);

      if (imageInfo.tempId && imageInfo.path && authData.user) {
        try {
          console.log("画像移動開始:", imageInfo);
          const fileExt = imageInfo.path.split('.').pop();
          const newPath = `companies/${authData.user.id}/profile.${fileExt}`;
          console.log("移動先パス:", newPath);
          
          // コピー操作の実行
          const { data: copyData, error: copyError } = await supabase.storage
            .from('profile-images')
            .copy(imageInfo.path, newPath);
            
          if (copyError) {
            console.error("コピーエラー:", copyError);
            // エラーがあってもプロセスを続行、元のURLを使用
          } else {
            console.log("コピー成功:", newPath);
            
            // 新しいURLの取得
            const { data: { publicUrl } } = supabase.storage
              .from('profile-images')
              .getPublicUrl(newPath);
              
            console.log("新URL:", publicUrl);
            imageInfo.url = publicUrl;
            
            // 元ファイルの削除
            console.log("元ファイル削除:", imageInfo.path);
            await supabase.storage
              .from('profile-images')
              .remove([imageInfo.path]);
          }
        } catch (error) {
          console.error("画像処理エラー:", error);
        }
      }

      // セッションの設定を待つ（少し遅延を入れる）
      await new Promise(resolve => setTimeout(resolve, 500));

      // 2. 登録後のセッション取得を試みる
      const { data: sessionData } = await supabase.auth.getSession();

      const response = await fetch('/api/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName: values.companyName,
          email: values.email,
          representative: values.representative,
          phoneNumber: values.phoneNumber,
          postalCode: values.postalCode,
          prefecture: values.prefecture,
          city: values.city,
          address: values.address,
          companySize: values.companySize,
          industry: values.industry,
          description: values.description || "",
          websiteUrl: values.websiteUrl || "",
          imageUrl: imageInfo.url || "",
          userId: authData.user?.id,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || '登録処理に失敗しました');
      }

      router.push(`/verify?email=${encodeURIComponent(values.email)}`);
    } catch (error) {
      console.error('登録エラー', error);
      setErrorMessage(error instanceof Error ? error.message : '登録処理中にエラーが発生しました');
    } finally {
      setIsLoading(false);
    }
  }

  const [isAddressLoading, setIsAddressLoading] = useState(false);

  const handlePostalCodeChange = async (
    value: string,
    onChange: (value: string) => void
  ) => {
    const postalCode = value.replace(/[^0-9]/g, "");
    onChange(postalCode);

    if (postalCode.length === 7) {
      setIsAddressLoading(true);
      try {
        const response = await fetch(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
        );
        const data = await response.json();

        if (data.results) {
          const address = data.results[0];
          form.setValue("prefecture", address.address1);
          form.setValue("city", address.address2);
          const addressInput = document.querySelector(
            'input[name="address"]'
          ) as HTMLInputElement;
          if (addressInput) addressInput.focus();
        }
      } catch (error) {
        console.error("郵便番号検索に失敗しました", error);
      } finally {
        setIsAddressLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header/>

      <div className="container flex items-center justify-center min-h-[calc(100vh-3.5rem)] py-12">
        <div className="w-full max-w-2xl">
          <div className="flex items-center gap-2 mb-8">
            <Building2 className="h-8 w-8" />
            <h1 className="text-3xl font-bold">企業アカウント登録</h1>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="flex flex-col items-center py-4">
                <h2 className="text-lg font-medium mb-2">プロフィール画像</h2>
                <ImageUpload
                  onImageUrlChange={(imageData) => form.setValue("imageUrl", imageData)}
                  defaultImageUrl={form.getValues("imageUrl") ? JSON.parse(form.getValues("imageUrl")).url : ""}
                  isNewUser={true}
                />
              </div>
              
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>会社名</FormLabel>
                    <FormControl>
                      <Input placeholder="株式会社Humme" {...field} />
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
                      <Input
                        type="email"
                        placeholder="company@example.com"
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
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>郵便番号</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          onChange={(e) =>
                            handlePostalCodeChange(
                              e.target.value,
                              field.onChange
                            )
                          }
                          placeholder="1000001"
                        />
                        {isAddressLoading && (
                          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      ハイフンなしで入力してください
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prefecture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>都道府県</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>市町村</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="企業規模を選択" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="small">
                          小規模（50人未満）
                        </SelectItem>
                        <SelectItem value="medium">
                          中規模（50-300人）
                        </SelectItem>
                        <SelectItem value="large">
                          大規模（300人以上）
                        </SelectItem>
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>会社概要</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="会社の事業内容や特徴について記入してください"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WebサイトURL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="mr-2">登録中...</span>
                    <div className="h-4 w-4 animate-spin rouded-full border-2 border-background border-t-transparent"></div>
                  </>
                ) : (
                  "登録する"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
