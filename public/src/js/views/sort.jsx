var SortActions = require('../actions/sorts');

var MessagesStore = require('../stores/messages');
var UsersStore = require('../stores/users');

function getStateFromUsers(){
	return UsersStore.getAll();
}
var Sort = React.createClass({
	getInitialState: function () {
		SortActions.initUsers();
    return {
      users: getStateFromUsers()
    }
  },
  componentWillMount: function(){
    UsersStore.addChangeListener(this.onStoreChange);
  },
  componentWillUnmount: function(){
  },
  onStoreChange: function(){
    this.setState({
      users: getStateFromUsers()
    });
  },
  submit: function(result) {
    SortActions.submit(result);
  },
  render: function(){
    var cards = this.state.users.map(function(user,index){
      return (
        <div>
          {user.name}<br />
        <img src={user.img} alt={user.name} /><br />
        </div>
      );
    });
    return (
      <div>
        <div>
          {cards}
        </div>
        <div id="submit-area">
          <a onClick={ this.submit.bind(this, 'no') } id="submit-no">no</a>
          <a onClick={ this.submit.bind(this, 'ok') } id="submit-ok">ok</a>
        </div>
      </div>
    )
  }
});

module.exports = Sort;
