var SortActions = require('../actions/sorts');

var MessagesStore = require('../stores/messages');
var UsersStore = require('../stores/users');

function getStateFromUsers(){
	return UsersStore.getAll();
}
function getCurrentUserID(){
	return UsersStore.getCurrentUserID();
}
var Sort = React.createClass({
	getInitialState: function () {
		SortActions.initUsers();
    return {
      users: getStateFromUsers(),
			currentUser: getCurrentUserID()
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
    SortActions.submit(this.state.currentUser, result);
		this.setState({
			currentUser: getCurrentUserID()
		})
  },
  render: function(){
    var cards = this.state.users.map(function(user,index){
			var classes = 'card';
			if(index != getCurrentUserID()){
				classes += ' hide ' + user.status;
			}
      return (
        <div className={ classes }>
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
          <a onClick={ this.submit.bind(this, 'dislike') } id="submit-dislike">dislike</a>
          <a onClick={ this.submit.bind(this, 'like') } id="submit-like">like</a>
        </div>
      </div>
    )
  }
});

module.exports = Sort;
