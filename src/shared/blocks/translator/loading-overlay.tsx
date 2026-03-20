'use client';

import { useEffect, useState } from 'react';

/** 翻译方向类型 */
type TranslateDirection = 'toLinkedIn' | 'toHuman';

/** toLinkedIn 方向的加载提示语 */
const TO_LINKEDIN_MESSAGES: readonly string[] = [
  'Crafting your perfect LinkedIn post...',
  'Adding strategic vulnerability...',
  'Synergizing your core competencies...',
  'Inserting inspirational hashtags...',
  'Making it sound humbled AND grateful...',
  'Sprinkling in some thought leadership...',
  'Optimizing for maximum engagement...',
  'Adding a dash of personal branding...',
] as const;

/** toHuman 方向的加载提示语 */
const TO_HUMAN_MESSAGES: readonly string[] = [
  'Removing the fluff...',
  'Translating corporate speak...',
  'Finding the actual point...',
  'Cutting through buzzword soup...',
  'Extracting the real meaning...',
  'Decoding the humble brag...',
  'Stripping away the jargon...',
  'Searching for substance...',
] as const;

/** 消息轮换间隔（毫秒） */
const ROTATION_INTERVAL_MS = 2000;

interface LoadingOverlayProps {
  direction: TranslateDirection;
}

/**
 * 翻译加载动画组件
 * 根据翻译方向显示不同的趣味提示语，每 2 秒轮换一次
 */
export function LoadingOverlay({ direction }: LoadingOverlayProps) {
  const [messageIndex, setMessageIndex] = useState(0);

  const messages =
    direction === 'toLinkedIn' ? TO_LINKEDIN_MESSAGES : TO_HUMAN_MESSAGES;

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, ROTATION_INTERVAL_MS);

    return () => clearInterval(timer);
  }, [messages.length]);

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-xl bg-background/80 backdrop-blur-sm">
      {/* 弹跳点动画 */}
      <div className="flex items-center gap-1.5">
        <span className="size-2.5 animate-bounce rounded-full bg-[#0077B5] [animation-delay:0ms]" />
        <span className="size-2.5 animate-bounce rounded-full bg-[#0077B5] [animation-delay:150ms]" />
        <span className="size-2.5 animate-bounce rounded-full bg-[#0077B5] [animation-delay:300ms]" />
      </div>

      {/* 轮换提示文案 */}
      <p
        key={messageIndex}
        className="animate-fade-in text-sm font-medium text-muted-foreground"
      >
        {messages[messageIndex]}
      </p>
    </div>
  );
}
