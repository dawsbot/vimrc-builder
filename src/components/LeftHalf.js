import React from 'react';
import styled from 'styled-components';

import SearchResult from './SearchResult';
import vimCommands from '../vim-commands.json';
import SectionHeader from './SectionHeader';

const LeftHalfWrapper = styled.div`
  width: 40%;
  min-width: 400px;
  margin-right: 30px;
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
  background-color: #BBEB64;


  box-shadow: 0px 6px 6px rgba(0,0,0,.4);
  border-radius: 5px;
  overflow-y: auto;
  max-height: 60vh;
  min-height: 40px;
`;

class LeftHalf extends React.Component {

  constructor() {
    super();
    const newState = {};
    // keys are the index, values are an object with 4 fields:
    // active, visible, command, and description
    vimCommands.forEach((_, i) => {
      newState[i] = {
        active: false,
        visible: true,
        ...vimCommands[i],
      }
    });
    this.state = newState;
  }

  // reverse active state
  handleSearchResultClick(i) {
    const isActive = this.state[i].active;
    // only append text on enable
    if (!isActive) {
      this.props.onAppendVimrcContent([this.state[i].command, this.state[i].description]);
    }

    // highlight in green
    this.setState({
      [i]: {
        ...this.state[i],
        active: !this.state[i].active,
      }
    });

  }

  // filter out and stop showing search results that do not match
  handleSearchInput = (e) => {
    const searchText = e.target.value;
    Object.keys(this.state).forEach((i) => {
      if (
        this.state[i].command.includes(searchText) ||
        this.state[i].description.includes(searchText)
      ) {
        this.setState({
          [i]: {
            ...this.state[i],
            visible: true,
          }
        });
      } else {
        this.setState({
          [i]: {
            ...this.state[i],
            visible: false,
          }
        });
      }
    })
  }

  render() {
    const SearchResults = vimCommands.map((command, i) => {
      // only return those marked as visible
      if (this.state[i].visible) {
        return (
          <SearchResult
            {...command}
            active={this.state[i].active}
            onClick={() => this.handleSearchResultClick(i)}
            key={i}
          />
        );
      }
      return null;
    });

    return (
      <LeftHalfWrapper>
        <SectionHeader>
          Select Features Here
        </SectionHeader>

        <SearchInput
          placeholder="Search here"
          onChange={this.handleSearchInput}
          />
        <SearchResultsContainer>
          {SearchResults}
        </SearchResultsContainer>
      </LeftHalfWrapper>
    );
  }

}

export default LeftHalf;
