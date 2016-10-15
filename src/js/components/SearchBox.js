const SearchBox = React.createClass({
  handleChange: function(event) {
    // console.log(event.target.value);
    this.props.handleSearchChange(event.target.value);
  },

  render: function() {
    return(
      <input type="text" onChange={this.handleChange} className="form-control" placeholder="Search"/>
    );
  },
});

module.exports = SearchBox;
