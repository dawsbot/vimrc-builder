//es6 implemented

console.log('\
         _                     ____        _ __    __\n\
  _   __(_)___ ___  __________/ __ )__  __(_) /___/ /__  _____\n\
 | | / / / __ `__ \\/ ___/ ___/ __  / / / / / / __  / _ \\/ ___/\n\
 | |/ / / / / / / / /  / /__/ /_/ / /_/ / / / /_/ /  __/ /\n\
 |___/_/_/ /_/ /_/_/   \\___/_____/\\__,_/_/_/\\__,_/\\___/_/\n\
 \nThank you for checking out vimrcBuilder\'s console! \nYou seem like a hacker, if so, consider contributing here https://github.com/dawsonbotsford/vimrcBuilder.\n');
let commands = require('../../commands.json');

//Children elements
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

var SearchBox = React.createClass({
  handleChange: function(event) {
    // console.log(event.target.value);
    this.props.handleSearchChange(event.target.value);
  },

  render: function() {
    return(
      <div>
        <input type="text" onChange={this.handleChange} className="form-control" placeholder="Search"/>
      </div>
    );
  },
});

//Parent element
var CheckBoxes = React.createClass({
  getInitialState: function(){
    return {'searchboxValue': ""}
  },

  handleSearchChange: function(val) {
    this.setState({
    searchBoxValue: val,
    });
  },

  normalize: function(str){
    if (str){
      return str.toLowerCase();
    } else {
      return "";
    }
  },

  doesInclude: function(cmd, searchVal){
    if (this.normalize(cmd.description).includes(searchVal) || this.normalize(cmd.command).includes(searchVal))
      return true;
    else
      return false;
  },

  render: function() {
    let checkList = [];
    var searchVal = this.normalize(this.state.searchBoxValue);
    commands.forEach(function (command, index) {
      /* Only include if searched for */
      if (this.doesInclude(command, searchVal)){
        checkList.push(<CheckBox command={command} key={index} hidden={false}/>);
      } else {
        checkList.push(<CheckBox command={command} key={index} hidden={true}/>);
      }
    }.bind(this))

    return (
      <div>
        <SearchBox handleSearchChange={this.handleSearchChange}/>
        <form>
          {checkList}
        </form>
      </div>
    );
  }
});

ReactDOM.render(
  <CheckBoxes />,
  document.getElementById('example')
);
