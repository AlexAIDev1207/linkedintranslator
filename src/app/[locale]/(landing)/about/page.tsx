import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { Button } from '@/shared/components/ui/button';

/** About 页面 SEO 元数据 */
export const metadata: Metadata = {
  title: 'About LinkedIn Translator — Free AI LinkedIn Post Tool',
  description:
    'Learn about LinkedIn Translator, the free AI-powered tool that converts normal text into LinkedIn speak and decodes corporate jargon back into plain English.',
  keywords: [
    'about LinkedIn Translator',
    'LinkedIn speak tool',
    'LinkedIn jargon decoder',
    'AI LinkedIn post generator',
    'LinkedIn corporate speak',
  ],
};

/** LinkedIn 蓝色主题色 */
const LINKEDIN_BLUE = '#0077B5';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 md:py-24">
      {/* 页面标题 */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          About LinkedIn Translator
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The free AI tool that bridges the gap between human language and
          LinkedIn speak.
        </p>
      </div>

      {/* 产品介绍 */}
      <section className="mb-12">
        <h2
          className="mb-4 text-2xl font-semibold"
          style={{ color: LINKEDIN_BLUE }}
        >
          What is LinkedIn Translator?
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            LinkedIn Translator is a free, AI-powered tool that converts
            everyday language into polished LinkedIn-style posts — and
            translates corporate jargon back into plain English. Whether
            you&apos;re crafting your next career update or trying to decode
            what someone actually means by &ldquo;leveraging synergies,&rdquo;
            we&apos;ve got you covered.
          </p>
          <p>
            The tool supports multiple translation directions: you can go from
            normal human text to full LinkedIn speak, or paste an
            over-the-top LinkedIn post and get back what the person actually
            wanted to say. It&apos;s like Google Translate, but for corporate
            buzzwords.
          </p>
          <p>
            With adjustable intensity levels — from subtle professional
            polish to maximum LinkedIn energy — and context-aware settings
            for different post types, LinkedIn Translator gives you full
            control over how your content sounds.
          </p>
        </div>
      </section>

      {/* 背景故事 */}
      <section className="mb-12">
        <h2
          className="mb-4 text-2xl font-semibold"
          style={{ color: LINKEDIN_BLUE }}
        >
          Why We Built This
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            If you&apos;ve spent any time on LinkedIn, you know the feeling:
            scrolling past an endless feed of &ldquo;humbled and
            grateful&rdquo; announcements, &ldquo;thought leadership&rdquo;
            posts that say nothing, and career updates written like Oscar
            acceptance speeches. LinkedIn corporate speak has become its own
            language — one that most of us instinctively recognize but
            struggle to either produce or decode.
          </p>
          <p>
            In March 2026, the conversation around LinkedIn&apos;s unique
            communication style went viral when Kagi search spotlighted
            the phenomenon, sparking a wave of memes, parodies, and genuine
            frustration across the internet. People were tired of the
            performative language but felt pressured to participate. That
            moment made it clear: there was a real need for a dedicated tool
            to navigate this linguistic landscape.
          </p>
          <p>
            So we built LinkedIn Translator — not to mock LinkedIn culture,
            but to make it accessible. Whether you need to write a post that
            fits the platform&apos;s norms or you just want to understand what
            someone is really saying, this tool meets you where you are.
          </p>
          <p>
            Studies show that 58% of professionals say their colleagues overuse
            jargon, and 70% admit to using buzzwords they personally dislike.
            LinkedIn Translator exists at this intersection — helping you
            participate in the platform&apos;s communication norms without
            losing your authentic voice. It&apos;s the bridge between what you
            want to say and what LinkedIn expects to hear.
          </p>
        </div>
      </section>

      {/* 工作原理 */}
      <section className="mb-12">
        <h2
          className="mb-4 text-2xl font-semibold"
          style={{ color: LINKEDIN_BLUE }}
        >
          How It Works
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            LinkedIn Translator is powered by advanced AI language models
            fine-tuned on thousands of real LinkedIn posts. When you input
            text, the system analyzes the tone, context, and intent before
            generating the translation.
          </p>
          <p>
            You can choose from multiple intensity levels — <strong>Mild</strong>{' '}
            for a subtle professional touch, <strong>Standard</strong> for
            classic LinkedIn energy, and <strong>Maximum</strong> for peak
            corporate cringe. The context selector lets you specify whether
            you&apos;re writing a job announcement, project update, career
            milestone, or general post, so the output matches the right
            conventions.
          </p>
          <p>
            Every translation is context-aware, meaning the AI understands the
            difference between a humble brag and a genuine achievement, and
            adjusts the output accordingly. The result is natural-sounding text
            that hits the right notes for your audience.
          </p>
        </div>
      </section>

      {/* 功能与特性 */}
      <section className="mb-12">
        <h2
          className="mb-4 text-2xl font-semibold"
          style={{ color: LINKEDIN_BLUE }}
        >
          Features &amp; Capabilities
        </h2>
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <div>
            <h3 className="mb-1 text-lg font-medium text-foreground">
              Bidirectional Translation
            </h3>
            <p>
              LinkedIn Translator works in both directions. Convert your
              everyday language into polished LinkedIn-speak, or paste a
              corporate-jargon-laden post and decode it back into plain English.
              This two-way capability makes it equally useful for writing and
              reading LinkedIn content.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-lg font-medium text-foreground">
              Three Intensity Levels
            </h3>
            <p>
              Not every post needs maximum corporate energy. Choose from Light
              for a subtle professional polish, Standard for classic LinkedIn
              tone, or Extreme for full-throttle thought-leader mode. Each level
              is carefully calibrated to match real posting patterns seen across
              the platform.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-lg font-medium text-foreground">
              Five Context Modes
            </h3>
            <p>
              Context matters. LinkedIn Translator offers five specialized modes
              — General, Career, Promotion, Project, and Side Project — so the
              output uses the right vocabulary and structure for your specific
              situation. A job announcement sounds very different from a weekend
              hackathon recap.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-lg font-medium text-foreground">
              No Sign-up Required
            </h3>
            <p>
              Privacy comes first. You can start using LinkedIn Translator
              instantly without creating an account or handing over your email.
              Your text is processed in real time and never stored. When
              you&apos;re ready for more features, an optional account unlocks
              higher usage limits.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-lg font-medium text-foreground">
              AI-Powered Accuracy
            </h3>
            <p>
              Under the hood, LinkedIn Translator is powered by large language
              models trained on thousands of authentic LinkedIn posts. The AI
              understands the subtle cues that separate a humble brag from a
              genuine achievement and adapts the output so it reads naturally and
              convincingly.
            </p>
          </div>
          <div>
            <h3 className="mb-1 text-lg font-medium text-foreground">
              Free to Use
            </h3>
            <p>
              Our generous free tier gives you plenty of translations every day
              at no cost. For power users who need unlimited translations,
              priority processing, and advanced features, the affordable Pro
              plan offers exceptional value with transparent, no-surprise
              pricing.
            </p>
          </div>
        </div>
      </section>

      {/* 使命 */}
      <section className="mb-12">
        <h2
          className="mb-4 text-2xl font-semibold"
          style={{ color: LINKEDIN_BLUE }}
        >
          Our Mission
        </h2>
        <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            We believe professional communication should be effective without
            being inauthentic. LinkedIn Translator exists to help people
            navigate the gap between how we naturally express ourselves and
            what the platform rewards.
          </p>
          <p>
            Our mission is to make professional communication more authentic
            — whether that means helping someone craft a polished post that
            feels true to who they are, or cutting through the noise to find
            the real message underneath the buzzwords. Language should connect
            people, not confuse them.
          </p>
          <p>
            We are committed to keeping LinkedIn Translator accessible to
            everyone, with a free tier that covers most use cases and an
            affordable Pro option for professionals who rely on the tool daily.
            As LinkedIn&apos;s communication norms continue to evolve, so will
            our translation engine — always staying one step ahead of the latest
            buzzwords and posting trends.
          </p>
        </div>
      </section>

      {/* 相关资源 */}
      <section className="mb-12">
        <h2
          className="mb-4 text-2xl font-semibold"
          style={{ color: LINKEDIN_BLUE }}
        >
          Learn More
        </h2>
        <ul className="space-y-2 text-base text-muted-foreground">
          <li>
            <a href="/examples" className="text-[#0077B5] underline underline-offset-2 hover:text-[#005f8d]">
              LinkedIn Translator Examples
            </a>{' '}
            — See before &amp; after translations
          </li>
          <li>
            <a href="/blog/linkedin-buzzwords-translated" className="text-[#0077B5] underline underline-offset-2 hover:text-[#005f8d]">
              50 LinkedIn Buzzwords Decoded
            </a>{' '}
            — Our most popular blog post
          </li>
          <li>
            <a href="/pricing" className="text-[#0077B5] underline underline-offset-2 hover:text-[#005f8d]">
              Pricing
            </a>{' '}
            — Free tier and Pro plans
          </li>
        </ul>
      </section>

      {/* 免责声明 */}
      <section className="mb-12 rounded-lg border border-muted bg-muted/30 p-6">
        <p className="text-sm text-muted-foreground">
          <strong>Disclaimer:</strong> LinkedIn Translator is not affiliated
          with, endorsed by, or connected to LinkedIn Corporation. LinkedIn
          is a trademark of LinkedIn Corporation. This is an independent tool
          built for entertainment and productivity purposes.
        </p>
      </section>

      {/* 底部 CTA */}
      <div className="text-center">
        <h2 className="text-2xl font-bold">Ready to Translate?</h2>
        <p className="mt-2 text-muted-foreground">
          Try LinkedIn Translator for free — no sign-up required.
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

      {/* JSON-LD 组织结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'LinkedIn Translator',
            url: 'https://linkedintranslator.net',
            description:
              'Free AI-powered tool that translates normal text into LinkedIn speak and decodes corporate jargon back into plain English.',
            sameAs: ['https://linkedintranslator.net/about'],
            foundingDate: '2026',
            logo: 'https://linkedintranslator.net/logo.png',
          }),
        }}
      />
    </div>
  );
}
