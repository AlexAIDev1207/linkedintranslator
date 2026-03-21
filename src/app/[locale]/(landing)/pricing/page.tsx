import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getThemePage } from '@/core/theme';
import { getMetadata } from '@/shared/lib/seo';
import { getCurrentSubscription } from '@/shared/models/subscription';
import { getUserInfo } from '@/shared/models/user';
import { DynamicPage } from '@/shared/types/blocks/landing';

export const revalidate = 3600;

export const generateMetadata = getMetadata({
  metadataKey: 'pages.pricing.metadata',
  canonicalUrl: '/pricing',
});

/** LinkedIn 蓝色主题色 */
const LINKEDIN_BLUE = '#0077B5';

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 获取当前订阅信息
  let currentSubscription;
  try {
    const user = await getUserInfo();
    if (user) {
      currentSubscription = await getCurrentSubscription(user.id);
    }
  } catch {
    // 未登录或获取订阅失败时静默忽略，页面仍正常渲染
  }

  // 获取定价页国际化数据
  const t = await getTranslations('pages.pricing');

  // 构建页面区块
  const page: DynamicPage = {
    title: t.raw('page.title'),
    sections: {
      pricing: {
        ...t.raw('page.sections.pricing'),
        data: {
          currentSubscription,
        },
      },
    },
  };

  // 加载主题页面组件
  const Page = await getThemePage('dynamic-page');

  return (
    <>
      {/* SEO 顶部内容 — 定价理念介绍 */}
      <div className="container mx-auto max-w-4xl px-4 pt-16 md:pt-24">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            LinkedIn Translator Pricing
          </h1>
          <div className="mx-auto mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              LinkedIn Translator is built on a simple philosophy: everyone
              deserves access to better professional communication. That is
              why our generous free tier covers most everyday use cases — no
              credit card required, no hidden fees, no time-limited trials.
              Just open the tool and start translating.
            </p>
            <p>
              For professionals who rely on LinkedIn Translator daily —
              recruiters, content creators, job seekers, and social media
              managers — our Pro plan unlocks unlimited translations, priority
              AI processing, and advanced customization options at a
              transparent, affordable price. Every plan includes full access
              to all five context modes and all three intensity levels, so you
              always get the complete LinkedIn Translator experience.
            </p>
          </div>
        </div>
      </div>

      {/* 动态定价组件（模板驱动） */}
      <Page locale={locale} page={page} />

      {/* SEO 底部内容 — FAQ + 方案对比 */}
      <div className="container mx-auto max-w-4xl px-4 pb-16 md:pb-24">
        {/* 常见问题 */}
        <section className="mt-16">
          <h2
            className="mb-8 text-center text-2xl font-semibold"
            style={{ color: LINKEDIN_BLUE }}
          >
            Pricing FAQ
          </h2>
          <div className="space-y-8 text-base leading-relaxed text-muted-foreground">
            <div>
              <h3 className="mb-2 text-lg font-medium text-foreground">
                Can I use LinkedIn Translator for free?
              </h3>
              <p>
                Absolutely. LinkedIn Translator offers a free tier that
                includes a generous daily allowance of translations. You can
                use all core features — bidirectional translation, all five
                context modes, and all three intensity levels — without
                creating an account or entering payment details. Most casual
                users find the free tier more than sufficient.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium text-foreground">
                What happens when I run out of credits?
              </h3>
              <p>
                If you reach your daily free limit, you can either wait for
                credits to refresh the next day or upgrade to Pro for
                unlimited translations. The LinkedIn Translator will always
                let you know how many credits remain so there are no
                surprises. Pro subscribers never have to worry about limits.
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-medium text-foreground">
                Can I cancel my subscription?
              </h3>
              <p>
                Yes, you can cancel your LinkedIn Translator Pro subscription
                at any time from your account settings. There are no
                cancellation fees, no lock-in periods, and no questions asked.
                After cancellation your Pro benefits remain active until the
                end of your current billing period, then you return to the
                free tier automatically.
              </p>
            </div>
          </div>
        </section>

        {/* 方案对比 */}
        <section className="mt-16">
          <h2
            className="mb-6 text-center text-2xl font-semibold"
            style={{ color: LINKEDIN_BLUE }}
          >
            Compare LinkedIn Translator Plans
          </h2>
          <div className="mx-auto max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Both the Free and Pro plans give you full access to the LinkedIn
              Translator engine — the same AI model, the same translation
              quality, and the same range of context modes and intensity
              settings. The difference is volume and speed: Free users enjoy a
              daily credit allowance with standard processing, while Pro
              members get unlimited translations with priority queue access
              and faster response times.
            </p>
            <p>
              If you post on LinkedIn occasionally, the free plan has you
              covered. If you manage multiple profiles, draft content for
              clients, or simply translate posts all day for entertainment,
              the Pro plan pays for itself in saved time and unlimited
              creative freedom.
            </p>
          </div>
        </section>

        {/* 谁需要 LinkedIn Translator Pro */}
        <section className="mt-16">
          <h2
            className="mb-6 text-center text-2xl font-semibold"
            style={{ color: LINKEDIN_BLUE }}
          >
            Who Needs LinkedIn Translator Pro?
          </h2>
          <div className="mx-auto max-w-2xl space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              <strong className="text-foreground">Job seekers</strong> use
              LinkedIn Translator Pro to craft dozens of personalized job
              announcements, career transition posts, and networking messages
              during their search. When every post matters, having unlimited
              translations means you can experiment with different tones and
              intensities until the message is perfect.
            </p>
            <p>
              <strong className="text-foreground">Content creators and social media managers</strong>{' '}
              rely on the LinkedIn Translator to maintain a consistent posting
              schedule across multiple client accounts. The Pro plan eliminates
              daily limits so you can batch-translate content for the entire
              week in one session, saving hours of manual writing and editing.
            </p>
            <p>
              <strong className="text-foreground">Recruiters and HR professionals</strong>{' '}
              find the LinkedIn Translator invaluable for writing job postings
              that strike the right tone, crafting outreach messages that
              actually get responses, and decoding candidate LinkedIn profiles
              to understand what candidates are really communicating about
              their experience and career goals.
            </p>
            <p>
              <strong className="text-foreground">Founders and executives</strong>{' '}
              use the LinkedIn Translator to build their personal brand on the
              platform. Whether announcing a funding round, sharing company
              milestones, or publishing thought leadership content, Pro gives
              them the tools to communicate with the polish that LinkedIn
              rewards without spending hours agonizing over every word.
            </p>
          </div>
        </section>

        {/* 底部 CTA */}
        <section className="mt-16 text-center">
          <p className="text-lg text-muted-foreground">
            Ready to upgrade your LinkedIn communication?
          </p>
          <p className="mt-2 text-sm text-muted-foreground/60">
            Start with the free tier — no credit card required. Upgrade anytime.
          </p>
        </section>
      </div>
    </>
  );
}
