const chatBox = document.getElementById('chat-box');
const chatInput = document.getElementById('chat-input');

function detectCountry(message) {
    // Add country name detection logic here.
    // For example, you can use a list of countries or a third-party API to detect country names in the message.
    // Return the detected country name or an empty string if none is found.
}

function assignColor(country) {
    // Add color assignment logic here.
    // You can use a predefined color map for countries, or generate colors programmatically.
    // Return the assigned color.
}

function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
        const country = detectCountry(message);
        const color = assignColor(country);

        const messageElement = document.createElement('div');
        messageElement.style.color = color;
        messageElement.textContent = message;
        chatBox.appendChild(messageElement);

        chatInput.value = '';
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

async function sendToOpenAI(message) {
    const apiKey = "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"; // Replace with your OpenAI API key
    const apiURL = "https://api.openai.com/v1/engines/davinci-codex/completions";
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
      }),
    });
  
    const data = await response.json();
    const output = data.choices[0].text.trim();
    return output;
  }
  
