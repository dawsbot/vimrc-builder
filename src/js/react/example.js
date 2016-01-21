var CheckBoxes = React.createClass({
  render: function() {
    return (
      <form>
        <input type="checkbox" name="fruit" value="apple" />Apple<br/>
        <input type="checkbox" name="fruit" value="orange" />Orange<br/>
        <input type="checkbox" name="fruit" value="watermelon" />Watermelon<br/>
      </form>
    );
  }
});
ReactDOM.render(
  <CheckBoxes />,
  document.getElementById('example')
);
