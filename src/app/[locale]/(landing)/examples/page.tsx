import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';

/** 独立示例页 SEO 元数据 */
export const metadata: Metadata = {
  title:
    'LinkedIn Translator Examples — Before & After LinkedIn Speak Translation',
  description:
    'See real examples of LinkedIn Translator in action. Compare normal text with LinkedIn-speak translations across career announcements, project updates, and more.',
  keywords: [
    'LinkedIn speak examples',
    'LinkedIn translator examples',
    'LinkedIn post before after',
    'LinkedIn buzzwords examples',
    'LinkedIn jargon decoded',
  ],
};

/** 翻译示例数据 */
const EXAMPLES: {
  category: string;
  pairs: { normal: string; linkedin: string }[];
}[] = [
  {
    category: 'Job Announcements',
    pairs: [
      {
        normal: 'I got a new job at a tech company.',
        linkedin:
          "I'm beyond humbled and grateful to announce that I'm embarking on an incredible new chapter in my professional journey. After years of hard work, late nights, and countless cups of coffee, I'm thrilled to share that I've accepted a position at an amazing tech company. This wouldn't have been possible without my incredible network. #NewBeginnings #Grateful #Blessed #TechLife",
      },
      {
        normal: 'I quit my job to start a business.',
        linkedin:
          "After much reflection, I've decided to close one chapter and bet on myself. Sometimes the bravest thing you can do is leap into the unknown. I'm so grateful for the incredible humans I met along the way, and I can't wait to share what's next. Stay tuned. The best is yet to come. 🚀 #Entrepreneurship #BetOnYourself #NewChapter",
      },
    ],
  },
  {
    category: 'Project Updates',
    pairs: [
      {
        normal: 'My team finished a project on time.',
        linkedin:
          "Proud moment 🎯 Our team just shipped something INCREDIBLE. What started as a whiteboard sketch became a product that's changing the game. This is what happens when you combine passion, purpose, and a team that refuses to accept mediocrity. So grateful for these rockstars. #TeamWork #Innovation #ShipIt",
      },
      {
        normal: 'We launched a new feature that users like.',
        linkedin:
          "🚀 LAUNCH DAY! After months of obsessing over every pixel and user story, we just dropped something special. The early feedback? Mind-blowing. When your users DM you saying 'this changed everything' — that's when you know you're building something that matters. #ProductLaunch #UserFirst #BuildInPublic",
      },
    ],
  },
  {
    category: 'Career Milestones',
    pairs: [
      {
        normal: 'I got promoted to senior developer.',
        linkedin:
          "Exciting news! 🎉 I'm thrilled to share that I've been promoted to Senior Developer. This journey has been anything but linear. Three years ago, I almost gave up on tech entirely. But I kept showing up, kept learning, and kept believing. To anyone feeling stuck: your breakthrough is closer than you think. #Growth #NeverGiveUp #SeniorDev",
      },
      {
        normal: "I've been at this company for 5 years.",
        linkedin:
          "5️⃣ years. 1,826 days. Countless lessons. Today marks my 5-year anniversary at this incredible company. When I started, I was just a junior with big dreams. Now I lead a team of 12 extraordinary humans. The secret? Stay curious, stay humble, and never stop adding value. Here's to the next 5! #WorkAnniversary #Gratitude #Leadership",
      },
    ],
  },
  {
    category: 'Conferences & Events',
    pairs: [
      {
        normal: 'I went to a tech conference.',
        linkedin:
          "Just returned from TechConf 2026 and my mind is BLOWN 🤯 Three days of incredible insights, powerful connections, and paradigm-shifting conversations. Key takeaway: the future belongs to those who show up. Already counting down to next year. Who else was there? Drop a 🙌 below! #NeverStopLearning #Networking #TechConf2026",
      },
      {
        normal: 'I gave a talk at a meetup.',
        linkedin:
          "🎤 Stepping on stage used to be my biggest fear. Today, I delivered a keynote to 200+ incredible professionals. The topic? Why vulnerability is your greatest leadership superpower. The standing ovation at the end? I'm not crying, YOU'RE crying. 😭 Thank you to everyone who made this possible. #PublicSpeaking #Leadership #VulnerabilityIsStrength",
      },
    ],
  },
  {
    category: 'Failures & Lessons',
    pairs: [
      {
        normal: 'I failed at something and learned from it.',
        linkedin:
          "Unpopular opinion: My biggest failure taught me more than my biggest success ever could. Last quarter, I led an initiative that didn't go as planned. We lost time, money, and momentum. But here's what nobody tells you about failure — it's the greatest teacher if you're willing to listen. Three lessons I'll carry forever: 1) Fail fast 2) Fail forward 3) Fail publicly. Who else has a failure story that changed everything? 👇 #Resilience #GrowthMindset #FailForward",
      },
      {
        normal: "I got rejected from a job I really wanted.",
        linkedin:
          "I just got the rejection email. The role I'd been dreaming about for months — gone. My first instinct? Crawl under the covers and binge Netflix. Instead, I did something radical: I sent the hiring manager a THANK YOU note. Three weeks later, they referred me to an even better opportunity. The lesson? Every 'no' is a redirection, not a rejection. 🙏 #Rejection #Mindset #CareerGrowth",
      },
    ],
  },
  {
    category: 'Side Projects',
    pairs: [
      {
        normal: 'I built a small app on the weekend.',
        linkedin:
          "🔥 48 hours. One idea. Zero sleep. This weekend I built something from scratch that I've been thinking about for months. Is it perfect? No. Is it a start? Absolutely. The hardest part wasn't the code — it was hitting 'publish.' To every builder sitting on an idea: JUST SHIP IT. The world needs what you're building. #BuildInPublic #SideProject #JustShipIt",
      },
      {
        normal: 'I started writing a blog.',
        linkedin:
          "Today I hit 'publish' on my first blog post. My heart was racing. My imposter syndrome was screaming. But I did it anyway. Because I realized something powerful: your voice doesn't need to be perfect — it needs to be HEARD. If my words help even ONE person, it will all be worth it. Follow along for the journey. 📝 #ContentCreator #AuthenticVoice #JustStart",
      },
    ],
  },
];

export default async function ExamplesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto max-w-5xl px-4 py-16 md:py-24">
      {/* 页面标题 */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          LinkedIn Translator Examples
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          See how normal human thoughts get transformed into peak LinkedIn
          energy — and vice versa.
        </p>
      </div>

      {/* 示例分类 */}
      {EXAMPLES.map((group) => (
        <section key={group.category} className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">{group.category}</h2>
          <div className="space-y-6">
            {group.pairs.map((pair, idx) => (
              <Card key={idx}>
                <CardContent className="grid gap-4 md:grid-cols-[1fr_auto_1fr]">
                  {/* 普通文本 */}
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-muted px-3 py-1 text-xs font-medium">
                      Normal
                    </span>
                    <p className="text-sm leading-relaxed">{pair.normal}</p>
                  </div>

                  {/* 箭头 */}
                  <div className="hidden items-center md:flex">
                    <ArrowRight className="size-5 text-[#0077B5]" />
                  </div>
                  <div className="flex justify-center md:hidden">
                    <ArrowRight className="size-5 rotate-90 text-[#0077B5]" />
                  </div>

                  {/* LinkedIn 文本 */}
                  <div>
                    <span className="mb-2 inline-block rounded-full bg-[#0077B5]/10 px-3 py-1 text-xs font-medium text-[#0077B5]">
                      LinkedIn Speak
                    </span>
                    <p className="text-sm leading-relaxed">{pair.linkedin}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ))}

      {/* 底部 CTA */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold">Try It Yourself</h2>
        <p className="mt-2 text-muted-foreground">
          Transform your own text into LinkedIn-speak or decode any post.
        </p>
        <div className="mt-6">
          <Button
            asChild
            size="lg"
            className="bg-[#0077B5] text-white hover:bg-[#005f8d]"
          >
            <a href="/#translator">Start Translating Free</a>
          </Button>
        </div>
      </div>

      {/* JSON-LD 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'LinkedIn Translator Examples',
            description:
              'Real examples of LinkedIn Speak translations — before and after comparisons.',
            url: 'https://linkedintranslator.net/examples',
            isPartOf: {
              '@type': 'WebSite',
              name: 'LinkedIn Translator',
              url: 'https://linkedintranslator.net',
            },
          }),
        }}
      />
    </div>
  );
}
