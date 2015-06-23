var Dispatcher = require('../dispatchers/app');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var messages = [
  {
    messages: [
      {
        contents: 'hoge',
        timestamp: 1424469793023
      }
    ]
  }
];

var openChatID = 0;

var messagesStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback){
    this.on('change', callback);
  },
  removeChangeListener: function(callback){
    this.off('change', callback);
  },
  getOpenChatUserID: function(){
    return openChatID;
  },
  getChatByUserID: function(id){
    return messages[id];
  },
  getAll: function(){
    return messages;
  }
});

messagesStore.dispatchToken = Dispatcher.register(function(payload){
  var actions = {
    createChat: function(payload){
      messages.push({
        messages:[]
      });
    }
  };
  actions[payload.action.type] && actions[payload.action.type](payload);
});

module.exports = messagesStore;
