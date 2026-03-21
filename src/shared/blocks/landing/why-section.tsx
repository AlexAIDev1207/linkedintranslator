import Link from 'next/link';
import {
  ArrowLeftRight,
  Check,
  Gauge,
  Layers,
  MessageSquareText,
  Target,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/** 功能亮点项 */
interface Feature {
  icon: LucideIcon;
  text: string;
}

/** 右侧功能列表 */
const FEATURES: Feature[] = [
  {
    icon: ArrowLeftRight,
    text: 'Bidirectional translation — to and from LinkedIn Speak',
  },
  {
    icon: Gauge,
    text: 'Three intensity levels from subtle polish to full thought-leader mode',
  },
  {
    icon: Layers,
    text: 'Five context modes tailored for career, promotion, projects, and more',
  },
  {
    icon: Target,
    text: 'Purpose-built for LinkedIn — not a generic AI writing tool',
  },
  {
    icon: MessageSquareText,
    text: 'Understands LinkedIn-specific buzzwords, hashtags, and post structures',
  },
];

/**
 * "为什么选择 LinkedIn Translator" 区域
 * 两栏布局：左侧长文案 + 右侧功能亮点列表
 */
export function WhySection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* 背景装饰 */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0077B5]/[0.03] via-transparent to-[#00A0DC]/[0.03]" />

      <div className="container mx-auto max-w-5xl px-4">
        {/* 区域标题 */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
            Why Use LinkedIn Translator?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            A dedicated LinkedIn speak translator built for the unique
            challenges of professional networking content.
          </p>
        </div>

        {/* 两栏内容 */}
        <div className="grid items-start gap-12 md:grid-cols-2 md:gap-16">
          {/* 左栏：文案 */}
          <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p>
              LinkedIn has its own language. Every platform does, but
              LinkedIn&apos;s corporate dialect — full of &ldquo;leveraging
              synergies,&rdquo; &ldquo;thought leadership,&rdquo; and
              &ldquo;humbled and grateful&rdquo; announcements — is in a league
              of its own. Writing posts that match these platform expectations
              while still sounding authentic is a real challenge, and that is
              exactly what the{' '}
              <strong className="text-foreground">LinkedIn Translator</strong>{' '}
              was designed to solve.
            </p>

            <p>
              Unlike generic AI writers that produce bland, one-size-fits-all
              content, our corporate jargon translator is purpose-built for
              LinkedIn. It understands the unwritten rules of the platform: how
              the algorithm rewards certain post structures, why vulnerability
              stories go viral, and which buzzwords signal credibility versus
              which ones make readers cringe. The result is a translation that
              feels natural to the LinkedIn audience — not robotic or
              over-the-top.
            </p>

            <p>
              The tool works in both directions. Need to{' '}
              <strong className="text-foreground">
                translate to LinkedIn
              </strong>{' '}
              speak for a job announcement or project update? Choose your
              intensity level and context, and the AI crafts a polished post in
              seconds. Trying to decode what someone actually meant beneath three
              paragraphs of buzzwords? Switch to decode mode and get the honest
              version instantly. This bidirectional approach sets the LinkedIn
              Translator apart from every other LinkedIn post generator on the
              market.
            </p>

            <p>
              Context matters, too. A career transition post needs a different
              tone than a project milestone update. Our LinkedIn speak translator
              offers five context modes so every translation matches the
              situation. Pair that with three intensity levels — from a subtle
              professional polish to full &ldquo;thought-leader
              extreme&rdquo; — and you have complete control over how your post
              sounds. No other tool gives you this level of fine-tuning for
              LinkedIn content.
            </p>

            <p>
              Curious how we compare to other options? Read our{' '}
              <Link
                href="/blog/best-linkedin-post-generators"
                className="font-medium text-[#0077B5] underline underline-offset-2"
              >
                guide to the best LinkedIn post generators
              </Link>{' '}
              for a detailed breakdown. And if you want to master the art of
              LinkedIn writing yourself, our{' '}
              <Link
                href="/blog/linkedin-buzzwords-translated"
                className="font-medium text-[#0077B5] underline underline-offset-2"
              >
                LinkedIn buzzwords translated
              </Link>{' '}
              cheat sheet is a great place to start.
            </p>
          </div>

          {/* 右栏：功能亮点列表 */}
          <div className="rounded-2xl border bg-card p-8 shadow-lg shadow-black/[0.03]">
            <h3 className="mb-6 text-lg font-bold">
              What Makes This LinkedIn Translator Different
            </h3>
            <ul className="space-y-5">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg bg-[#0077B5]/10">
                    <Check className="size-3.5 text-[#0077B5]" />
                  </span>
                  <div className="flex items-start gap-2">
                    <Icon className="mt-0.5 size-4 shrink-0 text-[#0077B5]/60" />
                    <span className="text-sm leading-relaxed text-muted-foreground">
                      {text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* 小 CTA */}
            <div className="mt-8 rounded-xl bg-[#0077B5]/5 px-5 py-4 text-sm leading-relaxed text-muted-foreground">
              <span className="font-medium text-foreground">
                Bottom line:
              </span>{' '}
              If you write on LinkedIn — or just need to decode what everyone
              else is saying — the LinkedIn Translator is the fastest, most
              accurate way to bridge the gap between real talk and LinkedIn
              speak.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
