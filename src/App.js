// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

import vimCommands from './vim-commands.json';
import LeftHalf from './components/LeftHalf';
import RightHalf from './components/RightHalf';
import StaticPageContent from './components/StaticPageContent';

const AppWrapper = styled.div`
  padding: 6vw 10vw;
  display: flex;

  /* background gradient with fallback */
  background: #fd746c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #ff9068,
    #fd746c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #ff9068,
    #fd746c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  /* desktop first css */
  flex-direction: row;
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 10vh 4vw;
  }
`;

export type TVimCommands = {
  [command: string]: {|
    +description: string,
    +active: boolean
  |}
};

type TState = {|
  +commands: TVimCommands
|};

class App extends Component<null, TState> {
  constructor() {
    super();
    const commands: TVimCommands = Object.keys(vimCommands).reduce(
      (acc, commandName) => {
        acc[commandName] = {
          ...vimCommands[commandName],
          active: false
        };
        return acc;
      },
      {}
    );

    this.state = {
      commands
    };
  }

  handleRowClick = (command: string) => {
    const newCommands = {...this.state.commands}
    newCommands[command].active = !newCommands[command].active
    const newState: TState = {
      commands: newCommands
    };
    this.setState(newState);
  };

  render() {
    return (
      <div>
        <AppWrapper>
          <LeftHalf
            vimCommands={this.state.commands}
            handleRowClick={this.handleRowClick}
          />
          <RightHalf vimCommands={this.state.commands} />
        </AppWrapper>
        <StaticPageContent />
      </div>
    );
  }
}

export default App;
