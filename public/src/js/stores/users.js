var Dispatcher = require('../dispatchers/app');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var users = [];

var usersStore = assign({}, EventEmitter.prototype, {
  addChangeListener: function(callback){
    this.on('change', callback);
  },
  removeChangeListener: function(callback){
    this.off('change', callback);
  },
  getAll: function(){
    return users;
  },
  getByUserID: function(ID){
    return users[ID];
  },
  getCurrentUserID: function(){
    return users.length - 1;
  }
});

usersStore.dispatchToken = Dispatcher.register(function(payload){
  var actions = {
    findNewUser: function(payload){
      users.push(payload.action.user);
      usersStore.emit('change');
    },
    changeStatus: function(payload){
      users[payload.action.userID].status = payload.action.result;
    }
  };
  actions[payload.action.type] && actions[payload.action.type](payload);
});

module.exports = usersStore;
