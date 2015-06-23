var UsersStore = require('../stores/users');
var MessagesStore = require('../stores/messages');

function getStateFromMessages(){
  return MessagesStore.getAll();
}
var Matches = React.createClass({
	getInitialState: function () {
    return {
      messages: getStateFromMessages()
    }
  },
  render: function(){
    var messages = this.state.messages.map(function(message, index){
      console.log(index);
      var user = UsersStore.getByUserID(index);
      return (
        <li>
          <a href={ '#/messages/' + index }>{user.name}</a>
        </li>
      )
    });
    return (
      <ul>{messages}</ul>
    );
  }
});

module.exports = Matches;
