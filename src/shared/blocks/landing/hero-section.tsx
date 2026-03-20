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

/**
 * 首页 Hero 区域
 * 包含 H1 标题、副标题、CTA 按钮和信任标识
 */
export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* 渐变背景 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0077B5]/5 via-transparent to-[#0077B5]/10" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(0,119,181,0.12),transparent)]" />

      <div className="container mx-auto max-w-4xl px-4 py-20 text-center md:py-32">
        {/* 主标题 */}
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          LinkedIn Translator —{' '}
          <span className="bg-gradient-to-r from-[#0077B5] to-[#00A0DC] bg-clip-text text-transparent">
            Turn Plain English into LinkedIn-Ready Posts
          </span>
        </h1>

        {/* 副标题 */}
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Transform your honest thoughts into polished LinkedIn posts, or decode
          corporate buzzword soup back into plain English. Free, fast, and
          AI-powered.
        </p>

        {/* CTA 按钮组 */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            className="bg-[#0077B5] px-8 text-base text-white hover:bg-[#005f8d]"
          >
            <a href="#translator">
              Start Translating Free
              <ArrowDown className="ml-1.5 size-4" />
            </a>
          </Button>
          <Button asChild variant="outline" size="lg" className="px-8 text-base">
            <a href="#examples">See Examples</a>
          </Button>
        </div>

        {/* 信任标识 */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {TRUST_BADGES.map(({ icon: Icon, label }) => (
            <Badge
              key={label}
              variant="secondary"
              className="gap-1.5 px-3 py-1 text-sm font-normal"
            >
              <Icon className="size-3.5" />
              {label}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
}
