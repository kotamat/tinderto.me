var UsersStore = require('../stores/users');
var MessagesStore = require('../stores/messages');

function getStateFromMessagesByID(viewID){
  return MessagesStore.getChatByUserID(viewID);
}
var Messages = React.createClass({
	getInitialState: function () {
    return {
      messages: getStateFromMessagesByID(this.props.viewID).messages
    }
  },
  render: function(){
    console.log(this.state.messages);
    var messages = this.state.messages.map(function(message, index){
      console.log(index);
      var user = UsersStore.getByUserID(index);
      return (
        <li key={ index }>
          {message.contents}
        </li>
      )
    });
    return (
      <ul>{messages}</ul>
    );
  }
});

module.exports = Messages;
