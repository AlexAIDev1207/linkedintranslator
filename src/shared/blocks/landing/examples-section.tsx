'use client';

import { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

/** 翻译示例数据 */
interface TranslationExample {
  label: string;
  emoji: string;
  normal: string;
  linkedin: string;
}

const EXAMPLES: TranslationExample[] = [
  {
    label: 'New Job',
    emoji: '\u{1F389}',
    normal: 'I got a new job.',
    linkedin:
      "I'm beyond humbled and grateful to announce that I'm embarking on an incredible new chapter in my professional journey. After years of hard work, late nights, and countless cups of coffee, I'm thrilled to share this news. #NewBeginnings #Grateful #Blessed",
  },
  {
    label: 'Quitting',
    emoji: '\u{1F44B}',
    normal: 'I left my job.',
    linkedin:
      "After much reflection, I've decided to close one chapter and begin another. Sometimes the bravest thing you can do is bet on yourself. I'm so grateful for the incredible humans I met along the way. #Entrepreneurship #Growth",
  },
  {
    label: 'Project Done',
    emoji: '\u{1F680}',
    normal: 'My team finished a project.',
    linkedin:
      "Proud moment \u{1F3AF} Our team just shipped something INCREDIBLE. This is what happens when you combine passion, purpose, and a team that refuses to accept mediocrity. #TeamWork #Innovation #ShipIt",
  },
  {
    label: 'Conference',
    emoji: '\u{1F4A1}',
    normal: 'I went to a conference.',
    linkedin:
      "Just returned from the conference and my mind is BLOWN \u{1F92F} Three days of incredible insights, powerful connections, and paradigm-shifting conversations. The future belongs to those who show up. #NeverStopLearning",
  },
  {
    label: 'Failure',
    emoji: '\u{1F4AA}',
    normal: 'I failed at something.',
    linkedin:
      "Unpopular opinion: My biggest failure taught me more than my biggest success ever could. Here's what nobody tells you about failure... it's the greatest teacher. #Resilience #GrowthMindset",
  },
];

/**
 * 翻译示例区域
 * 左侧选项卡 + 右侧对比展示
 */
export function ExamplesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = EXAMPLES[activeIndex];

  return (
    <section id="examples" className="scroll-mt-16 py-20 md:py-28">
      <div className="container mx-auto max-w-5xl px-4">
        {/* 区域标题 */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#0077B5]/20 bg-[#0077B5]/5 px-3 py-1 text-xs font-medium text-[#0077B5]">
            <Sparkles className="size-3" />
            See it in action
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            LinkedIn Translator Examples
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Normal human thoughts vs. peak LinkedIn energy.
          </p>
        </div>

        {/* 选项卡式交互展示 */}
        <div className="overflow-hidden rounded-2xl border bg-card shadow-xl shadow-black/[0.03]">
          {/* 顶部场景选择栏 */}
          <div className="flex overflow-x-auto border-b bg-muted/30">
            {EXAMPLES.map((ex, i) => (
              <button
                key={ex.label}
                onClick={() => setActiveIndex(i)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-5 py-3.5 text-sm font-medium transition-all ${
                  i === activeIndex
                    ? 'border-[#0077B5] bg-background text-[#0077B5]'
                    : 'border-transparent text-muted-foreground hover:bg-background/50 hover:text-foreground'
                }`}
              >
                <span>{ex.emoji}</span>
                {ex.label}
              </button>
            ))}
          </div>

          {/* 对比内容区 */}
          <div className="grid md:grid-cols-2">
            {/* 左栏：Normal */}
            <div className="flex flex-col justify-center border-b p-8 md:border-b-0 md:border-r md:p-10">
              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex size-6 items-center justify-center rounded-md bg-muted text-xs font-bold text-muted-foreground">
                  A
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/60">
                  What you actually mean
                </span>
              </div>
              <p className="text-2xl font-semibold leading-snug md:text-3xl">
                {active.normal}
              </p>
              <p className="mt-4 text-sm text-muted-foreground/50">
                Simple. Honest. Human.
              </p>
            </div>

            {/* 右栏：LinkedIn */}
            <div className="relative flex flex-col justify-center bg-[#0077B5]/[0.02] p-8 md:p-10">
              {/* 装饰引号 */}
              <span className="absolute right-6 top-4 text-6xl font-serif leading-none text-[#0077B5]/[0.06]">
                &ldquo;
              </span>

              <div className="mb-4 flex items-center gap-2">
                <span className="inline-flex size-6 items-center justify-center rounded-md bg-[#0077B5]/10 text-xs font-bold text-[#0077B5]">
                  B
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#0077B5]/60">
                  What LinkedIn hears
                </span>
              </div>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {active.linkedin}
              </p>
            </div>
          </div>

          {/* 底部 CTA */}
          <div className="flex items-center justify-between border-t bg-muted/20 px-8 py-4">
            <p className="text-sm text-muted-foreground">
              Try it yourself with your own text
            </p>
            <Button
              asChild
              size="sm"
              className="rounded-lg bg-[#0077B5] text-white hover:bg-[#005f8d]"
            >
              <a href="#translator">
                Translate Now
                <ArrowRight className="ml-1.5 size-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
