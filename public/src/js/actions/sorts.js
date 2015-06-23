var Dispatcher = require('../dispatchers/app');

var sortActions = {
  submit: function(result){
    if(result == 'ok'){
      Dispatcher.handleViewAction({
        type: 'createChat',
        result: result
      });
    }
  }
};

module.exports = sortActions;
