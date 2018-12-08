// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import vimCommands from './vim-commands.json'
import LeftHalf from './components/LeftHalf';
import RightHalf from './components/RightHalf';
import StaticPageContent from './components/StaticPageContent';

const AppWrapper = styled.div`
  padding: 6vw 10vw;
  display: flex;

  /* background gradient with fallback */
  background: #fd746c;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #ff9068, #fd746c);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #ff9068, #fd746c); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* desktop first css */
  flex-direction: row;
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 10vh 4vw;
  }
`;

// a tuple where element 0 is a command, and 1 is it's comment
export type TNewText = [string, string]
type TState = {|
  +vimrcTextContent: Array<TNewText>
|}

class App extends Component<null, TState> {
    state = {
      // 2d array. elem 0 is command, 1 is comment
      vimrcTextContent: []
    };

  // newText is an array where the first element is command and second is comment
  appendVimrcContent = (newText: TNewText) => {
    this.setState({
      vimrcTextContent: [...this.state.vimrcTextContent, newText]
    });
  };

  render() {
    return (
      <div>
        <AppWrapper>
          <LeftHalf
            onAppendVimrcContent={this.appendVimrcContent}
            vimCommands={vimCommands}
           />
          <RightHalf textContentArr={this.state.vimrcTextContent}/>
        </AppWrapper>
        <StaticPageContent/>
      </div>
    );
  }
}

export default App;
