'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, Bot, Gift, Repeat2, UserCheck } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';

/** 信任标识配置 */
const TRUST_BADGES = [
  { icon: Gift, label: 'Free to use' },
  { icon: UserCheck, label: 'No sign-up required' },
  { icon: Bot, label: 'AI-Powered' },
  { icon: Repeat2, label: 'Two-way translation' },
] as const;

/** LinkedIn 风格的轮播短语 */
const ROTATING_WORDS = [
  'LinkedIn-Ready',
  'Synergistic',
  'Thought-Leading',
  'Value-Driven',
  'Game-Changing',
] as const;

/**
 * 首页 Hero 区域
 * 带旋转关键词动画和精致排版的沉浸式 Hero
 */
export function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* 多层背景效果 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0077B5]/[0.04] via-transparent to-transparent" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(0,119,181,0.1),transparent)]" />

      {/* 装饰性网格 */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,119,181,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,119,181,1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="container mx-auto max-w-5xl px-4 pb-16 pt-20 md:pb-24 md:pt-32">
        {/* 顶部标记 */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0077B5]/20 bg-[#0077B5]/5 px-4 py-1.5 text-sm text-[#0077B5]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#0077B5] opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-[#0077B5]" />
            </span>
            Free &middot; No Sign-up &middot; AI-Powered
          </div>
        </div>

        {/* 主标题 */}
        <h1 className="mx-auto max-w-4xl text-center text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
          LinkedIn Translator — Turn Plain English into{' '}
          <span className="relative inline-block">
            <span
              key={wordIndex}
              className="bg-gradient-to-r from-[#0077B5] to-[#00A0DC] bg-clip-text text-transparent transition-opacity duration-500"
            >
              {ROTATING_WORDS[wordIndex]}
            </span>
            <span className="absolute -bottom-1 left-0 h-1 w-full rounded-full bg-gradient-to-r from-[#0077B5] to-[#00A0DC] opacity-30" />
          </span>{' '}
          Posts
        </h1>

        {/* 副标题 */}
        <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground md:text-xl">
          The{' '}
          <span className="font-medium text-foreground">
            LinkedIn Translator
          </span>{' '}
          transforms your honest thoughts into polished LinkedIn posts — or
          decodes corporate buzzword soup back into plain English.
        </p>

        {/* 补充说明段落 */}
        <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground/80">
          Whether you&apos;re announcing a new job, sharing a project update, or
          just trying to decode what your colleague actually means by
          &ldquo;leveraging synergies&rdquo; — LinkedIn Translator has you
          covered. Choose from three intensity levels and five context modes for
          the perfect translation every time.
        </p>

        {/* CTA 按钮组 */}
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button
            asChild
            size="lg"
            className="group h-12 rounded-xl bg-[#0077B5] px-8 text-base font-semibold text-white shadow-lg shadow-[#0077B5]/25 transition-all hover:bg-[#005f8d] hover:shadow-xl hover:shadow-[#0077B5]/30"
          >
            <a href="#translator">
              Start Translating Free
              <ArrowDown className="ml-2 size-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-xl px-8 text-base"
          >
            <a href="#examples">See Examples</a>
          </Button>
        </div>

        {/* 信任标识 */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-2.5">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <Badge
              key={label}
              variant="outline"
              className="gap-1.5 rounded-full border-border/50 bg-background/50 px-3.5 py-1.5 text-xs font-normal text-muted-foreground backdrop-blur-sm"
            >
              <Icon className="size-3.5 text-[#0077B5]" />
              {label}
            </Badge>
          ))}
        </div>

        {/* 社交验证 */}
        <p className="mt-8 text-center text-xs tracking-wide text-muted-foreground/60">
          Inspired by the viral LinkedIn Speak moment &middot; Trusted by
          professionals worldwide
        </p>
      </div>
    </section>
  );
}
