'use client';

import { useState } from 'react';
import { Check, ThumbsDown, ThumbsUp } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

/** 反馈评分类型 */
type FeedbackRating = 'up' | 'down';

interface FeedbackWidgetProps {
  onFeedback: (rating: FeedbackRating) => void;
  visible: boolean;
}

/**
 * 翻译反馈组件
 * 紧凑的行内反馈，融入输出操作栏
 */
export function FeedbackWidget({ onFeedback, visible }: FeedbackWidgetProps) {
  const [rating, setRating] = useState<FeedbackRating | null>(null);

  if (!visible) return null;

  const handleFeedback = (value: FeedbackRating) => {
    if (rating) return;
    setRating(value);
    onFeedback(value);
  };

  if (rating) {
    return (
      <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60">
        <Check className="size-3 text-green-500" />
        Thanks!
      </span>
    );
  }

  return (
    <div className="flex items-center gap-0.5">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback('up')}
        className="size-6 p-0 text-muted-foreground/40 hover:bg-green-500/10 hover:text-green-600"
        aria-label="Helpful"
      >
        <ThumbsUp className="size-3" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleFeedback('down')}
        className="size-6 p-0 text-muted-foreground/40 hover:bg-red-500/10 hover:text-red-500"
        aria-label="Not helpful"
      >
        <ThumbsDown className="size-3" />
      </Button>
    </div>
  );
}
