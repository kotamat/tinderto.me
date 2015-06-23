var Dispatcher = require('../dispatchers/app');

var messageActions = {
  sendMessage: function(chatID,message){
    Dispatcher.handleViewAction({
      type: 'sendMessage',
      chatID: chatID,
      message: message
    });
  }
};

module.exports = messageActions;
