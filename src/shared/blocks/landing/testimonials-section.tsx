import { MessageCircle, Star } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
} from '@/shared/components/ui/card';

/** 用户评价数据 */
interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

/** 评价列表 */
const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'I used to spend twenty minutes rewriting every LinkedIn post to sound professional enough. Now I paste my thoughts into the LinkedIn Translator, pick Standard intensity, and I have a polished post in seconds. My engagement has gone up noticeably since I started using it.',
    name: 'Sarah K.',
    role: 'Marketing Manager',
  },
  {
    quote:
      'During my job search I needed to announce my career transition without sounding desperate. The LinkedIn Translator nailed the tone on the first try — confident but genuine. I also use the decode mode to figure out what recruiters actually mean in their posts.',
    name: 'James R.',
    role: 'Job Seeker',
  },
  {
    quote:
      'As a content creator I write on LinkedIn daily. This corporate jargon translator saves me so much time. The intensity slider is genius — Light for thought pieces, Extreme when I want maximum virality. It genuinely understands LinkedIn speak better than any generic AI tool I have tried.',
    name: 'Alex T.',
    role: 'Content Creator',
  },
];

/**
 * 用户评价区域
 * 三列卡片布局，带五星评分
 */
export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto max-w-5xl px-4">
        {/* 区域标题 */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#0077B5]/20 bg-[#0077B5]/5 px-3 py-1 text-xs font-medium text-[#0077B5]">
            <MessageCircle className="size-3" />
            Testimonials
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            What Professionals Say About LinkedIn Translator
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Thousands of professionals rely on our LinkedIn speak translator to
            craft better posts and decode corporate jargon every day.
          </p>
        </div>

        {/* 评价卡片网格 */}
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {TESTIMONIALS.map((t) => (
            <Card
              key={t.name}
              className="group relative transition-all duration-300 hover:border-[#0077B5]/30 hover:shadow-xl hover:shadow-[#0077B5]/5"
            >
              {/* 装饰引号 */}
              <span className="absolute right-5 top-3 text-5xl font-serif leading-none text-[#0077B5]/[0.06]">
                &ldquo;
              </span>

              <CardContent className="pt-2">
                {/* 五星评分 */}
                <div className="mb-4 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="size-4 fill-[#0077B5] text-[#0077B5]"
                    />
                  ))}
                </div>

                {/* 引用文本 */}
                <blockquote className="text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
              </CardContent>

              <CardFooter className="border-t pt-4">
                {/* 头像占位 */}
                <div className="flex size-9 items-center justify-center rounded-full bg-[#0077B5]/10 text-sm font-bold text-[#0077B5]">
                  {t.name[0]}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
