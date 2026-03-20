'use client';

import { useCallback, useState } from 'react';
import { ArrowRightLeft, Check, Copy, Lock, Share2 } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import { Card, CardContent } from '@/shared/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Textarea } from '@/shared/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/shared/components/ui/toggle-group';

import { FeedbackWidget } from './feedback-widget';
import { LoadingOverlay } from './loading-overlay';
import {
  CONTEXT_OPTIONS,
  INTENSITY_OPTIONS,
  MAX_CHARS,
  translateText,
  type OutputTab,
  type TranslateContext,
  type TranslateDirection,
  type TranslateIntensity,
  type TranslateOutput,
} from './types';

/**
 * LinkedIn 翻译器主面板
 * Google Translate 风格的双栏翻译界面
 */
export function TranslatorPanel() {
  const [inputText, setInputText] = useState('');
  const [direction, setDirection] = useState<TranslateDirection>('toLinkedIn');
  const [intensity, setIntensity] = useState<TranslateIntensity>('standard');
  const [context, setContext] = useState<TranslateContext>('general');
  const [output, setOutput] = useState<TranslateOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OutputTab>('standard');
  const [copied, setCopied] = useState(false);
  // TODO: MVP 阶段仅记录本地状态，后续接入反馈 API
  const [_feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  /** 根据方向返回输入区域占位文本 */
  const placeholderText =
    direction === 'toLinkedIn'
      ? 'Write your normal human thoughts here...'
      : 'Paste that LinkedIn post here...';

  /** 处理翻译提交 */
  const handleTranslate = useCallback(async () => {
    if (!inputText.trim() || isLoading) return;

    setError(null);
    setIsLoading(true);
    setOutput(null);
    setFeedback(null);

    try {
      const result = await translateText({
        text: inputText,
        direction,
        intensity,
        context,
      });
      setOutput(result);
      setActiveTab('standard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }, [inputText, direction, intensity, context, isLoading]);

  /** 复制结果到剪贴板 */
  const handleCopy = useCallback(async () => {
    const text = activeTab === 'best' && output?.best ? output.best : output?.standard;
    if (!text) return;

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output, activeTab]);

  /** 分享到 X/Twitter */
  const handleShare = useCallback(() => {
    const text = activeTab === 'best' && output?.best ? output.best : output?.standard;
    if (!text) return;

    const tweetText = encodeURIComponent(text.slice(0, 280));
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  }, [output, activeTab]);

  /** 获取当前活动选项卡的输出内容 */
  const currentOutput =
    activeTab === 'best' && output?.best ? output.best : (output?.standard ?? '');

  return (
    <div className="mx-auto w-full max-w-5xl space-y-4">
      {/* 方向切换 */}
      <Tabs
        value={direction}
        onValueChange={(val) => setDirection(val as TranslateDirection)}
        className="w-full"
      >
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="toLinkedIn">
            <ArrowRightLeft className="mr-1.5 size-3.5" />
            Human → LinkedIn
          </TabsTrigger>
          <TabsTrigger value="toHuman">
            <ArrowRightLeft className="mr-1.5 size-3.5" />
            LinkedIn → Human
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* 双栏翻译区域 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* 左栏：输入 */}
        <Card className="relative">
          <CardContent className="space-y-2">
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value.slice(0, MAX_CHARS))}
              placeholder={placeholderText}
              className="min-h-[200px] resize-none border-none bg-transparent p-0 shadow-none focus-visible:ring-0"
              rows={8}
            />
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {inputText.length} / {MAX_CHARS}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* 右栏：输出 */}
        <Card className="relative">
          {isLoading && <LoadingOverlay direction={direction} />}
          <CardContent className="space-y-2">
            {/* 输出版本切换 — Best 版本免费用户显示模糊 + 升级提示 */}
            {output && (
              <Tabs
                value={activeTab}
                onValueChange={(val) => setActiveTab(val as OutputTab)}
              >
                <TabsList className="h-8">
                  <TabsTrigger value="standard" className="text-xs">
                    Standard
                  </TabsTrigger>
                  <TabsTrigger value="best" className="gap-1 text-xs">
                    <Lock className="size-3" />
                    Best (Pro)
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            )}

            {/* 输出内容 */}
            <div className="min-h-[200px] whitespace-pre-wrap text-sm leading-relaxed">
              {error ? (
                <p className="text-destructive">{error}</p>
              ) : activeTab === 'best' && output ? (
                <div className="relative">
                  <p className="select-none blur-sm">
                    {output.best || output.standard}
                  </p>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-background/60 backdrop-blur-[2px]">
                    <Lock className="size-6 text-[#0077B5]" />
                    <p className="text-sm font-medium">
                      Upgrade to Pro to unlock the Best version
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="bg-[#0077B5] text-white hover:bg-[#005f8d]"
                    >
                      <a href="/pricing">Upgrade to Pro — $9/mo</a>
                    </Button>
                  </div>
                </div>
              ) : currentOutput ? (
                currentOutput
              ) : (
                <span className="text-muted-foreground">
                  {direction === 'toLinkedIn'
                    ? 'Your LinkedIn-speak will appear here...'
                    : 'The human translation will appear here...'}
                </span>
              )}
            </div>

            {/* 输出操作按钮 */}
            {output && (
              <div className="flex items-center gap-2 border-t pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-1.5 text-xs"
                >
                  {copied ? (
                    <Check className="size-3.5 text-green-500" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="gap-1.5 text-xs"
                >
                  <Share2 className="size-3.5" />
                  Share on X
                </Button>
              </div>
            )}

            {/* 翻译反馈组件 */}
            <FeedbackWidget
              visible={!!output && !error}
              onFeedback={(rating) => setFeedback(rating)}
            />
          </CardContent>
        </Card>
      </div>

      {/* 底部控制栏 */}
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          {/* 强度选择 */}
          <ToggleGroup
            type="single"
            value={intensity}
            onValueChange={(val) => {
              if (val) setIntensity(val as TranslateIntensity);
            }}
            variant="outline"
            size="sm"
          >
            {INTENSITY_OPTIONS.map((opt) => (
              <ToggleGroupItem key={opt.value} value={opt.value} className="text-xs">
                {opt.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          {/* 上下文场景选择 */}
          <Select
            value={context}
            onValueChange={(val) => setContext(val as TranslateContext)}
          >
            <SelectTrigger size="sm" className="w-[140px]">
              <SelectValue placeholder="Context" />
            </SelectTrigger>
            <SelectContent>
              {CONTEXT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 翻译按钮 */}
        <Button
          onClick={handleTranslate}
          disabled={!inputText.trim() || isLoading}
          className="bg-[#0077B5] text-white hover:bg-[#005f8d]"
          size="lg"
        >
          {isLoading ? 'Translating...' : 'Translate'}
        </Button>
      </div>
    </div>
  );
}
