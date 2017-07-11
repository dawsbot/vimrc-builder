const CheckBox = React.createClass({
  // Get line number which command exists at in ace editor
  getLine: function(str) {
    const arr = editor.getSession().getValue().split('\n');
    let lineNumber = -1;
    arr.forEach(function(line, index) {
      if (line.includes(str)) {
        lineNumber = index + 1;
      }
    });
    return lineNumber;
  },
  handleChange: function(event) {
    const command = this.props.command.command;
    let session = editor.session;
    let checkbox;
    if (event.currentTarget.tagName == 'INPUT') {
      checkbox = event.currentTarget;
    }
    else {
      checkbox = event.currentTarget.firstChild;
    }
    checkbox.checked = !checkbox.checked;

    // append to end of ace editor
    if (checkbox.checked) {
        session.insert({
          row: session.getLength(),
          column: 0
        }, '\n' + command);

      checkbox.parentElement.style.backgroundColor = 'lightgreen';
    }
    // remove command from ace editor
    else {
      const currentPosition = editor.getCursorPosition();

      // find & save line to remove
      const lineNumber = this.getLine(command);
      editor.gotoLine(lineNumber, 0, false);
      editor.removeLines();
      editor.moveCursorTo(currentPosition);

      checkbox.parentElement.style.backgroundColor = 'rgba(0,0,0,0.03)';
    }
  },
  render: function() {
    const command = this.props.command;
    return (
      <div onClick={this.handleChange}
           className="checkBox"
           hidden={this.props.hidden}>
        <input
        type='checkbox'
        onChange={this.handleChange}
        /> <b>{command.command}</b> -- {command.description}<br/>
      </div>
    );
  }
});

module.exports = CheckBox;
