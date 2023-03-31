import { Configuration, OpenAIApi } from './openai-config.mjs';
import { sendToOpenAI } from './openai.mjs';

$(function() {
  // Selector for the chatbox elements
  const $chatboxContainer = $('.chatbox-container');
  const $chatboxMessages = $('.chatbox-messages');
  const $chatboxInput = $('.chatbox-input input[type="text"]');
  const $chatboxSendButton = $('.chatbox-input button');

  // Function to append a message to the message history
  function appendMessage(message) {
    const $messageElement = $('<div>').text(message);
    $chatboxMessages.append($messageElement);
  }

  // Function to handle sending a message
  async function sendMessage() {
    const message = $chatboxInput.val();
    appendMessage("You: " + message);
    $chatboxInput.val('');

    // Send the message to OpenAI
    const response = await sendToOpenAI(message);

    // Extract the country and color from the OpenAI response
    const countryColorRegex = /The country is (.+?) and the color is (.+?)\./;
    const matches = response.match(countryColorRegex);

    if (matches) {
      const country = matches[1];
      const color = matches[2];

      // Create a map with Mapbox
      const mapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${country}.json?access_token=${MAPBOX_ACCESS_TOKEN}&color=${color}&size=640x640`;
      const $mapElement = $('<img>').attr('src', mapUrl);
      appendMessage($mapElement);
    } else {
      appendMessage("ChatMaps: I'm sorry, I couldn't extract the country and color from your message.");
    }
  }

  // Event handler for the send button click
  $chatboxSendButton.on('click', function() {
    sendMessage();
  });

  // Event handler for the enter key press in the input field
  $chatboxInput.on('keypress', function(event) {
    if (event.which === 13) {
      sendMessage();
    }
  });
});
