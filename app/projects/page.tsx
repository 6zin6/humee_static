"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Search, Plus, Filter, Clock, CheckCircle2, AlertCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { useRouter } from "next/navigation"

const projects = [
  {
    id: 1,
    title: "データ入力業務",
    company: "株式会社サンプル",
    description: "エクセルデータの入力作業",
    budget: "20,000円",
    deadline: "2週間",
    status: "open",
    category: "dataEntry",
    difficulty: "easy",
  },
  {
    id: 2,
    title: "商品の梱包作業",
    company: "株式会社ABC",
    description: "衣類商品の梱包、発送準備",
    budget: "30,000円",
    deadline: "1週間",
    status: "inProgress",
    category: "packaging",
    difficulty: "medium",
  },
  {
    id: 3,
    title: "部品組立作業",
    company: "XYZ工業",
    description: "電子部品の組立作業",
    budget: "50,000円",
    deadline: "3週間",
    status: "completed",
    category: "assembly",
    difficulty: "hard",
  },
]

export default function ProjectsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.company.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === "all" || project.category === categoryFilter
    const matchesStatus = statusFilter === "all" || project.status === statusFilter
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-blue-500"
      case "inProgress":
        return "text-yellow-500"
      case "completed":
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <Clock className="h-4 w-4" />
      case "inProgress":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return null
    }
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">案件管理</h1>
          <Button onClick={() => router.push("/projects/create")}>
            <Plus className="mr-2 h-4 w-4" />
            新規案件作成
          </Button>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="案件を検索..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="カテゴリー" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="dataEntry">データ入力</SelectItem>
              <SelectItem value="packaging">梱包作業</SelectItem>
              <SelectItem value="assembly">組立作業</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setStatusFilter}>
          <TabsList>
            <TabsTrigger value="all">すべて</TabsTrigger>
            <TabsTrigger value="open">募集中</TabsTrigger>
            <TabsTrigger value="inProgress">進行中</TabsTrigger>
            <TabsTrigger value="completed">完了</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push(`/projects/${project.id}`)}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <CardDescription>{project.company}</CardDescription>
                      </div>
                      <div className={`flex items-center ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>{project.description}</p>
                      <div className="flex justify-between text-muted-foreground">
                        <span>予算: {project.budget}</span>
                        <span>納期: {project.deadline}</span>
                      </div>
                      <Button className="w-full mt-4" onClick={(e) => {
                        e.stopPropagation()
                        router.push(`/projects/${project.id}`)
                      }}>
                        詳細を見る
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {["open", "inProgress", "completed"].map((status) => (
            <TabsContent key={status} value={status} className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects
                  .filter((project) => project.status === status)
                  .map((project) => (
                    <Card key={project.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push(`/projects/${project.id}`)}>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <CardDescription>{project.company}</CardDescription>
                          </div>
                          <div className={`flex items-center ${getStatusColor(project.status)}`}>
                            {getStatusIcon(project.status)}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <p>{project.description}</p>
                          <div className="flex justify-between text-muted-foreground">
                            <span>予算: {project.budget}</span>
                            <span>納期: {project.deadline}</span>
                          </div>
                          <Button className="w-full mt-4" onClick={(e) => {
                            e.stopPropagation()
                            router.push(`/projects/${project.id}`)
                          }}>
                            詳細を見る
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}