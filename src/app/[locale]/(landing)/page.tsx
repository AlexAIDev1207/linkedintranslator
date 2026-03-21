import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ArrowUp } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  ExamplesSection,
  FaqSection,
  HeroSection,
  HowItWorks,
  TestimonialsSection,
  WhySection,
} from '@/shared/blocks/landing';
import { TranslatorPanel } from '@/shared/blocks/translator';

/** 页面级 SEO 元数据 */
export const metadata: Metadata = {
  title: 'LinkedIn Translator — Translate to/from LinkedIn Speak',
  description:
    'Free AI LinkedIn Translator. Turn plain English into LinkedIn-speak or decode corporate posts back to normal. No sign-up required.',
};

export const revalidate = 3600;

export default async function LandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Hero 区域 */}
      <HeroSection />

      {/* 翻译器主面板 */}
      <section id="translator" className="scroll-mt-16 py-16 md:py-24">
        <div className="container mx-auto max-w-5xl px-4">
          <TranslatorPanel />
        </div>
      </section>

      {/* 翻译示例 */}
      <ExamplesSection />

      {/* 使用步骤 */}
      <HowItWorks />

      {/* 为什么选择 LinkedIn Translator */}
      <WhySection />

      {/* 常见问题 */}
      <FaqSection />

      {/* 用户评价 */}
      <TestimonialsSection />

      {/* SoftwareApplication JSON-LD — 用于 Google 搜索结果和工具目录抓取 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'LinkedIn Translator',
            url: 'https://linkedintranslator.net',
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            description:
              'Free AI tool to translate normal text into LinkedIn-speak, or decode LinkedIn posts back to plain English.',
            featureList: [
              'Bidirectional translation (to/from LinkedIn speak)',
              'Multiple intensity levels (Light, Standard, Extreme)',
              'Context-aware (Career, Promotion, Project)',
              'No sign-up required',
              'AI-powered',
            ],
          }),
        }}
      />

      {/* 底部 CTA */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0077B5]/[0.06] via-transparent to-[#00A0DC]/[0.06]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_50%_80%_at_50%_100%,rgba(0,119,181,0.08),transparent)]" />
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            Ready to Speak Fluent LinkedIn?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground">
            Join thousands of professionals who use LinkedIn Translator to craft
            posts that actually get engagement.
          </p>
          <div className="mt-10">
            <Button
              asChild
              size="lg"
              className="group h-12 rounded-xl bg-[#0077B5] px-8 text-base font-semibold text-white shadow-lg shadow-[#0077B5]/25 transition-all hover:bg-[#005f8d] hover:shadow-xl hover:shadow-[#0077B5]/30"
            >
              <a href="#translator">
                Start Translating — It&apos;s Free
                <ArrowUp className="ml-2 size-4 transition-transform group-hover:-translate-y-0.5" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
