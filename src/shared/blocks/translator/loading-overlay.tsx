'use client';

import { useEffect, useState } from 'react';

type TranslateDirection = 'toLinkedIn' | 'toHuman';

/** toLinkedIn 方向的趣味提示语 */
const TO_LINKEDIN_MESSAGES: readonly string[] = [
  'Crafting your perfect LinkedIn post...',
  'Adding strategic vulnerability...',
  'Synergizing your core competencies...',
  'Inserting inspirational hashtags...',
  'Making it sound humbled AND grateful...',
  'Sprinkling in some thought leadership...',
  'Optimizing for maximum engagement...',
  'Adding a dash of personal branding...',
];

/** toHuman 方向的趣味提示语 */
const TO_HUMAN_MESSAGES: readonly string[] = [
  'Removing the fluff...',
  'Translating corporate speak...',
  'Finding the actual point...',
  'Cutting through buzzword soup...',
  'Extracting the real meaning...',
  'Decoding the humble brag...',
  'Stripping away the jargon...',
  'Searching for substance...',
];

const ROTATION_INTERVAL_MS = 2000;

interface LoadingOverlayProps {
  direction: TranslateDirection;
}

/**
 * 翻译加载动画组件
 * 脉冲动画 + 渐变遮罩 + 方向感知提示语
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
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 rounded-[15px] bg-background/85 backdrop-blur-sm">
      {/* 脉冲指示器 */}
      <div className="relative flex items-center justify-center">
        <span className="absolute size-10 animate-ping rounded-full bg-[#0077B5]/20" />
        <span className="relative flex size-6 items-center justify-center rounded-full bg-[#0077B5]">
          <span className="size-2 rounded-full bg-white" />
        </span>
      </div>

      {/* 提示文案 */}
      <p
        key={messageIndex}
        className="animate-in fade-in slide-in-from-bottom-2 text-sm font-medium text-muted-foreground duration-300"
      >
        {messages[messageIndex]}
      </p>
    </div>
  );
}
