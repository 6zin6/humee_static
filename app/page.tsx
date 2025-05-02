import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, ArrowRight, Briefcase, Heart, CheckCircle, InfoIcon, Laptop, MessageCircle, GraduationCap } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header/>

      {/* Promo Banner */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-center font-medium">
        Humee事前登録フェア「全国展開中！！」
      </div>

      <main>
        {/* Hero Section */}
        <section className="px-4 py-20 md:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container">
            <div className="flex flex-col items-center text-center space-y-4">
              <h1 className="text-xl leading-normal md:text-3xl md:leading-relaxed font-bold tracking-tighter">
                「人と社会をやさしくつなぐ、新しい就労支援のカタチ。」
                <br />
                Humeeは、障害者就労支援施設専用のクラウドソーシングアプリです。
                <br />
                社会との接点を広げ、誰もが自分らしく働ける未来を支えます。
              </h1>
              <div className="flex gap-4 mt-8 flex-col md:flex-row">
                <Button size="lg" asChild>
                  <Link href="/about">
                    Humeeを知る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    無料相談はこちら
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Humee Section */}
        <section className="py-20 px-4">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Humeeとは？</h2>
            <Card className="max-w-4xl mx-auto">
              <CardContent className="pt-6">
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <p className="text-xl font-bold mb-4">Human × Me = &quot;私らしく社会とつながる&quot;。</p>
                    <p className="text-lg">
                      Humeeは、障害・グレーゾーンの方々と、社会・企業を結ぶ
                      <br />
                      <span className="font-bold">障害者施設専門のクラウドソーシングプラットフォーム</span>です。
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4">【Humeeでできること】</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>デジタル業務（データ入力・画像編集・SNS運用・ライティングなど）の委託</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>障害者雇用支援・トライアル雇用マッチング</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>利用者の社会復帰・スキル向上のための仕事創出</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-center font-medium">▶ 施設・企業・利用者の三方よしを目指します！</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Humeeの特徴</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <Building2 className="h-8 w-8 mb-4" />
                  <CardTitle>企業の方へ</CardTitle>
                  <CardDescription>
                    業務効率化とCSR活動の両立を実現
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 簡単な案件登録と管理</li>
                    <li>• 品質管理システム</li>
                    <li>• SDGs達成への貢献</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 mb-4" />
                  <CardTitle>福祉施設の方へ</CardTitle>
                  <CardDescription>
                    安定した業務受注と工賃向上を支援
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 施設の特性に合った案件マッチング</li>
                    <li>• 作業実績の可視化</li>
                    <li>• 継続的な業務確保</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Briefcase className="h-8 w-8 mb-4" />
                  <CardTitle>充実したサポート</CardTitle>
                  <CardDescription>
                    安心して利用できる体制を整備
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {/* <li>• 契約書作成支援</li>
                    <li>• 進捗管理システム</li> */}
                    <li>• 専門スタッフによるサポート</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Support Services Section */}
        <section className="py-20 px-4">
          <div className="container">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-medium text-sm mb-4">NEW</span>
              <h2 className="text-3xl font-bold">Humeeの付属支援サービス</h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                Humeeの運営会社である【株式会社ローカルアビリティーズ】では、
                <br />
                Humeeをより効果的に活用していただくため、以下の支援サービスもご用意しています。
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card>
                <CardHeader className="pb-2">
                  <Laptop className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle className="text-lg">障害・グレーゾーンIT人材育成</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 利用者のITスキル向上をサポート</li>
                    <li>• パソコン初心者から本格スキルまで対応可能</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <GraduationCap className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle className="text-lg">オンライン支援員の育成</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• デジタル知識×福祉知識を持つ「ハイブリッド支援員」を育成</li>
                    <li>• 現場運営力・ITリテラシーを向上</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <MessageCircle className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle className="text-lg">オンライン障害支援の代行</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• オンライン就労支援の導入から運用まで完全サポート</li>
                    <li>• 施設負担を大幅に軽減します</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <InfoIcon className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle className="text-lg">福祉×AI リスキリング支援</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• ChatGPTや業務効率ツールの活用レクチャー</li>
                    <li>• 施設全体のデジタル力を底上げします</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <Laptop className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle className="text-lg">テレワーク監視・支援アプリ開発</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• 遠隔でも安心して働ける環境づくりを支援</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 px-4 bg-muted">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Humeeが選ばれる理由</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="bg-background p-6 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">施設専用クラウドソーシングで<span className="font-bold">マッチング精度が高い</span></p>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">福祉に配慮した<span className="font-bold">丁寧なマッチングサポート</span></p>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">ITスキルや就労経験を積み上げることで、<span className="font-bold">一般就労へのステップアップ</span></p>
                </div>
              </div>
              
              <div className="bg-background p-6 rounded-lg flex items-start">
                <CheckCircle className="h-6 w-6 text-primary mr-4 flex-shrink-0 mt-1" />
                <div>
                  <p className="font-medium">利用者、施設、企業それぞれに<span className="font-bold">確かなメリット</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Projects Section */}
        {/* <section className="py-20 px-4">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">新着案件</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-lg">データ入力業務</CardTitle>
                    <CardDescription>株式会社サンプル</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p>作業内容：エクセルデータの入力</p>
                      <p>予算：20,000円</p>
                      <p>納期：2週間</p>
                      <Button className="w-full mt-4">詳細を見る</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section> */}

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="container max-w-3xl">
            <h2 className="text-3xl font-bold text-center mb-12">よくある質問（Q&A）</h2>
            
            <Accordion type="single" collapsible className="bg-background rounded-md">
              <AccordionItem value="item-1">
                <AccordionTrigger className="px-4">Humeeの利用に資格は必要ですか？</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  いいえ、障害者就労支援施設（A型・B型）であればご利用いただけます。
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-2">
                <AccordionTrigger className="px-4">施設側がサポートできない場合も対応できますか？</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  はい。運営会社の支援サービスで施設のオンライン支援を代行することも可能です。
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="item-3">
                <AccordionTrigger className="px-4">企業側の障害者雇用支援も可能ですか？</AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  はい。マッチングやトライアル雇用支援を行っています。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-muted">
          <div className="container max-w-3xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">まずは無料相談から！</h2>
              <p className="text-xl mb-8">「Humeeと一緒に、未来へ一歩踏み出しませんか？」</p>
              <div className="flex gap-4 justify-center flex-col sm:flex-row">
                <Button size="lg" asChild>
                  <Link href="/about">
                    Humeeを知る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">
                    無料相談する
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer/>
    </div>
  )
}