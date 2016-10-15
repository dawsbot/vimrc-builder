console.log('\
         _                     ____        _ __    __\n\
  _   __(_)___ ___  __________/ __ )__  __(_) /___/ /__  _____\n\
 | | / / / __ `__ \\/ ___/ ___/ __  / / / / / / __  / _ \\/ ___/\n\
 | |/ / / / / / / / /  / /__/ /_/ / /_/ / / / /_/ /  __/ /\n\
 |___/_/_/ /_/ /_/_/   \\___/_____/\\__,_/_/_/\\__,_/\\___/_/\n\
 \nThank you for checking out vimrcBuilder\'s console! \nYou seem like a hacker, if so, consider contributing here https://github.com/dawsonbotsford/vimrcBuilder.\n');

const CheckBox = require('./CheckBox');
const SearchBox = require('./SearchBox');

const commands = require('../../commands.json');

//Parent element
const CheckBoxes = React.createClass({
  getInitialState: function(){
    return {
      'searchboxValue': ''
    };
  },

  handleSearchChange: function(val) {
    this.setState({
      searchBoxValue: val
    });
  },

  normalize: function(str){
    return str ? str.toLowerCase() : '';
  },

  doesInclude: function(cmd, searchVal){
    return (this.normalize([cmd.description, cmd.command].join(' ')).includes(searchVal));
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
