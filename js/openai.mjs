import { Configuration, OpenAIApi } from './openai-config.mjs';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

export async function sendToOpenAI(message) {
  const prompt = `Extract country and color from the following message: "${message}"`;

  const response = await openai.createCompletions({
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
