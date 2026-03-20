import { z } from 'zod';

/** 翻译方向 */
export const translateDirectionEnum = z.enum(['toLinkedIn', 'toHuman']);
export type TranslateDirection = z.infer<typeof translateDirectionEnum>;

/** 翻译强度 */
export const translateIntensityEnum = z.enum([
  'light',
  'standard',
  'extreme',
]);
export type TranslateIntensity = z.infer<typeof translateIntensityEnum>;

/** 翻译场景 */
export const translateContextEnum = z.enum([
  'general',
  'career',
  'promotion',
  'project',
  'side-project',
]);
export type TranslateContext = z.infer<typeof translateContextEnum>;

/** 翻译请求 Schema */
export const translateRequestSchema = z.object({
  text: z
    .string()
    .min(1, '文本不能为空')
    .max(5000, '文本不能超过 5000 字符'),
  direction: translateDirectionEnum,
  intensity: translateIntensityEnum,
  context: translateContextEnum.default('general'),
});

export type TranslateRequest = z.infer<typeof translateRequestSchema>;

/** 翻译响应 Schema */
export const translateResponseSchema = z.object({
  standard: z.string(),
  best: z.string().optional(),
  creditsUsed: z.number().int().min(0),
  remaining: z.number().int().min(0),
});

export type TranslateResponse = z.infer<typeof translateResponseSchema>;
