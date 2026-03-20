/** 翻译方向 */
export type TranslateDirection = 'toLinkedIn' | 'toHuman';

/** 翻译强度 */
export type TranslateIntensity = 'light' | 'standard' | 'extreme';

/** 翻译上下文场景 */
export type TranslateContext = 'general' | 'career' | 'promotion' | 'project' | 'side-project';

/** 翻译 API 响应 */
export interface TranslateOutput {
  standard: string;
  best?: string;
}

/** 输出选项卡 */
export type OutputTab = 'standard' | 'best';

/** 最大输入字符数 */
export const MAX_CHARS = 5000;

/** 上下文选项配置 */
export const CONTEXT_OPTIONS: readonly { value: TranslateContext; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'career', label: 'Career' },
  { value: 'promotion', label: 'Promotion' },
  { value: 'project', label: 'Project' },
  { value: 'side-project', label: 'Side Project' },
] as const;

/** 强度选项配置 */
export const INTENSITY_OPTIONS: readonly { value: TranslateIntensity; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'standard', label: 'Standard' },
  { value: 'extreme', label: 'Extreme' },
] as const;

/** API 响应格式 */
interface ApiResponse {
  code: number;
  message: string;
  data?: TranslateOutput;
}

/** 调用翻译 API */
export async function translateText(params: {
  text: string;
  direction: TranslateDirection;
  intensity: TranslateIntensity;
  context: TranslateContext;
}): Promise<TranslateOutput> {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  const json = (await response.json()) as ApiResponse;

  if (json.code !== 0 || !json.data) {
    throw new Error(json.message || 'Translation failed');
  }

  return json.data;
}
