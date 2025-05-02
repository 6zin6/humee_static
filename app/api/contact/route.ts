import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const getUserTypeLabel = (userType: string): string => {
    switch (userType) {
        case "company":
        return "企業";
        case "facility":
        return "福祉事業者";
        case "individual":
        return "個人";
        default:
        return "未選択";
    }
};

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userType, organizationName, name, email, phoneNumber, message } = body;

        // ユーザータイプの日本語表示を取得
        const userTypeLabel = getUserTypeLabel(userType);

        const transporter = nodemailer.createTransport({
        host: "sv12070.xserver.jp",
        port: 465,
        secure: true,
        auth: {
            user: process.env.MAILUSER,
            pass: process.env.MAILPASSWORD
        }
        });

        // メール件名の設定 - 組織名がある場合は含める
        let subject = `【お問い合わせ】${userTypeLabel}`;
        if (organizationName && (userType === "company" || userType === "facility")) {
        subject += `：${organizationName}`;
        }
        subject += `：${name}様より`;

        // メールHTML本文の構築 - 組織名がある場合は含める
        let htmlContent = `
        <p>【お問い合わせ種別】</p>
        <p>${userTypeLabel}</p>
        `;

        if (organizationName && (userType === "company" || userType === "facility")) {
        const orgLabel = userType === "company" ? "企業名" : "施設名";
        htmlContent += `
            <p>【${orgLabel}】</p>
            <p>${organizationName}</p>
        `;
        }

        htmlContent += `
        <p>【${userType === "individual" ? "お名前" : "担当者名"}】</p>
        <p>${name}</p>
        <p>【メールアドレス】</p>
        <p>${email}</p>
        <p>【電話番号】</p>
        <p>${phoneNumber}</p>
        <p>【お問い合わせ内容】</p>
        <p>${message}</p>
        `;

        const toHostMailData = {
        from: email,
        to: "info@localabilities.com",
        subject: subject,
        text: `${message} Send from ${email}`,
        html: htmlContent
        };

        const info = await transporter.sendMail(toHostMailData);
        console.log('メール送信成功', info);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('メール送信エラー', error);

        return NextResponse.json(
        { error: 'メール送信に失敗しました。' },
        { status: 500 }
        );
    }
}