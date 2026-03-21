'use client';

import { useCallback, useState } from 'react';
import {
  ArrowRightLeft,
  Check,
  Copy,
  Keyboard,
  Lock,
  Share2,
  Sparkles,
  Zap,
} from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Textarea } from '@/shared/components/ui/textarea';
import {
  ToggleGroup,
  ToggleGroupItem,
} from '@/shared/components/ui/toggle-group';

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
 * 沉浸式双栏翻译界面，带渐变边框和精致交互
 */
export function TranslatorPanel() {
  const [inputText, setInputText] = useState('');
  const [direction, setDirection] =
    useState<TranslateDirection>('toLinkedIn');
  const [intensity, setIntensity] =
    useState<TranslateIntensity>('standard');
  const [context, setContext] = useState<TranslateContext>('general');
  const [output, setOutput] = useState<TranslateOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<OutputTab>('standard');
  const [copied, setCopied] = useState(false);
  const [_feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const placeholderText =
    direction === 'toLinkedIn'
      ? 'e.g. "I got a new job at a tech company."'
      : 'Paste any LinkedIn post here to decode it...';

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
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsLoading(false);
    }
  }, [inputText, direction, intensity, context, isLoading]);

  /** 复制结果到剪贴板 */
  const handleCopy = useCallback(async () => {
    const text =
      activeTab === 'best' && output?.best
        ? output.best
        : output?.standard;
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [output, activeTab]);

  /** 分享到 X/Twitter */
  const handleShare = useCallback(() => {
    const text =
      activeTab === 'best' && output?.best
        ? output.best
        : output?.standard;
    if (!text) return;
    const tweetText = encodeURIComponent(text.slice(0, 280));
    window.open(
      `https://twitter.com/intent/tweet?text=${tweetText}`,
      '_blank'
    );
  }, [output, activeTab]);

  const currentOutput =
    activeTab === 'best' && output?.best
      ? output.best
      : (output?.standard ?? '');

  /** 字符进度百分比 */
  const charPercent = Math.min(
    (inputText.length / MAX_CHARS) * 100,
    100
  );

  return (
    <div className="mx-auto w-full max-w-5xl space-y-5">
      {/* 顶部控制栏：方向 + 选项 */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* 方向切换 */}
        <Tabs
          value={direction}
          onValueChange={(val) =>
            setDirection(val as TranslateDirection)
          }
        >
          <TabsList className="h-10 rounded-xl bg-muted/60 p-1">
            <TabsTrigger
              value="toLinkedIn"
              className="rounded-lg px-4 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Sparkles className="mr-1.5 size-3.5 text-[#0077B5]" />
              Human → LinkedIn
            </TabsTrigger>
            <TabsTrigger
              value="toHuman"
              className="rounded-lg px-4 text-sm data-[state=active]:bg-background data-[state=active]:shadow-sm"
            >
              <Zap className="mr-1.5 size-3.5 text-amber-500" />
              LinkedIn → Human
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 控制选项 */}
        <div className="flex items-center gap-2">
          <ToggleGroup
            type="single"
            value={intensity}
            onValueChange={(val) => {
              if (val) setIntensity(val as TranslateIntensity);
            }}
            variant="outline"
            size="sm"
            className="rounded-lg"
          >
            {INTENSITY_OPTIONS.map((opt) => (
              <ToggleGroupItem
                key={opt.value}
                value={opt.value}
                className="rounded-md px-3 text-xs"
              >
                {opt.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <Select
            value={context}
            onValueChange={(val) =>
              setContext(val as TranslateContext)
            }
          >
            <SelectTrigger
              size="sm"
              className="w-[130px] rounded-lg text-xs"
            >
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
      </div>

      {/* 双栏翻译区域 — 渐变边框容器 */}
      <div className="rounded-2xl bg-gradient-to-br from-[#0077B5]/20 via-border/50 to-[#00A0DC]/20 p-px shadow-xl shadow-[#0077B5]/5">
        <div className="grid rounded-[15px] bg-background md:grid-cols-2">
          {/* 左栏：输入 */}
          <div className="relative flex flex-col border-b p-5 md:border-b-0 md:border-r">
            {/* 输入标签 */}
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
                {direction === 'toLinkedIn'
                  ? 'Plain English'
                  : 'LinkedIn Post'}
              </span>
              {/* 字符进度条 */}
              <div className="flex items-center gap-2">
                <div className="h-1 w-16 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-[#0077B5] transition-all duration-300"
                    style={{ width: `${charPercent}%` }}
                  />
                </div>
                <span className="text-[10px] tabular-nums text-muted-foreground/50">
                  {inputText.length}/{MAX_CHARS}
                </span>
              </div>
            </div>

            <Textarea
              value={inputText}
              onChange={(e) =>
                setInputText(e.target.value.slice(0, MAX_CHARS))
              }
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                  handleTranslate();
                }
              }}
              placeholder={placeholderText}
              className="min-h-[220px] flex-1 resize-none border-none bg-transparent p-0 text-[15px] leading-relaxed shadow-none placeholder:text-muted-foreground/40 focus-visible:ring-0"
              rows={8}
            />

            {/* 快捷键提示 */}
            <div className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground/40">
              <Keyboard className="size-3" />
              <span>Cmd + Enter to translate</span>
            </div>
          </div>

          {/* 右栏：输出 */}
          <div className="relative flex flex-col p-5">
            {isLoading && <LoadingOverlay direction={direction} />}

            {/* 输出标签 + 版本切换 */}
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/70">
                {direction === 'toLinkedIn'
                  ? 'LinkedIn Speak'
                  : 'Human Translation'}
              </span>

              {output && (
                <Tabs
                  value={activeTab}
                  onValueChange={(val) =>
                    setActiveTab(val as OutputTab)
                  }
                >
                  <TabsList className="h-7 rounded-lg bg-muted/50 p-0.5">
                    <TabsTrigger
                      value="standard"
                      className="h-6 rounded-md px-2.5 text-[10px]"
                    >
                      Standard
                    </TabsTrigger>
                    <TabsTrigger
                      value="best"
                      className="h-6 gap-1 rounded-md px-2.5 text-[10px]"
                    >
                      <Lock className="size-2.5" />
                      Pro
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
            </div>

            {/* 输出内容 */}
            <div className="min-h-[220px] flex-1 whitespace-pre-wrap text-[15px] leading-relaxed">
              {error ? (
                <p className="text-destructive">{error}</p>
              ) : activeTab === 'best' && output ? (
                <div className="relative">
                  <p className="select-none blur-sm">
                    {output.best || output.standard}
                  </p>
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-xl bg-background/70 backdrop-blur-[3px]">
                    <div className="flex size-10 items-center justify-center rounded-full bg-[#0077B5]/10">
                      <Lock className="size-5 text-[#0077B5]" />
                    </div>
                    <p className="text-sm font-medium">
                      Unlock the Best version
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="rounded-lg bg-[#0077B5] text-white shadow-md shadow-[#0077B5]/20 hover:bg-[#005f8d]"
                    >
                      <a href="/pricing">
                        Upgrade to Pro — $9/mo
                      </a>
                    </Button>
                  </div>
                </div>
              ) : currentOutput ? (
                <div className="animate-in fade-in duration-300">
                  {currentOutput}
                </div>
              ) : (
                <span className="text-muted-foreground/40">
                  {direction === 'toLinkedIn'
                    ? 'Your LinkedIn-speak will appear here...'
                    : 'The decoded translation will appear here...'}
                </span>
              )}
            </div>

            {/* 输出操作栏 */}
            {output && !error && (
              <div className="mt-3 flex items-center gap-1 border-t border-dashed pt-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="h-7 gap-1 rounded-lg px-2.5 text-xs hover:bg-[#0077B5]/10 hover:text-[#0077B5]"
                >
                  {copied ? (
                    <Check className="size-3 text-green-500" />
                  ) : (
                    <Copy className="size-3" />
                  )}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleShare}
                  className="h-7 gap-1 rounded-lg px-2.5 text-xs hover:bg-[#0077B5]/10 hover:text-[#0077B5]"
                >
                  <Share2 className="size-3" />
                  Share
                </Button>
                <div className="flex-1" />
                <FeedbackWidget
                  visible
                  onFeedback={(rating) => setFeedback(rating)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 翻译按钮 */}
      <div className="flex justify-center">
        <Button
          onClick={handleTranslate}
          disabled={!inputText.trim() || isLoading}
          size="lg"
          className="group h-12 min-w-[200px] rounded-xl bg-[#0077B5] text-base font-semibold text-white shadow-lg shadow-[#0077B5]/25 transition-all hover:bg-[#005f8d] hover:shadow-xl hover:shadow-[#0077B5]/30 disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <ArrowRightLeft className="mr-2 size-4 animate-spin" />
              Translating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 size-4 transition-transform group-hover:rotate-12" />
              Translate
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
