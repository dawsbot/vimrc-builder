import React from 'react';
import styled from 'styled-components';

const ResultRow = styled.div`

  margin: 8px 0px;
  padding: 10px 20px;
  /* near-black pink */
  border: 1px solid #1f0200;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  transition: box-shadow 300ms ease;
  transition: background-color 1000ms ease;

  /* light pink */
  background-color: #fff5f5;

  :hover {
    box-shadow: 0px 4px 4px rgba(0,0,0,.3);
  }
`
const Description = styled.summary`
  font-size: 14px;
  margin: 0px;
`;

const SearchResult = (props) => (
  <ResultRow
    style={{
      backgroundColor: props.active && '#1f0200',
      color: props.active ? '#fff5f5' : '#1f0200',
      boxShadow: props.active && '0px 4px 4px rgba(0,0,0,.3)'
    }}
    onClick={props.onClick}>

    <div>
      <strong>{props.command}</strong>
      <br/>
      <Description>
        {props.description}
      </Description>
    </div>
  </ResultRow>
);

export default SearchResult;
