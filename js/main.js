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
  function sendMessage() {
    var message = $chatboxInput.val();
    appendMessage(message);
    $chatboxInput.val('');
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

  
