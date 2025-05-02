import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url);
    const token_hash = requestUrl.searchParams.get('token_hash');
    const type = requestUrl.searchParams.get('type');
    const next = requestUrl.searchParams.get('next') || '/';

    if (!token_hash || !type) {
        console.error('必要なパラメータがありません', { token_hash, type });
        return NextResponse.redirect (
            new URL('/auth-error', requestUrl.origin)
        );
    }

    try {
        console.log('認証コールバック処理開始', { type, next });
        const supabase = createClient();

        const { data, error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as any,
        });

        if (error) {
            console.error('OTP検証エラー', error);
            return NextResponse.redirect(
                new URL('/auth-error', requestUrl.origin)
            );
        }

        if (data.session) {
            console.log('セッション確立成功：', data.session.user.id);
        } else {
            console.log('セッションは確立されましたが、詳細が取得できません');
        }

        return NextResponse.redirect(new URL(next, requestUrl.origin));
    } catch (error) {
        console.error('認証コールバックエラー', error);
        return NextResponse.redirect(
            new URL('/auth-error', requestUrl.origin)
        );
    }
}