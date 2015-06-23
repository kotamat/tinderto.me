var MessageActions = require('../../actions/messages');
var MessagesStore = require('../../stores/messages');

var Reply = React.createClass({
  getInitialState: function(){
    return {
      value: ''
    }
  },
  updateValue: function(e){
    this.setState({
      value: e.target.value
    });
  },
  onKeyDown: function(e){
    if(e.keyCode === 13){
      MessageActions.sendMessage(this.props.chatID, this.state.value);

      this.setState({
        value: ''
      });
    }
  },
  render: function(){
    return (
      <input type="text" onChange={ this.updateValue } onKeyDown={this.onKeyDown} />
    );
  }
});

module.exports = Reply;
