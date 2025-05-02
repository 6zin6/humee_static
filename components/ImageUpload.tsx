"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import Image from "next/image"
import { ChangeEvent, useState } from "react"
import { v4 as uuidv4 } from "uuid"

interface ImageUploadProps {
    onImageUrlChange: (imageUrl: string) => void;
    defaultImageUrl?: string;
    userType?: 'companies' | 'facilities';
    userId?: string;
    isNewUser?: boolean;
}

const ImageUpload = ({
    onImageUrlChange,
    defaultImageUrl = "",
    userType = "companies",
    userId,
    isNewUser = false
}: ImageUploadProps) => {
    const [imageUrl, setImageUrl] = useState<string>(defaultImageUrl);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tempId] = useState<string>(uuidv4());

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const file = files[0];

        if (file.size > 2 * 1024 * 1024) {
            setError("ファイルサイズは2MB以下にしてください");
            return;
        }

        if (!file.type.match('image/(jpeg|jpg|png|webp)')) {
            setError("JPG、PNG、またはWEBP形式の画像をアップロードしてください");
            return;
        }

        setError(null);
        setIsUploading(true);

        try {
            const supabase = createClient();
            let effectiveUserId: string;

            if (isNewUser) {
                effectiveUserId = tempId;
            } else {
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    throw new Error('ユーザー情報を取得できませんでした');
                }

                effectiveUserId = user.id;
            }

            const fileExt = file.name.split('.').pop();
            const filePath = isNewUser ? `temp/${userType}/${effectiveUserId}/profile.${fileExt}` : `${userType}/${effectiveUserId}/profile.${fileExt}`;

            const { data, error: uploadError } = await supabase.storage
                .from('profile-images')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true
                });

            if (uploadError) throw uploadError;

            const { data: {publicUrl } } = supabase.storage
                .from('profile-images')
                .getPublicUrl(filePath);

            const imageData = {
                url: publicUrl,
                tempId: isNewUser ? effectiveUserId : null,
                path: filePath 
            };

            setImageUrl(publicUrl);
            onImageUrlChange(JSON.stringify(imageData));
        } catch (error: any) {
            console.error('画像アップロードエラー', error);
            setError(error.message || 'アップロード中にエラーが発生しました');
        } finally {
            setIsUploading(false);
        }
    };

  return (
        <div className="flex flex-col items-center gap-4">
            <div className="w-32 h-32 relative rounded-full overflow-hidden border border-border">
                {imageUrl ? (
                <Image
                    src={imageUrl}
                    alt="プロフィール画像"
                    fill
                    className="object-cover"
                />
                ) : (
                <div className="w-full h-full flex items-center justify-center bg-muted">
                    <span className="text-muted-foreground text-sm">画像なし</span>
                </div>
                )}
            </div>

            <Button
                type="button"
                variant="outline"
                className="relative"
                disabled={isUploading}
            >
                {isUploading ? "アップロード中..." : "画像をアップロード"}
                <input
                type="file"
                accept="image/jpeg, image/png, image/webp"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={isUploading}
                />
            </Button>

            {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
  )
}

export default ImageUpload