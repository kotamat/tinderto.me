var Hello = require('./views/hello');

var Body = React.createClass({
	render: function () {
		return (
			<Hello />
		);
	}
});

React.render(<Body />, document.body);
