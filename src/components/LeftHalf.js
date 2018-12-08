// @flow
import React from 'react';
import styled from 'styled-components';

import SearchResult from './SearchResult';
import SectionHeader from './SectionHeader';

import type {TNewText} from '../App';

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
  background-color: #BBEB64;


  box-shadow: 0px 6px 6px rgba(0,0,0,.4);
  border-radius: 5px;
  overflow-y: auto;
  max-height: 60vh;
  min-height: 40px;
`;

type TProps = {|
  onAppendVimrcContent: (TNewText) => void,
  vimCommands: Object,
|}

type TState = {
  +[index: string]: {|
    +active: boolean,
    +visible: boolean,
    +command: string,
    +description: string,
  |}
}

class LeftHalf extends React.Component<TProps, TState> {

  constructor(props:TProps) {
    super();
    const newState = {};
    // keys are the index, values are an object with 4 fields:
    // active, visible, command, and description
    const {vimCommands} = props;
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
  handleSearchResultClick(i: number) {
    const isActive = this.state[i.toString()].active;
    // only append text on enable
    if (!isActive) {
      this.props.onAppendVimrcContent([this.state[i.toString()].command, this.state[i.toString()].description]);
    }

    // highlight in green
    this.setState({
      [i]: {
        ...this.state[i.toString()],
        active: !this.state[i.toString()].active,
      }
    });

  }

  // filter out and stop showing search results that do not match
  handleSearchInput = (e:SyntheticInputEvent<HTMLInputElement>) => {
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
    const SearchResults = this.props.vimCommands.map((command, i) => {
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
          placeholder="Search"
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
