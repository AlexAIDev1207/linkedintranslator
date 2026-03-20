'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';

/** FAQ 条目类型 */
interface FaqItem {
  question: string;
  answer: string;
}

/** FAQ 数据列表 */
const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is the LinkedIn Translator free?',
    answer:
      'Yes! You get 5 free translations per day without signing up. Create a free account for 10 daily translations, or upgrade to Pro for 499 monthly translations.',
  },
  {
    question: 'How does the LinkedIn Translator work?',
    answer:
      'Our AI analyzes your input text and transforms it using patterns commonly found in viral LinkedIn posts \u2014 including strategic vulnerability, thought leadership buzzwords, and inspirational storytelling. Or vice versa, it can decode LinkedIn jargon back to plain English.',
  },
  {
    question: 'Can I translate LinkedIn posts back to normal English?',
    answer:
      "Absolutely! Use the 'LinkedIn \u2192 Human' mode to decode any LinkedIn post into straightforward, honest language.",
  },
  {
    question: 'What are the intensity levels?',
    answer:
      'Light: Subtle professional polish. Standard: Typical LinkedIn energy. Extreme: Peak thought-leader mode with maximum buzzwords and hashtags.',
  },
  {
    question: 'What contexts are available?',
    answer:
      'General, Career Transition, Promotion, Project Update, and Side Project. Each context shapes the translation to match the appropriate LinkedIn tone.',
  },
  {
    question: 'Is my data private?',
    answer:
      'Yes. We don\'t store your translations or share your data. Your text is processed in real-time and not retained after translation.',
  },
  {
    question: 'Can I use this for my actual LinkedIn posts?',
    answer:
      'Of course! Many users use the Standard intensity to polish their posts. Just review the output and add your personal touch.',
  },
  {
    question: 'How is this different from ChatGPT or other AI writers?',
    answer:
      "We're purpose-built for LinkedIn. Our AI is specifically trained on LinkedIn writing patterns, buzzwords, and post structures \u2014 not generic writing. Plus, we're the only tool that decodes LinkedIn speak back to plain English.",
  },
];

/**
 * FAQ 区域
 * 使用 Accordion 展示常见问题，并嵌入 JSON-LD 结构化数据
 */
export function FaqSection() {
  return (
    <section className="py-16 md:py-24">
      {/* FAQ JSON-LD 结构化数据，用于 SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQ_ITEMS.map((item) => ({
              '@type': 'Question',
              name: item.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
              },
            })),
          }),
        }}
      />

      <div className="container mx-auto max-w-3xl px-4">
        {/* 区域标题 */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            LinkedIn Translator FAQ
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about the LinkedIn Translator.
          </p>
        </div>

        {/* FAQ 手风琴 */}
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} value={`faq-${index}`}>
              <AccordionTrigger className="text-left text-base">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
