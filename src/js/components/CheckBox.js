var CheckBox = React.createClass({
  //Get command from value in commands object
  getCommand: function(val) {
    for (let command of commands) {
      if (command.command.replace(/ /g,'') === val) {
        return command.command;
      }
    }
    return '\"\" error in getCommand function of CheckBox React element';
  },
  //take in string and return line number in which it exists in ace
  getLine: function(str) {
    var arr = editor.getSession().getValue().split('\n');
    let toReturn = -1;
    arr.forEach(function(line, index) {
      if (line.includes(str)) {
        toReturn = index + 1;
      }
    });
    return toReturn;
  },
  handleChange: function(event) {
    const command = this.getCommand(event.currentTarget.id);
    let session = editor.session;

    //append to end of ace editor
    if (event.currentTarget.checked === true) {
        session.insert({
          row: session.getLength(),
          column: 0
        }, '\n' + command);

      //set checkbox background to green
      event.target.parentElement.style.backgroundColor = 'lightgreen';
    }
    //strip command from ace editor
    else {
      //save cursor position
      const currentPosition = editor.getCursorPosition();

      //find & save line to remove
      var lineNumber = this.getLine(command);
      editor.gotoLine(lineNumber, 0, false);
      editor.removeLines();

      //set checkbox background back to default
      event.target.parentElement.style.backgroundColor = 'rgba(0,0,0,0.03)';

      //return cursor position
      editor.moveCursorTo(currentPosition);
    }
  },
  render: function() {
    var command = this.props.command;
    return (
      <div className="checkBox" hidden={this.props.hidden}>
        <input key={this.props.key} type='checkbox' name='vimrcCommand' id={command.command.replace(/ /g,'')} onChange={this.handleChange}/> <b>{command.command}</b> -- {command.description}<br/>
      </div>
    );
  }
});

module.exports = CheckBox;