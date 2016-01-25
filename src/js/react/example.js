let commands = require('../../commands.json');

var CheckBox = React.createClass({
  render: function() {
    var command = this.props.command;
    return (
      <div>
        <input type="checkbox" name="fruit" value={command.value} /> {command.command}<br/>
      </div>
    );
  }
});

var CheckBoxes = React.createClass({
  render: function() {
    let checkList = [];
    for (let command of commands) {
      checkList.push(<CheckBox command={command} />);
    }
    return (
      <form>
        {checkList}
      </form>
    );
  }
});
ReactDOM.render(
  <CheckBoxes />,
  document.getElementById('example')
);
