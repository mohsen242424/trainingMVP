const { Anthropic } = require('@anthropic-ai/sdk');

const getClient = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;
  return new Anthropic({ apiKey });
};

async function evaluateTranslation(sourceText, studentTranslation) {
  const anthropic = getClient();
  if (!anthropic) return { error: 'API key not configured', fallback: true };

  try {
    const prompt = `أنت خبير في تقييم الترجمة. قم بتقييم ترجمة الطالب للنص التالي.
النص الأصلي:
\${sourceText}

ترجمة الطالب:
\${studentTranslation}

قدم التقييم بصيغة JSON فقط بالتنسيق التالي بدون أي نص إضافي:
{
  "score": 85,
  "accuracy": "ملاحظات حول دقة الترجمة",
  "style": "ملاحظات حول الأسلوب والصياغة",
  "errors": ["خطأ 1", "خطأ 2"],
  "strengths": ["نقطة قوة 1", "نقطة قوة 2"],
  "overall_feedback": "ملاحظات عامة"
}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      messages: [{ role: 'user', content: prompt }]
    });

    return JSON.parse(message.content[0].text);
  } catch (error) {
    return { error: error.message, fallback: true };
  }
}

async function evaluateApplicationAnswers(position, answers) {
  const anthropic = getClient();
  if (!anthropic) return { error: 'API key not configured', fallback: true };

  try {
    const prompt = `أنت مدير موارد بشرية تقيم إجابات متقدم لتدريب.
المنصب: \${position}
الإجابات:
\${answers}

قدم التقييم بصيغة JSON فقط بالتنسيق التالي بدون أي نص إضافي:
{
  "score": 90,
  "analysis": "تحليل الإجابات",
  "recommendation": "توصية بالقبول أو الرفض مع السبب"
}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 800,
      messages: [{ role: 'user', content: prompt }]
    });

    return JSON.parse(message.content[0].text);
  } catch (error) {
    return { error: error.message, fallback: true };
  }
}

async function askWorkplaceAI(question, context) {
  const anthropic = getClient();
  if (!anthropic) return { error: 'API key not configured', fallback: true };

  try {
    const prompt = `أنت مرشد افتراضي في بيئة عمل للترجمة. أجب عن سؤال المتدرب بشكل مهني وموجز ومفيد.
السياق: \${context || 'عام'}
السؤال: \${question}`;

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 400,
      messages: [{ role: 'user', content: prompt }]
    });

    return message.content[0].text;
  } catch (error) {
    return { error: error.message, fallback: true };
  }
}

module.exports = { evaluateTranslation, evaluateApplicationAnswers, askWorkplaceAI };
