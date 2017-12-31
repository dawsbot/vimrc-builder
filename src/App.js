import React, { Component } from 'react';
import styled from 'styled-components';

import LeftHalf from './components/LeftHalf';
import RightHalf from './components/RightHalf';

const AppWrapper = styled.div`
  margin: 100px;
  display: flex;
  flex-direction: row;

  font-size: 16px;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      vimrcTextContent: []
    };
  }

  // newText is an array where the first element is command and second is comment
  appendVimrcContent = (newText) => {
    console.log([...this.state.vimrcTextContent, newText]);
    this.setState({
      vimrcTextContent: [...this.state.vimrcTextContent, newText]
    });
  };

  render() {
    return (
      <AppWrapper>
        <LeftHalf
          onAppendVimrcContent={this.appendVimrcContent}/>
        <RightHalf textContentArr={this.state.vimrcTextContent}/>
      </AppWrapper>
    );
  }
}

export default App;
