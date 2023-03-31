async function sendToOpenAI(message) {
  const apiKey = "${{ secrets.OPENAI_API_KEY }}";
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

