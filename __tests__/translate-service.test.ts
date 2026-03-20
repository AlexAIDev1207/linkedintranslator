import { describe, expect, it, vi } from 'vitest';

import {
  parseTranslateOutput,
  GUEST_DAILY_LIMIT,
  FREE_DAILY_LIMIT,
  PRO_MONTHLY_LIMIT,
} from '@/shared/services/translate';

describe('parseTranslateOutput', () => {
  it('应正确分割包含分隔符的输出为 standard 和 best', () => {
    const output =
      'This is the standard version.\n---SEPARATOR---\nThis is the best version.';
    const result = parseTranslateOutput(output);
    expect(result.standard).toBe('This is the standard version.');
    expect(result.best).toBe('This is the best version.');
  });

  it('无分隔符时应将整个输出作为 standard', () => {
    const output = 'Only one version of the translation.';
    const result = parseTranslateOutput(output);
    expect(result.standard).toBe(output);
    expect(result.best).toBeUndefined();
  });

  it('应去除输出的首尾空白', () => {
    const output =
      '  Standard with spaces  \n---SEPARATOR---\n  Best with spaces  ';
    const result = parseTranslateOutput(output);
    expect(result.standard).toBe('Standard with spaces');
    expect(result.best).toBe('Best with spaces');
  });

  it('分隔符前后有多个换行时应正确处理', () => {
    const output =
      'Standard\n\n---SEPARATOR---\n\nBest version here';
    const result = parseTranslateOutput(output);
    expect(result.standard).toBe('Standard');
    expect(result.best).toBe('Best version here');
  });
});

describe('翻译限制常量', () => {
  it('游客每日限制为 5', () => {
    expect(GUEST_DAILY_LIMIT).toBe(5);
  });

  it('免费用户每日限制为 10', () => {
    expect(FREE_DAILY_LIMIT).toBe(10);
  });

  it('Pro 用户每月限制为 499', () => {
    expect(PRO_MONTHLY_LIMIT).toBe(499);
  });
});
