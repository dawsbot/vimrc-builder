console.log('\
         _                     ____        _ __    __\n\
  _   __(_)___ ___  __________/ __ )__  __(_) /___/ /__  _____\n\
 | | / / / __ `__ \\/ ___/ ___/ __  / / / / / / __  / _ \\/ ___/\n\
 | |/ / / / / / / / /  / /__/ /_/ / /_/ / / / /_/ /  __/ /\n\
 |___/_/_/ /_/ /_/_/   \\___/_____/\\__,_/_/_/\\__,_/\\___/_/\n\
 \nThank you for checking out vimrcBuilder\'s console! \nYou seem like a hacker, if so, consider contributing here https://github.com/dawsonbotsford/vimrcBuilder.\n');
const commands = require('../../commands.json');
const CheckBox = require('./CheckBox');

const SearchBox = React.createClass({
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
const CheckBoxes = React.createClass({
  getInitialState: function(){
    return {'searchboxValue': ''};
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
      return '';
    }
  },

  doesInclude: function(cmd, searchVal){
    return (this.normalize(cmd.description).includes(searchVal) || this.normalize(cmd.command).includes(searchVal));
  },

  render: function() {
    const checkList = [];
    const searchVal = this.normalize(this.state.searchBoxValue);
    commands.forEach(function (command, index) {
      /* Only include if searched for */
        checkList.push(<CheckBox
          command={command}
          key={index}
          hidden={!this.doesInclude(command, searchVal)}/>);
    }.bind(this));

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
