import { Metadata } from "next"
import { ProjectDetail } from "./project-detail"

// Generate static paths for the dynamic route
export async function generateStaticParams() {
  // Since we're using mock data, we'll generate static pages for a few IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}

export const metadata: Metadata = {
  title: "案件詳細 | Humme",
  description: "企業と障害者福祉施設をマッチングするクラウドソーシングプラットフォーム",
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <ProjectDetail params={params} />
}