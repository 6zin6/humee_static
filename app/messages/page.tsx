"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, Search, Send } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"

// モックデータ
const conversations = [
  {
    id: 1,
    name: "株式会社サンプル",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=64&h=64&fit=crop&crop=faces",
    lastMessage: "承知いたしました。それでは作業を開始させていただきます。",
    timestamp: "14:30",
    unread: true,
  },
  {
    id: 2,
    name: "ABC工業",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces",
    lastMessage: "納期については柔軟に対応可能です。",
    timestamp: "昨日",
    unread: false,
  },
  {
    id: 3,
    name: "株式会社XYZ",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=64&h=64&fit=crop&crop=faces",
    lastMessage: "ご提案ありがとうございます。検討させていただきます。",
    timestamp: "月曜日",
    unread: false,
  },
]

const messages = [
  {
    id: 1,
    sender: "company",
    content: "お世話になっております。データ入力業務について、進捗状況を確認させていただきたく存じます。",
    timestamp: "14:20",
  },
  {
    id: 2,
    sender: "facility",
    content: "ご連絡ありがとうございます。現在、全体の約70%が完了しております。予定通り今週末までには納品可能です。",
    timestamp: "14:25",
  },
  {
    id: 3,
    sender: "company",
    content: "進捗状況について承知いたしました。予定通りの進行で安心いたしました。何か課題等ございましたら、お気軽にご相談ください。",
    timestamp: "14:28",
  },
  {
    id: 4,
    sender: "facility",
    content: "承知いたしました。それでは作業を開始させていただきます。",
    timestamp: "14:30",
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredConversations = conversations.filter(conversation =>
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // 実際のアプリケーションではここでメッセージを送信
      console.log("Sending message:", newMessage)
      setNewMessage("")
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

      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8">メッセージ</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
          {/* Conversations List */}
          <Card>
            <CardHeader>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="会話を検索..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-300px)]">
                {filteredConversations.map((conversation, index) => (
                  <div key={conversation.id}>
                    <div
                      className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedConversation.id === conversation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <Avatar>
                        <AvatarImage src={conversation.avatar} />
                        <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{conversation.name}</p>
                          <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      </div>
                      {conversation.unread && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    {index < filteredConversations.length - 1 && <Separator />}
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Messages */}
          <Card>
            <CardHeader>
              <CardTitle>{selectedConversation.name}</CardTitle>
              <CardDescription>案件: データ入力業務</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-400px)] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "facility" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "facility"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === "facility"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="メッセージを入力..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}