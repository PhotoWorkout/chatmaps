import { Configuration, OpenAIApi } from './openai-config.mjs';
import { sendToOpenAI } from './openai.mjs';

$(function() {
  // Selector for the chatbox elements
  var $chatboxContainer = $('.chatbox-container');
  var $chatboxMessages = $('.chatbox-messages');
  var $chatboxInput = $('.chatbox-input input[type="text"]');
  var $chatboxSendButton = $('.chatbox-input button');

  // Function to append a message to the message history
  function appendMessage(message) {
    var $messageElement = $('<div>').text(message);
    $chatboxMessages.append($messageElement);
  }

  // Function to handle sending a message
  async function sendMessage() {
    var message = $chatboxInput.val();
    appendMessage("You: " + message);
    $chatboxInput.val('');

    // Send the message to OpenAI
    var response = await sendToOpenAI(message);

    // Extract the country and color from the OpenAI response
    var countryColorRegex = /The country is (.+?) and the color is (.+?)\./;
    var matches = response.match(countryColorRegex);

    if (matches) {
      var country = matches[1];
      var color = matches[2];

      // Create a map with Leaflet
      createMap(country, color);
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