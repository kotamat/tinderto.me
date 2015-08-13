var SortActions = require('../actions/sorts');
var Hammer = require('react-hammerjs');
var options = {touchAction:true, recognizers:{tap:{time:600, threshold:100}}};

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
		React.initializeTouchEvents(true);
    UsersStore.addChangeListener(this.onStoreChange);
  },
  componentWillUnmount: function(){
  },
  onStoreChange: function(){
    this.setState({
      users: getStateFromUsers()
    });
  },
	handleTouchStart: function(e){
		alert(e);
	},
	handleDragOver: function(e){
		console.log(e);
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
        <Hammer component="div" onTap={this.handleTouchStart} onSwipe={this.handleTouchStart} key={ index } className={ classes }>
					<a onClick={ this.handleDragOver } >drag test</a>
          {user.name}<br />
				<img onTouchStart={ this.handleTouchStart } onMouseDown={this.handleTouchStart} onCleck={ this.handleDragOver } src={user.img} alt={user.name} /><br />
        </Hammer>
      );
    });
    return (
      <div>
        <div>
          {cards}
        </div>
        <div id="submit-area">
          <a onClick={ this.submit.bind(this, 'dislike') } onTouchEnd={ this.submit.bind(this, 'dislike') } id="submit-dislike">dislike</a>
          <a onClick={ this.submit.bind(this, 'like') } onTouchEnd={ this.submit.bind(this, 'like') } id="submit-like">like</a>
        </div>
      </div>
    )
  }
});

module.exports = Sort;
