import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest) {
  try {
    // リクエストボディを取得
    const body = await request.json();
    
    // Supabaseクライアントを初期化
    const supabase = createClient();
    
    // セッションを取得
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json(
        { error: "認証されていません" },
        { status: 401 }
      );
    }

    // 必須フィールドの検証
    const requiredFields = [
      "companyName", "email", "representative", "phoneNumber", 
      "address", "companySize", "industry"
    ];

    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field}は必須です` },
          { status: 400 }
        );
      }
    }

    let imageUrl = body.imageUrl || "";
    try {
        if (typeof body.imageUrl === 'string' && body.imageUrl.startsWith('{')) {
            const imageData = JSON.parse(body.imageUrl);
            imageUrl = imageData.url || "";
        }
    } catch (e) {
        console.error("画像URL解析エラー：", e);
    }

    const updatedCompany = await prisma.company.update({
      where: {
        email: session.user.email,
      },
      data: {
        companyName: body.companyName,
        representative: body.representative,
        phoneNumber: body.phoneNumber,
        postalCode: body.postalCode,
        prefecture: body.prefecture,
        city: body.city,
        address: body.address,
        companySize: body.companySize,
        industry: body.industry,
        description: body.description || "",
        websiteUrl: body.websiteUrl || "",
        imageUrl: imageUrl
      },
    });

    return NextResponse.json(
      { success: true, company: updatedCompany },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("プロフィール更新エラー:", error);
    return NextResponse.json(
      { error: "プロフィール更新中にエラーが発生しました" },
      { status: 500 }
    );
  }
}