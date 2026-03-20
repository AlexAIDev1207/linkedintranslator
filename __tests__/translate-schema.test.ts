import { describe, expect, it } from 'vitest';

import {
  TranslateDirection,
  TranslateIntensity,
  TranslateContext,
  translateRequestSchema,
  translateResponseSchema,
} from '@/shared/types/translate';

describe('translateRequestSchema', () => {
  it('应接受合法的翻译请求', () => {
    const valid = {
      text: 'I got a new job.',
      direction: 'toLinkedIn' as TranslateDirection,
      intensity: 'standard' as TranslateIntensity,
      context: 'general' as TranslateContext,
    };
    const result = translateRequestSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('context 字段应为可选，默认 general', () => {
    const input = {
      text: 'Hello world',
      direction: 'toHuman',
      intensity: 'light',
    };
    const result = translateRequestSchema.safeParse(input);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.context).toBe('general');
    }
  });

  it('应拒绝空文本', () => {
    const input = {
      text: '',
      direction: 'toLinkedIn',
      intensity: 'standard',
    };
    const result = translateRequestSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('应拒绝超过 5000 字符的文本', () => {
    const input = {
      text: 'a'.repeat(5001),
      direction: 'toLinkedIn',
      intensity: 'standard',
    };
    const result = translateRequestSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('应拒绝无效的方向', () => {
    const input = {
      text: 'hello',
      direction: 'invalid',
      intensity: 'standard',
    };
    const result = translateRequestSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('应拒绝无效的强度', () => {
    const input = {
      text: 'hello',
      direction: 'toLinkedIn',
      intensity: 'mega',
    };
    const result = translateRequestSchema.safeParse(input);
    expect(result.success).toBe(false);
  });

  it('应拒绝无效的场景', () => {
    const input = {
      text: 'hello',
      direction: 'toLinkedIn',
      intensity: 'standard',
      context: 'invalid',
    };
    const result = translateRequestSchema.safeParse(input);
    expect(result.success).toBe(false);
  });
});

describe('translateResponseSchema', () => {
  it('应接受合法的翻译响应', () => {
    const valid = {
      standard: 'Translated text here',
      best: 'Enhanced translated text',
      creditsUsed: 1,
      remaining: 9,
    };
    const result = translateResponseSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });

  it('best 字段应为可选', () => {
    const valid = {
      standard: 'Translated text',
      creditsUsed: 1,
      remaining: 4,
    };
    const result = translateResponseSchema.safeParse(valid);
    expect(result.success).toBe(true);
  });
});
