var Sort = require('./views/sort');
var Matches = require('./views/matches');
var Messages = require('./views/messages');

var Body = React.createClass({
	getInitialState () {
    return {
      route: window.location.hash.substr(1)
    };
  },
  componentDidMount () {
    window.addEventListener('hashchange', function () {
      this.setState({
        route: window.location.hash.substr(1)
      });
    }.bind(this));
  },
	render: function () {
		var Child;
		var route = this.state.route;
		var viewID = 0;
		switch (true){
			case /\/messages/.test(route):
			Child = Messages;
			break;
			case /\/matches/.test(route):
			Child = Matches;
			id = route.match(/\/matches(\d+)/);
			break;
			default:
			Child = Sort;
		}
		return (
			<div>
				<h1>App</h1>
				<ul>
					<li><a href="#/">選別</a></li>
					<li><a href="#/matches">マッチ一覧</a></li>
				</ul>
				<Child viewID={viewID}/>
			</div>
		);
	}
});

React.render(<Body />, document.body);
