"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Heart, Clock, Calendar, Pen as Yen, ArrowLeft, Edit, Trash2 } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

// モックデータ（実際はAPIから取得）
const project = {
  id: 1,
  title: "データ入力業務",
  company: "株式会社サンプル",
  description: "エクセルデータの入力作業。顧客情報のデータベース化を行います。正確性と素早さが求められます。",
  budget: "20,000円",
  deadline: "2024年4月30日",
  status: "open",
  category: "dataEntry",
  difficulty: "easy",
  requirements: "・Excelの基本操作\n・タイピングスキル\n・集中力",
  notes: "・在宅での作業が可能です\n・分割での納品も相談可能です",
  createdAt: "2024年3月15日",
}

const difficultyLabels = {
  easy: { label: "簡単", color: "bg-green-500" },
  medium: { label: "普通", color: "bg-yellow-500" },
  hard: { label: "難しい", color: "bg-red-500" },
}

const statusLabels = {
  open: { label: "募集中", color: "bg-blue-500" },
  inProgress: { label: "進行中", color: "bg-yellow-500" },
  completed: { label: "完了", color: "bg-green-500" },
}

export function ProjectDetail({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleDelete = async () => {
    // 実際のAPI呼び出しをここで行う
    console.log("Deleting project:", params.id)
    setIsDeleteDialogOpen(false)
    router.push("/projects")
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
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => router.push("/projects")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            戻る
          </Button>
          <h1 className="text-3xl font-bold flex-1">{project.title}</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => router.push(`/projects/${params.id}/edit`)}>
              <Edit className="h-4 w-4 mr-2" />
              編集
            </Button>
            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  削除
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>案件を削除</DialogTitle>
                  <DialogDescription>
                    この案件を削除してもよろしいですか？この操作は取り消せません。
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                    キャンセル
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    削除する
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>案件詳細</CardTitle>
                <CardDescription>{project.company}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">説明</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">必要なスキル・経験</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{project.requirements}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium mb-2">備考</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{project.notes}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>作業の流れ</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <div className="flex-none w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">1</div>
                    <div>
                      <h4 className="font-medium">応募</h4>
                      <p className="text-muted-foreground">案件の内容を確認し、応募を行います</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-none w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">2</div>
                    <div>
                      <h4 className="font-medium">打ち合わせ</h4>
                      <p className="text-muted-foreground">具体的な作業内容と進め方について確認します</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-none w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">3</div>
                    <div>
                      <h4 className="font-medium">作業開始</h4>
                      <p className="text-muted-foreground">合意した内容に基づいて作業を進めます</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="flex-none w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center">4</div>
                    <div>
                      <h4 className="font-medium">納品</h4>
                      <p className="text-muted-foreground">完成した成果物を提出します</p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>案件情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">ステータス:</span>
                  <Badge variant="secondary" className={`${statusLabels[project.status as keyof typeof statusLabels].color} text-white`}>
                    {statusLabels[project.status as keyof typeof statusLabels].label}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Yen className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">予算:</span>
                  <span>{project.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">納期:</span>
                  <span>{project.deadline}</span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">難易度:</span>
                    <Badge variant="secondary" className={`${difficultyLabels[project.difficulty as keyof typeof difficultyLabels].color} text-white`}>
                      {difficultyLabels[project.difficulty as keyof typeof difficultyLabels].label}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">カテゴリー:</span>
                    <Badge variant="outline">データ入力</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">登録日:</span>
                    <span className="text-sm">{project.createdAt}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full" size="lg">
              応募する
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}