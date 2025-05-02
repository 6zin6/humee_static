"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// 基本のバリデーションスキーマを定義
const formSchema = z.object({
  userType: z.enum(["company", "facility", "individual"], {
    required_error: "お問い合わせ種別を選択してください",
  }),
  name: z.string().min(2, { message: "お名前は2文字以上で入力してください。" }),
  email: z.string().email({ message: "有効なメールアドレスを入力してください。" }),
  phoneNumber: z.string().min(1, "電話番号を入力してください"),
  message: z.string().min(10, { message: "メッセージは10文字以上で入力してください。" }),
  organizationName: z.string().optional(),
});

// 型定義
type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({
    type: null,
    message: "",
  });
  
  // バリデーションエラーを表示するかのフラグ
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  // フォームの初期化
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userType: undefined,
      name: "",
      email: "",
      phoneNumber: "",
      organizationName: "",
      message: "",
    },
    mode: "onSubmit", // 送信時にのみバリデーション
  });

  // 選択されたユーザータイプを監視
  const userType = form.watch("userType");

  // ユーザータイプに基づいてプレースホルダーとラベルを動的に変更
  const getTypeSpecificContent = () => {
    switch (userType) {
      case "company":
        return {
          name: "担当者名",
          namePlaceholder: "山田 太郎",
          organizationLabel: "企業名",
          organizationPlaceholder: "株式会社○○",
          messagePlaceholder: "企業向けサービスについて詳細を知りたいです。",
        };
      case "facility":
        return {
          name: "担当者名",
          namePlaceholder: "鈴木 一郎",
          organizationLabel: "施設名",
          organizationPlaceholder: "○○福祉施設",
          messagePlaceholder: "施設での導入方法について相談したいです。",
        };
      case "individual":
        return {
          name: "お名前",
          namePlaceholder: "山田 太郎",
          messagePlaceholder: "サービスについて質問があります。",
        };
      default:
        return {
          name: "お名前",
          namePlaceholder: "お名前をご入力ください",
          messagePlaceholder: "お問い合わせ内容をご記入ください",
        };
    }
  };

  const typeSpecificContent = getTypeSpecificContent();

  // フォーム送信前の追加バリデーション
  const onSubmit = async (data: FormValues) => {
    // バリデーションエラー表示フラグをオン
    setShowValidationErrors(true);
    
    // ユーザータイプに応じた追加バリデーション
    let hasValidationError = false;

    if ((userType === "company" || userType === "facility") && (!data.organizationName || data.organizationName.trim() === "")) {
      form.setError("organizationName", {
        type: "manual",
        message: userType === "company" ? "企業名は必須です" : "施設名は必須です",
      });
      hasValidationError = true;
    }

    // バリデーションエラーがある場合は送信しない
    if (hasValidationError || Object.keys(form.formState.errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setFormStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setFormStatus({
          type: "success",
          message: "お問い合わせいただきありがとうございます。メッセージを送信しました。",
        });
        form.reset();
        setShowValidationErrors(false); // 成功したらバリデーションエラー表示をリセット
      } else {
        setFormStatus({
          type: "error",
          message: result.error || "送信に失敗しました。しばらくしてからもう一度お試しください。",
        });
      }
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "エラーが発生しました。しばらくしてからもう一度お試しください。",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
        <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-12 px-4">
            <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">お問い合わせ</CardTitle>
                <CardDescription>
                ご質問やお問い合わせはこちらからお送りください。
                </CardDescription>
            </CardHeader>
            <CardContent>
                {formStatus.type && (
                <Alert
                    className={`mb-6 ${
                    formStatus.type === "success" ? "bg-green-50" : "bg-red-50"
                    }`}
                >
                    {formStatus.type === "success" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    )}
                    <AlertTitle>{formStatus.type === "success" ? "成功" : "エラー"}</AlertTitle>
                    <AlertDescription>{formStatus.message}</AlertDescription>
                </Alert>
                )}

                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                    control={form.control}
                    name="userType"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                        <FormLabel>
                            お問い合わせ種別<span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                            <RadioGroup
                            onValueChange={(value) => {
                                field.onChange(value);
                                // 種別が変わったら組織名フィールドをリセット
                                if (value === "individual") {
                                form.setValue("organizationName", "");
                                }
                            }}
                            value={field.value}
                            className="flex flex-col space-y-1 sm:flex-row sm:space-y-0 sm:space-x-4"
                            >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="company" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">企業の方</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="facility" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                福祉事業者の方
                                </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                                <FormControl>
                                <RadioGroupItem value="individual" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">個人の方</FormLabel>
                            </FormItem>
                            </RadioGroup>
                        </FormControl>
                        {showValidationErrors && <FormMessage />}
                        </FormItem>
                    )}
                    />

                    {/* 企業名/施設名フィールド - 企業または施設の場合のみ表示 */}
                    {(userType === "company" || userType === "facility") && (
                    <FormField
                        control={form.control}
                        name="organizationName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                            {typeSpecificContent.organizationLabel}
                            <span className="text-red-500 ml-1">*</span>
                            </FormLabel>
                            <FormControl>
                            <Input
                                placeholder={typeSpecificContent.organizationPlaceholder}
                                {...field}
                            />
                            </FormControl>
                            {showValidationErrors && <FormMessage />}
                        </FormItem>
                        )}
                    />
                    )}

                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>
                            {typeSpecificContent.name}
                            <span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                            <Input placeholder={typeSpecificContent.namePlaceholder} {...field} />
                        </FormControl>
                        {showValidationErrors && <FormMessage />}
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>
                            メールアドレス<span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                            <Input type="email" placeholder="info@example.com" {...field} />
                        </FormControl>
                        {showValidationErrors && <FormMessage />}
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>
                            電話番号<span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                            <Input type="tel" placeholder="000-0000-0000" {...field} />
                        </FormControl>
                        {showValidationErrors && <FormMessage />}
                        </FormItem>
                    )}
                    />

                    <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>
                            お問い合わせ内容<span className="text-red-500 ml-1">*</span>
                        </FormLabel>
                        <FormControl>
                            <Textarea
                            placeholder={typeSpecificContent.messagePlaceholder}
                            className="min-h-32"
                            {...field}
                            />
                        </FormControl>
                        {showValidationErrors && <FormMessage />}
                        </FormItem>
                    )}
                    />

                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "送信中..." : "送信する"}
                    </Button>
                </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-center text-sm text-gray-500">
                <p>内容を確認の上、担当者より折り返しご連絡いたします。</p>
            </CardFooter>
            </Card>
        </div>
        <Footer />
        </div>
  );
}