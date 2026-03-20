'use client';

import { useState } from 'react';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

/** 反馈评分类型 */
type FeedbackRating = 'up' | 'down';

interface FeedbackWidgetProps {
  /** 反馈回调 */
  onFeedback: (rating: FeedbackRating) => void;
  /** 是否显示组件 */
  visible: boolean;
}

/**
 * 翻译反馈组件
 * 翻译完成后显示，收集用户对翻译质量的评价
 */
export function FeedbackWidget({ onFeedback, visible }: FeedbackWidgetProps) {
  const [rating, setRating] = useState<FeedbackRating | null>(null);

  if (!visible) return null;

  /** 处理用户反馈点击 */
  const handleFeedback = (value: FeedbackRating) => {
    if (rating) return;
    setRating(value);
    onFeedback(value);
  };

  return (
    <div
      className="animate-in fade-in slide-in-from-bottom-2 flex items-center gap-3 duration-300"
    >
      {rating ? (
        <p className="text-sm text-muted-foreground">
          Thanks for your feedback!
        </p>
      ) : (
        <>
          <p className="text-sm text-muted-foreground">
            Was this translation helpful?
          </p>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFeedback('up')}
              className="size-8 p-0"
              aria-label="Helpful"
            >
              <ThumbsUp className="size-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFeedback('down')}
              className="size-8 p-0"
              aria-label="Not helpful"
            >
              <ThumbsDown className="size-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
