import { configuration, openai } from './openai-config.mjs';

export async function sendToOpenAI(message) {
  const prompt = `Extract country and color from the following message: "${message}"`;

  const response = await openai.completions.create({
    prompt: prompt,
    maxTokens: 50,
    n: 1,
    stop: null,
    temperature: 0.5,
    model: "davinci-codex"
  });

  const output = response.choices[0].text.trim();
  return output;
}