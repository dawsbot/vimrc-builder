//JS es6 implemented

let commands = require('../../commands.json');


//Children elements
var CheckBox = React.createClass({
  //Get command from value in commands object
  getCommand: function(val) {
    for (let command of commands) {
      // debugger;
      if (command.value == val) {
        return command.command;
      }
    }
    return 'command not found';
  },
  //take in string and return line number in which it exists in ace
  getLine: function(str) {
    var arr = editor.getSession().getValue().split('\n');
    let toReturn = -1;
    arr.forEach(function(line, index) {
      if (line.includes(str)) {
        console.log('found string on line ' + index);
        toReturn = index + 1;
      }
    });
    return toReturn;
  },
  handleChange: function(event) {
    const command = this.getCommand(event.currentTarget.value);
    let session = editor.session;

    //append to end of ace editor
    if (event.currentTarget.checked === true) {
      console.log(`APPENDING ${command} to ace`);
        session.insert({
          row: session.getLength(),
          column: 0
        }, '\n' + command);
    }
    //strip command from ace editor
    else {
      console.log(`STRIPPING ${command} from ace`);
      var lineNumber = this.getLine(command);
      editor.gotoLine(lineNumber, 0, false);
      editor.removeLines();
    }
  },
  render: function() {
    var command = this.props.command;
    return (
      <div className="checkBox">
        <input type='checkbox' name='vimrcCommand' value={command.value} onChange={this.handleChange}/> <b>{command.command}</b> -- {command.description}<br/>
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
