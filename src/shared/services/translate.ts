/** 游客每日翻译限制 */
export const GUEST_DAILY_LIMIT = 5;

/** 免费用户每日翻译限制 */
export const FREE_DAILY_LIMIT = 10;

/** Pro 用户每月翻译限制 */
export const PRO_MONTHLY_LIMIT = 499;

const SEPARATOR = '---SEPARATOR---';

interface ParsedOutput {
  standard: string;
  best?: string;
}

/** 解析 AI 翻译输出，分割为 standard 和 best 两个版本 */
export function parseTranslateOutput(output: string): ParsedOutput {
  if (!output.includes(SEPARATOR)) {
    return { standard: output.trim() };
  }

  const [standard, best] = output.split(SEPARATOR);
  return {
    standard: standard.trim(),
    best: best.trim(),
  };
}
