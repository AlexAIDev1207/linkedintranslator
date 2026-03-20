import { ClipboardCopy, PenLine, SlidersHorizontal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Card, CardContent } from '@/shared/components/ui/card';

/** 步骤配置类型 */
interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

/** 三步流程配置 */
const STEPS: Step[] = [
  {
    icon: PenLine,
    title: 'Type your text',
    description:
      'Enter your plain thoughts or paste a LinkedIn post you want to decode.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Pick your style',
    description:
      'Choose intensity (Light, Standard, or Extreme) and context (Career, Promotion, Project).',
  },
  {
    icon: ClipboardCopy,
    title: 'Copy & post',
    description:
      'Get your LinkedIn-ready text instantly. Copy it and watch the engagement roll in.',
  },
];

/**
 * 使用步骤区域
 * 展示三步操作流程，含编号和图标
 */
export function HowItWorks() {
  return (
    <section className="bg-muted/30 py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        {/* 区域标题 */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            How to Use the LinkedIn Translator in 3 Steps
          </h2>
        </div>

        {/* 步骤卡片 */}
        <div className="grid gap-8 md:grid-cols-3">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="relative text-center">
                <CardContent className="flex flex-col items-center gap-4 pt-2">
                  {/* 编号圆圈 */}
                  <div className="flex size-12 items-center justify-center rounded-full bg-[#0077B5] text-lg font-bold text-white">
                    {index + 1}
                  </div>
                  {/* 图标 */}
                  <Icon className="size-8 text-[#0077B5]" />
                  {/* 标题 */}
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  {/* 描述 */}
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
