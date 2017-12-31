import React, { Component } from 'react';
import styled from 'styled-components';

import LeftHalf from './components/LeftHalf';
import RightHalf from './components/RightHalf';
import StaticPageContent from './components/StaticPageContent';

const AppWrapper = styled.div`
  padding: 100px;
  /* separate app from static page content */
  /* margin-bottom: 160px; */
  display: flex;

  /* desktop first css */
  flex-direction: row;
  @media (max-width: 900px) {
    flex-direction: column;
  }

  /* background gradient with fallback */
  background: #fd746c;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ff9068, #fd746c);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ff9068, #fd746c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
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
      <div>
        <AppWrapper>
          <LeftHalf
            onAppendVimrcContent={this.appendVimrcContent}/>
          <RightHalf textContentArr={this.state.vimrcTextContent}/>
        </AppWrapper>
        <StaticPageContent/>
      </div>
    );
  }
}

export default App;
