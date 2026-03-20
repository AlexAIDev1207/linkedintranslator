import { generateText } from 'ai';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';

import { respData, respErr } from '@/shared/lib/resp';
import { enforceMinIntervalRateLimit } from '@/shared/lib/rate-limit';
import { buildTranslatePrompt } from '@/shared/lib/translate-prompt';
import { translateRequestSchema } from '@/shared/types/translate';
import { parseTranslateOutput, GUEST_DAILY_LIMIT } from '@/shared/services/translate';
import { getAllConfigs } from '@/shared/models/config';
import { getUserInfo } from '@/shared/models/user';

const DEFAULT_MODEL = 'google/gemini-2.0-flash-001';

export async function POST(request: Request) {
  try {
    // 速率限制：每个客户端最少间隔 1 秒
    const rateLimited = enforceMinIntervalRateLimit(request, {
      intervalMs: 1000,
      keyPrefix: 'translate',
    });
    if (rateLimited) return rateLimited;

    // 解析并验证请求体
    const body: unknown = await request.json();
    const parsed = translateRequestSchema.safeParse(body);
    if (!parsed.success) {
      return respErr(parsed.error.issues[0]?.message ?? '请求参数无效');
    }
    const { text, direction, intensity, context } = parsed.data;

    // 获取用户信息（可选，游客允许访问）
    const user = await getUserInfo();

    // TODO(moxiao): MVP 阶段游客限制基于 IP 简易计数，后续改为数据库追踪
    if (!user) {
      // 游客暂不做严格限制，仅依赖速率限制
      // 后续迭代中接入基于 IP 的每日计数
    }

    // 获取 OpenRouter API Key
    const configs = await getAllConfigs();
    const apiKey = configs['openrouter_api_key'];
    if (!apiKey) {
      return respErr('翻译服务未配置，请联系管理员');
    }

    // 构建 prompt
    const prompt = buildTranslatePrompt({ text, direction, intensity, context });

    // 调用 OpenRouter 生成翻译
    const openrouter = createOpenRouter({ apiKey });
    const { text: output } = await generateText({
      model: openrouter(DEFAULT_MODEL),
      system: prompt.system,
      prompt: prompt.user,
    });

    if (!output) {
      return respErr('翻译结果为空，请稍后重试');
    }

    // 解析输出
    const result = parseTranslateOutput(output);

    return respData({
      standard: result.standard,
      best: result.best,
      creditsUsed: 0,
      remaining: user ? GUEST_DAILY_LIMIT : GUEST_DAILY_LIMIT,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : '翻译服务异常';
    return respErr(message);
  }
}
