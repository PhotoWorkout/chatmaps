async function sendToOpenAI(message) {
  const apiKey = "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"; // Replace with your OpenAI API key
  const apiURL = "https://api.openai.com/v1/completions";
  const prompt = `Extract country and color from the following message: "${message}"`;

  const response = await fetch(apiURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.5,
      model: "davinci-codex"
    }),
  });

  const data = await response.json();
  const output = data.choices[0].text.trim();
  return output;
}

