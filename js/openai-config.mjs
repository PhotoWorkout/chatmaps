export class Configuration {
  constructor(options) {
    this.apiKey = options.apiKey;
  }
}

export class OpenAIApi {
  constructor(configuration) {
    this.configuration = configuration;
  }

  async request(endpoint, method = 'GET', body = null) {
    const response = await fetch(`https://api.openai.com/v1/${endpoint}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.configuration.apiKey}`
      },
      body: JSON.stringify(body)
    });

    const responseData = await response.json();

    if (response.status !== 200) {
      throw new Error(`Failed to execute API request: ${responseData.error.message}`);
    }

    return responseData;
  }

  async completions.create(options) {
    const response = await this.request('completions', 'POST', options);
    return response;
  }
}