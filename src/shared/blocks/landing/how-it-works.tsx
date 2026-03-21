import Link from 'next/link';
import { ClipboardCopy, PenLine, SlidersHorizontal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/** 步骤配置 */
interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
  accent: string;
}

/** 三步流程 */
const STEPS: Step[] = [
  {
    icon: PenLine,
    title: 'Type or paste',
    description:
      'Enter your plain thoughts, or paste a LinkedIn post you want to decode. The LinkedIn Translator works with any length — from a single sentence to a full article.',
    accent: 'from-[#0077B5] to-[#00A0DC]',
  },
  {
    icon: SlidersHorizontal,
    title: 'Pick your style',
    description:
      'Choose intensity (Light, Standard, Extreme) and context (Career, Promotion, Project). Each combination gives you a different LinkedIn speak style tailored to the situation.',
    accent: 'from-[#00A0DC] to-[#0077B5]',
  },
  {
    icon: ClipboardCopy,
    title: 'Copy & post',
    description:
      'Get your LinkedIn-ready text instantly. Copy it and post — or tweak the intensity and translate again until the tone is exactly right.',
    accent: 'from-[#0077B5] to-[#005f8d]',
  },
];

/**
 * 使用步骤区域
 * 水平时间线布局，带编号和渐变图标
 */
export function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* 背景纹理 */}
      <div className="absolute inset-0 -z-10 bg-muted/20" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,119,181,1) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="container mx-auto max-w-5xl px-4">
        {/* 区域标题 */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            How the LinkedIn Translator Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps. Zero sign-up. Infinite LinkedIn energy.{' '}
            <Link
              href="/examples"
              className="text-[#0077B5] underline underline-offset-2"
            >
              See examples
            </Link>
          </p>
        </div>

        {/* 步骤卡片 */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className="group relative rounded-2xl border bg-card p-8 transition-all duration-300 hover:border-[#0077B5]/30 hover:shadow-xl hover:shadow-[#0077B5]/5"
              >
                {/* 编号 */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-5xl font-black text-[#0077B5]/10">
                    {index + 1}
                  </span>
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${step.accent} shadow-md`}
                  >
                    <Icon className="size-5 text-white" />
                  </div>
                </div>

                {/* 标题 */}
                <h3 className="mb-2 text-lg font-bold">{step.title}</h3>

                {/* 描述 */}
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>

                {/* 底部装饰线 */}
                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#0077B5]/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
