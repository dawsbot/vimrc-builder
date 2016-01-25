//JS es6 implemented

let commands = require('../../commands.json');

//Children elements
var CheckBox = React.createClass({
  //Get command from value in commands object
  getCommand: function(val) {
    for (let command of commands) {
      if (command.value == val) {
        return command.command;
      }
    }
    return 'command not found';
  },
  handleChange: function(event) {

    if (event.currentTarget.checked === true) {
      console.log(`APPENDING ${this.getCommand(event.currentTarget.value)} to ace`);
    } else {
      console.log(`STRIPPING ${this.getCommand(event.currentTarget.value)} from ace`);
    }
  },
  render: function() {
    var command = this.props.command;
    return (
      <div>
        <input type="checkbox" name="vimrcCommand" value={command.value} onChange={this.handleChange}/> {command.command}<br/>
      </div>
    );
  }
});

//Parent element
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
