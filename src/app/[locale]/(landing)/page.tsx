import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ArrowUp } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  ExamplesSection,
  FaqSection,
  HeroSection,
  HowItWorks,
} from '@/shared/blocks/landing';
import { TranslatorPanel } from '@/shared/blocks/translator';

/** 页面级 SEO 元数据 */
export const metadata: Metadata = {
  title: 'LinkedIn Translator — Free AI Tool to Translate LinkedIn Speak',
  description:
    'Translate normal text into LinkedIn-speak, or decode LinkedIn posts back to plain English. Free, AI-powered, no sign-up required.',
  keywords: [
    'LinkedIn translator',
    'LinkedIn post generator',
    'LinkedIn speak',
    'corporate jargon translator',
    'LinkedIn buzzword translator',
    'AI LinkedIn tool',
    'LinkedIn post writer',
    'translate to LinkedIn',
    'decode LinkedIn posts',
  ],
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

      {/* 常见问题 */}
      <FaqSection />

      {/* 底部 CTA */}
      <section className="bg-gradient-to-r from-[#0077B5]/10 to-[#00A0DC]/10 py-16 md:py-24">
        <div className="container mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Try the LinkedIn Translator Now — It&apos;s Free
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of professionals who use LinkedIn Translator to craft
            the perfect post.
          </p>
          <div className="mt-8">
            <Button
              asChild
              size="lg"
              className="bg-[#0077B5] px-8 text-base text-white hover:bg-[#005f8d]"
            >
              <a href="#translator">
                Start Translating
                <ArrowUp className="ml-1.5 size-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
