import { Configuration, OpenAIApi } from './openai-config.js';
import { sendToOpenAI } from './openai.mjs';

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
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [0, 0],
      zoom: 1
    });

    // Set the country fill color
    map.on('load', function() {
      map.setPaintProperty('country', 'fill-color', color);
    });

    // Fly to the country
    map.flyTo({
      center: [0, 0],
      zoom: 3,
      essential: true,
      speed: 0.7,
      curve: 1,
      bearing: 0,
      pitch: 0
    });

    // Set the country name in the message history
    appendMessage(`ChatMaps: Here's a map of ${country}.`);
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
