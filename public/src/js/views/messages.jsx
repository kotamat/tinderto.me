var UsersStore = require('../stores/users');
var MessagesStore = require('../stores/messages');

var Reply = require('../views/partical/reply');

function getStateFromMessagesByID(viewID){
  return MessagesStore.getChatByUserID(viewID);
}
var Messages = React.createClass({
	getInitialState: function () {
    return {
      messages: getStateFromMessagesByID(this.props.viewID).messages
    }
  },
  componentWillMount: function(){
    MessagesStore.addChangeListener(this.onStoreChange);
  },
  componentWillUnmount: function(){
    //MessagesStore.removeChangeListener(this.onStoreChange);
  },
  onStoreChange: function(){
    this.setState({
      messages: getStateFromMessagesByID(this.props.viewID).messages
    });
  },
  render: function(){
    var messages = this.state.messages.map(function(message, index){
      var user = UsersStore.getByUserID(index);
      return (
        <li key={ index }>
          {message.contents}
        </li>
      )
    });
    return (
      <div>
        <ul>{messages}</ul>
        <Reply chatID={this.props.viewID} />
      </div>
    );
  }
});

module.exports = Messages;
