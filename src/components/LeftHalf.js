// @flow
import React from 'react';
import styled from 'styled-components';

import SearchResult from './SearchResult';
import SectionHeader from './SectionHeader';

import type { TVimCommands } from '../App';

const LeftHalfWrapper = styled.div`
  min-width: 40%;
  margin-right: 100px;
  @media (max-width: 900px) {
    width: 100%;
  }
`;

const SearchInput = styled.input`
  /* light pink */
  background-color: #fff5f5;
  border-radius: 5px;
  border: 1px solid black;
  padding: 6px 12px;

  font-size: 16px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 20px;
`;
const SearchResultsContainer = styled.div`
  padding: 4px 16px;
  border: 1px solid black;
  /* juicy green */
  background-color: #bbeb64;

  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  overflow-y: auto;
  max-height: 60vh;
  min-height: 40px;
`;

type TProps = {|
  // onAppendVimrcContent: (TNewText) => void,
  +vimCommands: TVimCommands,
  +handleRowClick: (commandName: string) => void
|};

type TState = {|
  +searchText: string
|};

class LeftHalf extends React.Component<TProps, TState> {
  state = {
    searchText: ''
  };

  // filter out and stop showing search results that do not match
  handleSearchInput = (e: SyntheticInputEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    this.setState({
      searchText: searchText.toLowerCase()
    });
  };

  buildRows = () => {
    const { vimCommands } = this.props;
    return Object.keys(vimCommands).reduce((acc, commandName: string) => {
      if (commandName.toLowerCase().includes(this.state.searchText)) {
        acc.push(
          <SearchResult
            active={vimCommands[commandName].active}
            onClick={() => this.props.handleRowClick(commandName)}
            command={commandName}
            description={vimCommands[commandName].description}
            key={commandName}
          />
        );
      }
      return acc;
    }, []);
  };

  render() {
    return (
      <LeftHalfWrapper>
        <SectionHeader>Select Features Here</SectionHeader>

        <SearchInput placeholder="Search" onChange={this.handleSearchInput} />
        <SearchResultsContainer>{this.buildRows()}</SearchResultsContainer>
      </LeftHalfWrapper>
    );
  }
}

export default LeftHalf;
