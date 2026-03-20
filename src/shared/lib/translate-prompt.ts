import type {
  TranslateContext,
  TranslateDirection,
  TranslateIntensity,
} from '@/shared/types/translate';

interface PromptInput {
  text: string;
  direction: TranslateDirection;
  intensity: TranslateIntensity;
  context: TranslateContext;
}

interface PromptOutput {
  system: string;
  user: string;
}

const INTENSITY_INSTRUCTIONS: Record<TranslateIntensity, string> = {
  light:
    'Apply a subtle, natural LinkedIn polish. Keep the tone genuine and minimal — just enough to sound professional without overdoing it.',
  standard:
    'Transform the text into typical LinkedIn-style writing with professional tone, strategic hashtags, and engaging structure.',
  extreme:
    'Go maximum, peak, over-the-top LinkedIn energy. Exaggerate everything — add vulnerability stories, hashtag storms, "agree?" endings, and thought-leader buzzwords.',
};

const CONTEXT_INSTRUCTIONS: Record<TranslateContext, string> = {
  general: '',
  career:
    'The context is a career transition or new job/role announcement. Focus on professional growth narrative.',
  promotion:
    'The context is announcing a promotion or milestone achievement. Emphasize gratitude and leadership.',
  project:
    'The context is sharing a project update or professional accomplishment. Highlight impact and collaboration.',
  'side-project':
    'The context is sharing a side project or personal venture. Balance passion with professional credibility.',
};

/** 构建翻译 prompt */
export function buildTranslatePrompt(input: PromptInput): PromptOutput {
  const { text, direction, intensity, context } = input;

  const contextInstruction = CONTEXT_INSTRUCTIONS[context];
  const intensityInstruction = INTENSITY_INSTRUCTIONS[intensity];

  if (direction === 'toLinkedIn') {
    const system = [
      'You are a LinkedIn post translator. Convert plain, honest text into LinkedIn-style professional posts.',
      intensityInstruction,
      contextInstruction,
      'Output two versions separated by "---SEPARATOR---":',
      '1. STANDARD: A clean, natural LinkedIn rewrite.',
      '2. BEST: A more polished, engaging version with stronger LinkedIn voice.',
      'Do not include labels like "STANDARD:" or "BEST:" — just the text separated by ---SEPARATOR---.',
    ]
      .filter(Boolean)
      .join('\n');

    return { system, user: text };
  }

  // toHuman
  const system = [
    'You are a LinkedIn post decoder. Translate LinkedIn corporate jargon back into plain, normal human language.',
    intensityInstruction,
    contextInstruction,
    'Strip away the buzzwords, humble-brags, and unnecessary vulnerability.',
    'Output two versions separated by "---SEPARATOR---":',
    '1. STANDARD: A straightforward decode into plain English.',
    '2. BEST: An even more concise, brutally honest version.',
    'Do not include labels — just the text separated by ---SEPARATOR---.',
  ]
    .filter(Boolean)
    .join('\n');

  return { system, user: text };
}
