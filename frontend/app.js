var React = require('react');
var ReactDOM = require('react-dom');


console.log('you are successfully using react');

class HelloWorld extends React.Component {
  render() {
    return <div>You are successfully using ReactJS! Congrats!</div>;
  }
}

ReactDOM.render(<HelloWorld />, document.getElementById('app'));
