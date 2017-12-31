import React, { Component } from 'react';
import styled from 'styled-components';

import LeftHalf from './components/LeftHalf';
import RightHalf from './components/RightHalf';

const AppWrapper = styled.div`
  margin: 100px;
  display: flex;
  font-size: 16px;

  /* desktop first css */
  flex-direction: row;
  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      // 2d array. elem 0 is command, 1 is comment
      vimrcTextContent: []
    };
  }

  // newText is an array where the first element is command and second is comment
  appendVimrcContent = (newText) => {
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
