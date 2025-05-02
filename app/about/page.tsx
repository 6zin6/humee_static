import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle, Heart } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background">
        <Header />

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
                    Humeeとは（ヒューミー）
                    <br />
                    障がい者施設専門のクラウドソーシングアプリ
                </h1>
                <div className="flex gap-4 mt-8 flex-col md:flex-row">
                    <Button size="lg" asChild>
                    <Link href="/contact">
                        無料相談はこちら
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                    </Button>
                </div>
                </div>
            </div>
            </section>

            {/* About Humee Concept Section */}
            <section className="py-20 px-4">
            <div className="container max-w-4xl">
                <Card className="mb-12">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold">Humee = Human × Me（私らしく社会で働く）</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <p className="text-lg">
                    Humeeは、「人」と「私」が出会う場所。
                    </p>
                    <p className="text-lg">
                    私たちは、「人はすべてちがう」という前提を大切にしています。
                    誰かと比べるのではなく、<span className="font-bold">その人自身が自分らしく働く</span>ことができる社会。
                    そんな未来を、Humeeを通して創っていきたいと願っています。
                    </p>
                    <p className="text-lg">
                    一人ひとりが&quot;わたしらしさ&quot;を大切にしながら、
                    社会と温かく、やさしくつながっていく——
                    Humeeは、そのための<span className="font-bold">新しい働き方のプラットフォーム</span>です。
                    </p>
                    <p className="text-lg">
                    Humeeでは、<span className="font-bold">在宅やスキマ時間でできるオンラインの仕事</span>を中心に、
                    自分のペースで挑戦できる機会を提供する施設をサポート支援しています。
                    </p>
                    <p className="text-lg">
                    利用者は、小さな成功体験が積み重なることで、自信と選択肢が増え、
                    未来への道が広がっていきます。
                    </p>
                </CardContent>
                </Card>
            </div>
            </section>

            {/* Future Vision Section */}
            <section className="py-20 px-4 bg-muted">
            <div className="container max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">Humeeが目指す未来</h2>
                <div className="space-y-6 bg-background p-8 rounded-lg">
                <p className="text-lg">
                    現在、障がい者施設の現場では、<span className="font-bold">仕事を獲得できる施設とそうでない施設との間に大きな格差</span>が生まれています。
                </p>
                <p className="text-lg">
                    また、提供されるサービスの質や、支援員の専門性にもばらつきがあり、残念ながら<span className="font-bold">社会的な理解や支援のスキルが不足している支援者</span>も存在します。
                </p>
                <p className="text-lg">
                    本当に適切な福祉施設を見極めることは、利用者やそのご家族にとって非常に難しい時代になっています。
                </p>
                <p className="text-lg">
                    私たちは<span className="font-bold">「Humee」</span>を通じて、この現状を変えていきたいと考えています。
                </p>
                <p className="text-lg">
                    Humeeは、<span className="font-bold">福祉施設とお仕事のマッチングを支援</span>し、
                    施設ごとの業務バランスや得意分野を可視化することで、
                    <span className="font-bold">よりよい支援の仕組みと環境を整える土台</span>をつくります。
                </p>
                <p className="text-lg">
                    さらに、Humeeの仕組みを活用することで、
                    <span className="font-bold">福祉に精通したIT人材の育成</span>を行い、
                    施設全体のスキルや専門性の底上げを図ることができます。
                </p>
                <p className="text-lg">
                    Humeeは、「支援の質」と「働く力」をつなぎ直す。
                    そして、社会に必要とされる
                    <span className="font-bold">&quot;最強の社会貢献アプリケーション&quot;</span> となることを目指しています。
                </p>
                </div>
            </div>
            </section>

            {/* What is Humee Section */}
            <section className="py-20 px-4">
            <div className="container max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">障がい者就労支援アプリ「Humee（ヒューミー）」とは？</h2>
                <Card className="mb-12">
                <CardContent className="pt-6 space-y-6">
                    <p className="text-lg">
                    Humeeは、全国の障がい者就労支援施設と企業・行政をつなぐ、クラウドソーシング型のマッチングプラットフォームです。
                    </p>
                    <p className="text-lg">
                    就労継続支援B型・A型施設と、仕事を委託したい企業を結び、&quot;人手不足&quot;と&quot;工賃向上&quot;の両方を同時に解決することを目指しています。
                    </p>
                </CardContent>
                </Card>
            </div>
            </section>

            {/* For Companies Section */}
            <section className="py-20 px-4 bg-muted">
            <div className="container max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">【企業・行政の方へ：Humeeはこんなニーズに応えます】</h2>
                <div className="bg-background p-8 rounded-lg space-y-4">
                <ul className="space-y-4">
                    <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                    <span>外注依頼先（デザイン・データ入力・動画編集など）を探している</span>
                    </li>
                    <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                    <span>ITやクリエイティブ人材を社外に確保したい</span>
                    </li>
                    <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                    <span>CSRやSDGs貢献に力を入れたい</span>
                    </li>
                    <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                    <span>障がい者雇用に関心があるが、現状は難しい</span>
                    </li>
                    <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                    <span>業務の一部を安心して任せたい</span>
                    </li>
                </ul>
                <p className="text-lg mt-6">
                    Humeeでは、施設単位で業務の依頼が可能です。障がい者雇用の前段階としても活用でき、中小企業でも無理なく社会貢献に参画できる仕組みです。
                </p>
                </div>
            </div>
            </section>

            {/* For Facilities Section */}
            <section className="py-20 px-4">
            <div className="container max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">【障がい者就労支援施設の方へ：Humeeの導入メリット】</h2>
                <Card>
                <CardContent className="pt-6">
                    <ul className="space-y-4">
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>継続的な業務を受注するための営業が不要に</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>利用者の工賃向上・ITスキル向上を実現</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>様々な実務経験が積め、就職準備の幅が広がる</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>IT支援が苦手な支援員も勉強会を受けられる</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>通所・在宅の両方で活用可能な案件が中心</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>施設は利用者に対して「奪い合い」ではなく、共に成長する支援構造を設計</span>
                    </li>
                    </ul>
                </CardContent>
                </Card>
            </div>
            </section>

            {/* Industry Challenges Section */}
            <section className="py-20 px-4 bg-muted">
            <div className="container max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">【Humeeが解決する、業界の&quot;見えにくい課題&quot;】</h2>
                <div className="bg-background p-8 rounded-lg space-y-6">
                <p className="text-lg">
                    障がい者就労支援は、施設ごとに大きな支援格差があります。
                </p>
                <p className="text-lg">
                    支援員のIT知識不足、データ管理の甘さ、企業との橋渡しができない構造などから、利用者が成長できず、就労につながらないケースも多発しています。
                </p>
                <p className="text-lg">
                    一方で企業側も、特例子会社の設立などは大企業でなければ困難。
                </p>
                <p className="text-lg">
                    中小企業では障がい者雇用の負担感が大きく、社会的関心はあっても実行に移せないのが現状です。
                </p>
                </div>
            </div>
            </section>

            {/* New Work Support Section */}
            <section className="py-20 px-4">
            <div className="container max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">【Humeeが提供する新しい就労支援のかたち】</h2>
                <Card>
                <CardContent className="pt-6">
                    <ul className="space-y-4">
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>オンライン案件の提供と仲介（月額不要・成果報酬制）</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>施設向け IT × 福祉のレクチャー提供（D福連携）</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>支援員育成・報酬改善につながるスキーム</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>企業との勉強会・交流促進イベントの定期開催</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>トライアル就労やマッチングの前段階としても機能</span>
                    </li>
                    <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0 text-primary" />
                        <span>「代行任せではない」本質的な雇用支援を企業と共創</span>
                    </li>
                    </ul>
                </CardContent>
                </Card>
            </div>
            </section>

            {/* Future Vision Section */}
            <section className="py-20 px-4 bg-muted">
            <div className="container max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">【目指す未来】</h2>
                <div className="bg-background p-8 rounded-lg space-y-6">
                <p className="text-lg">
                    Humeeは、障がいのある方が「自分らしく働ける社会」をデザインします。
                </p>
                <p className="text-lg">
                    それは同時に、企業が自然なかたちで障がい者雇用に関われる仕組みをつくるということでもあります。
                </p>
                <p className="text-lg font-bold text-center my-8">
                    Humee = Human × Me
                </p>
                <p className="text-lg">
                    人と人が「違い」を力に変え、社会とつながっていく。
                </p>
                <p className="text-lg">
                    それが、Humeeが描く「新しい就労支援の世界」です。
                </p>
                </div>
            </div>
            </section>

            {/* Reference Model Section */}
            <section className="py-20 px-4">
            <div className="container max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">【参考モデル】</h2>
                <Card>
                <CardContent className="pt-6 space-y-6">
                    <p className="text-lg">
                    Humeeは、Lancers・クラウドワークス・ココナラといったクラウドソーシングサービスを参考にしつつ、
                    障がい者支援施設専門に特化した、唯一無二の就労支援アプリとして開発されています。
                    </p>
                    <p className="text-lg">
                    ご希望があれば、この内容を「パンフレット形式」「チラシ形式」「営業資料スライド」などにリライト可能です。お気軽にご依頼ください。
                    </p>
                </CardContent>
                </Card>
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
    );
}