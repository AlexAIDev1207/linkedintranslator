import { ArrowRight } from 'lucide-react';

import { Card, CardContent } from '@/shared/components/ui/card';

/** 翻译示例数据类型 */
interface TranslationExample {
  normal: string;
  linkedin: string;
}

/** 翻译前后对比示例 */
const EXAMPLES: TranslationExample[] = [
  {
    normal: 'I got a new job.',
    linkedin:
      "I'm beyond humbled and grateful to announce that I'm embarking on an incredible new chapter in my professional journey. After years of hard work, late nights, and countless cups of coffee, I'm thrilled to share that I've accepted a position as [role] at [company]. #NewBeginnings #Grateful #Blessed",
  },
  {
    normal: 'I left my job.',
    linkedin:
      "After much reflection, I've decided to close one chapter and begin another. Sometimes the bravest thing you can do is bet on yourself. I'm so grateful for everything I learned and the incredible humans I met along the way. Stay tuned for what's next! #Entrepreneurship #Growth",
  },
  {
    normal: 'My team finished a project.',
    linkedin:
      "Proud moment \u{1F3AF} Our team just shipped something INCREDIBLE. What started as a whiteboard sketch became a product that's changing the game. This is what happens when you combine passion, purpose, and a team that refuses to accept mediocrity. #TeamWork #Innovation",
  },
  {
    normal: 'I went to a conference.',
    linkedin:
      "Just returned from [conference] and my mind is BLOWN \u{1F92F} Three days of incredible insights, powerful connections, and paradigm-shifting conversations. Key takeaway: the future belongs to those who show up. #NeverStopLearning #Growth",
  },
  {
    normal: 'I failed at something.',
    linkedin:
      'Unpopular opinion: My biggest failure taught me more than my biggest success ever could. Last quarter, I led an initiative that didn\'t go as planned. But here\'s what nobody tells you about failure... it\'s the greatest teacher. #Resilience #GrowthMindset',
  },
];

/**
 * 翻译示例区域
 * 展示 5 个前后对比的翻译示例卡片
 */
export function ExamplesSection() {
  return (
    <section id="examples" className="scroll-mt-16 py-16 md:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        {/* 区域标题 */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            LinkedIn Translator Examples That Actually Sound Real
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            See how everyday thoughts get the full LinkedIn treatment.
          </p>
        </div>

        {/* 示例卡片列表 */}
        <div className="space-y-6">
          {EXAMPLES.map((example, index) => (
            <ExampleCard key={index} example={example} />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * 单个翻译示例卡片
 * 左侧为普通文本，右侧为 LinkedIn 风格文本
 */
function ExampleCard({ example }: { example: TranslationExample }) {
  return (
    <Card className="overflow-hidden py-0">
      <CardContent className="grid gap-0 p-0 md:grid-cols-[1fr_auto_1fr]">
        {/* 左栏：普通文本 */}
        <div className="flex flex-col gap-2 p-6">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Normal
          </span>
          <p className="text-sm leading-relaxed">{example.normal}</p>
        </div>

        {/* 箭头分隔 */}
        <div className="flex items-center justify-center border-t px-4 py-2 md:border-t-0 md:border-l md:border-r md:py-0">
          <ArrowRight className="size-5 rotate-90 text-[#0077B5] md:rotate-0" />
        </div>

        {/* 右栏：LinkedIn 风格文本 */}
        <div className="flex flex-col gap-2 border-t p-6 md:border-t-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0077B5]">
            LinkedIn
          </span>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {example.linkedin}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
