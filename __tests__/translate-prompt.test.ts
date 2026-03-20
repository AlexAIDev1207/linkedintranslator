import { describe, expect, it } from 'vitest';

import { buildTranslatePrompt } from '@/shared/lib/translate-prompt';
import type {
  TranslateContext,
  TranslateDirection,
  TranslateIntensity,
} from '@/shared/types/translate';

describe('buildTranslatePrompt', () => {
  it('应返回包含 system 和 user 的 prompt 对象', () => {
    const result = buildTranslatePrompt({
      text: 'I got a new job.',
      direction: 'toLinkedIn',
      intensity: 'standard',
      context: 'general',
    });
    expect(result).toHaveProperty('system');
    expect(result).toHaveProperty('user');
    expect(typeof result.system).toBe('string');
    expect(typeof result.user).toBe('string');
  });

  it('toLinkedIn 方向的 system prompt 应包含 LinkedIn 转换指令', () => {
    const result = buildTranslatePrompt({
      text: 'test',
      direction: 'toLinkedIn',
      intensity: 'standard',
      context: 'general',
    });
    expect(result.system.toLowerCase()).toContain('linkedin');
  });

  it('toHuman 方向的 system prompt 应包含解码指令', () => {
    const result = buildTranslatePrompt({
      text: 'test',
      direction: 'toHuman',
      intensity: 'standard',
      context: 'general',
    });
    expect(result.system.toLowerCase()).toMatch(/plain|decode|human|normal/);
  });

  it('user prompt 应包含用户输入的文本', () => {
    const text = 'My unique test input text';
    const result = buildTranslatePrompt({
      text,
      direction: 'toLinkedIn',
      intensity: 'standard',
      context: 'general',
    });
    expect(result.user).toContain(text);
  });

  it('extreme 强度应使 prompt 包含夸张相关指令', () => {
    const result = buildTranslatePrompt({
      text: 'test',
      direction: 'toLinkedIn',
      intensity: 'extreme',
      context: 'general',
    });
    expect(result.system.toLowerCase()).toMatch(
      /extreme|over-the-top|exaggerat|maximum|peak/
    );
  });

  it('light 强度应使 prompt 包含温和相关指令', () => {
    const result = buildTranslatePrompt({
      text: 'test',
      direction: 'toLinkedIn',
      intensity: 'light',
      context: 'general',
    });
    expect(result.system.toLowerCase()).toMatch(
      /subtle|light|gentle|minimal|natural/
    );
  });

  it('career 场景应使 prompt 包含职业相关指令', () => {
    const result = buildTranslatePrompt({
      text: 'test',
      direction: 'toLinkedIn',
      intensity: 'standard',
      context: 'career',
    });
    expect(result.system.toLowerCase()).toMatch(
      /career|job|transition|role/
    );
  });

  it('不同方向 + 强度组合应生成不同的 prompt', () => {
    const a = buildTranslatePrompt({
      text: 'test',
      direction: 'toLinkedIn',
      intensity: 'light',
      context: 'general',
    });
    const b = buildTranslatePrompt({
      text: 'test',
      direction: 'toLinkedIn',
      intensity: 'extreme',
      context: 'general',
    });
    expect(a.system).not.toBe(b.system);
  });
});
