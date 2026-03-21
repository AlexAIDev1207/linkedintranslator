'use client';

import { HelpCircle } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';

/** FAQ 条目 */
interface FaqItem {
  question: string;
  answer: string;
}

/** FAQ 数据 */
const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Is the LinkedIn Translator free?',
    answer:
      'Yes! You get 5 free translations per day without signing up. Create a free account for 10 daily translations, or <a href="/pricing" class="underline text-[#0077B5]">upgrade to Pro</a> for 499 monthly translations.',
  },
  {
    question: 'How does the LinkedIn Translator work?',
    answer:
      'The LinkedIn Translator uses advanced AI language models trained on thousands of real LinkedIn posts. When you enter text, the AI analyzes tone, context, and intent, then generates a translation that matches authentic LinkedIn writing patterns \u2014 including strategic vulnerability, thought leadership buzzwords, and inspirational storytelling. In reverse mode, it strips away the corporate jargon to reveal the plain English meaning underneath.',
  },
  {
    question: 'Can I translate LinkedIn posts back to normal English?',
    answer:
      "Absolutely! Use the 'LinkedIn \u2192 Human' mode to decode any LinkedIn post into straightforward, honest language. This is perfect for understanding what a recruiter really means, decoding a colleague's announcement, or just having a laugh at peak corporate speak. Paste any LinkedIn post and the LinkedIn Translator will reveal what the author actually wanted to say.",
  },
  {
    question: 'What are the intensity levels?',
    answer:
      'LinkedIn Translator offers three intensity levels to match your needs. <strong>Light</strong>: A subtle professional polish that keeps your authentic voice while making it platform-appropriate. <strong>Standard</strong>: Classic LinkedIn energy with hashtags, engagement hooks, and a touch of thought leadership. <strong>Extreme</strong>: Maximum corporate energy \u2014 vulnerability stories, hashtag storms, and buzzwords turned up to eleven.',
  },
  {
    question: 'What contexts are available?',
    answer:
      'Five context modes shape your translation for the right situation: <strong>General</strong> for everyday posts, <strong>Career</strong> for job transitions and announcements, <strong>Promotion</strong> for milestones and achievements, <strong>Project</strong> for work updates, and <strong>Side Project</strong> for personal ventures. Each context adjusts the vocabulary, tone, and structure so the output feels authentic to that specific LinkedIn post type.',
  },
  {
    question: 'Is my data private and secure?',
    answer:
      "Absolutely. LinkedIn Translator does not store your translations, save your input text, or share any data with third parties. All processing happens in real-time and nothing is retained after the page is closed. You can use the tool with complete confidence that your professional communications remain private.",
  },
  {
    question: 'Can I use this for my actual LinkedIn posts?',
    answer:
      'Yes, and many professionals do! The Standard intensity is popular for polishing genuine career updates and project announcements. The key is to review the output, add your personal touch, and make sure it still sounds like you. LinkedIn Translator is a starting point, not a replacement for your authentic voice.',
  },
  {
    question: 'Who is LinkedIn Translator built for?',
    answer:
      'LinkedIn Translator is designed for anyone who uses LinkedIn professionally. Job seekers use it to craft compelling career announcements. Marketers use it to understand LinkedIn content patterns. Recruiters use it to write better outreach messages. And plenty of people use it just for fun \u2014 to see their honest thoughts transformed into peak corporate prose.',
  },
  {
    question: 'Do I need to create an account?',
    answer:
      'No. LinkedIn Translator works instantly without any sign-up, login, or account creation. Guest users get 5 free translations per day. If you want more, creating a free account unlocks 10 daily translations. Power users can <a href="/pricing" class="underline text-[#0077B5]">upgrade to Pro</a> for 499 translations per month.',
  },
  {
    question: 'How is this different from ChatGPT or other AI writers?',
    answer:
      'We\'re purpose-built for LinkedIn. Our AI is specifically tuned for LinkedIn writing patterns, buzzwords, and post structures \u2014 not generic writing. See our <a href="/blog/best-linkedin-post-generators" class="underline text-[#0077B5]">comparison guide</a> for details.',
  },
];

/**
 * FAQ 区域
 * 带 JSON-LD 结构化数据的手风琴 FAQ
 */
export function FaqSection() {
  return (
    <section id="faq" className="py-20 md:py-28">
      {/* FAQ JSON-LD */}
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
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-[#0077B5]/20 bg-[#0077B5]/5 px-3 py-1 text-xs font-medium text-[#0077B5]">
            <HelpCircle className="size-3" />
            FAQ
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Everything you need to know about the LinkedIn Translator.
          </p>
        </div>

        {/* FAQ 手风琴 */}
        <Accordion type="single" collapsible defaultValue="faq-0" className="w-full space-y-3">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="overflow-hidden rounded-xl border bg-card px-6 data-[state=open]:border-[#0077B5]/30 data-[state=open]:shadow-md data-[state=open]:shadow-[#0077B5]/5"
            >
              <AccordionTrigger className="py-5 text-left text-[15px] font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-muted-foreground">
                <span dangerouslySetInnerHTML={{ __html: item.answer }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
