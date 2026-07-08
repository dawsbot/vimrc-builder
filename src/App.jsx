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

class App extends Component {

  constructor() {
    super();
    const activeSet = App.parseHash(window.location.hash);
    const commandKeys = Object.keys(vimCommands);
    const commands = commandKeys.reduce(
      (acc, commandName, index) => {
        acc[commandName] = {
          ...vimCommands[commandName],
          active: activeSet ? activeSet.has(index) : false
        };
        return acc;
      },
      {}
    );

    this.state = {
      commands
    };
  }

  static parseHash(hash) {
    if (!hash || hash.length < 2) return null;
    try {
      const encoded = hash.slice(1); // remove '#'
      // Decode base36 back to binary string
      let binary = '';
      // Process in chunks to handle large numbers
      const chunkSize = 6; // each base36 chunk encodes ~31 bits
      const bitsPerChunk = 31;
      const totalCommands = Object.keys(vimCommands).length;
      const numChunks = Math.ceil(totalCommands / bitsPerChunk);

      const chunks = encoded.split('-');
      if (chunks.length !== numChunks) return null;

      for (let i = 0; i < chunks.length; i++) {
        const num = parseInt(chunks[i], 36);
        if (isNaN(num)) return null;
        const isLast = i === chunks.length - 1;
        const width = isLast ? totalCommands - i * bitsPerChunk : bitsPerChunk;
        binary += num.toString(2).padStart(width, '0');
      }

      const activeIndices = new Set();
      for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '1') activeIndices.add(i);
      }
      return activeIndices;
    } catch (e) {
      return null;
    }
  }

  updateHash = (commands) => {
    const commandKeys = Object.keys(vimCommands);
    const hasAny = commandKeys.some(k => commands[k].active);
    if (!hasAny) {
      window.history.replaceState(null, '', window.location.pathname);
      return;
    }
    // Build binary string from active states
    const binary = commandKeys.map(k => commands[k].active ? '1' : '0').join('');
    // Encode in chunks to avoid number overflow
    const bitsPerChunk = 31;
    const chunks = [];
    for (let i = 0; i < binary.length; i += bitsPerChunk) {
      const chunk = binary.slice(i, i + bitsPerChunk);
      chunks.push(parseInt(chunk, 2).toString(36));
    }
    window.history.replaceState(null, '', '#' + chunks.join('-'));
  };

  handleRowClick = (command) => {
    const newCommands = {...this.state.commands}
    newCommands[command].active = !newCommands[command].active
    const newState = {
      commands: newCommands
    };
    this.setState(newState, () => {
      this.updateHash(this.state.commands);
    });
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
