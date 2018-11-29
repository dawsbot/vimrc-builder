// @flow
import React from 'react';
import styled from 'styled-components';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import SectionHeader from './SectionHeader';
import clipboadIconPath from '../ionicons/clipboard.svg';
import arrowRightIconPath from '../ionicons/arrow-right-a.svg';

import type {TNewText} from '../App';

const RightHalfWrapper = styled.div`
  margin-right: 30px;
  width: 100%;
  @media (max-width: 900px) {
    margin-top: 50px;
  }
`;

const VimrcContainer = styled.div`
  min-height: 300px;
  font-family: monospace;
  font-size: 16px;

  /* border on all edges but bottom */
  border: 1px solid black;
  border-bottom: 0;

  /* juicy green */
  background-color: #BBEB64;

  box-shadow: 0px 4px 4px rgba(0,0,0,.3);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  overflow-y: auto;
  max-height: 60vh;
  min-height: 40px;
`;

const CopyText = styled.span`
  font-size: 20px;
`;

const IconWrapperButton = styled.button`
  /* light pink */
  background-color: #fff5f5;
  border-radius: 5px;
  width: 100%;
  border: 0px;
  border: 1px solid black;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  padding: 4px 8px;
  cursor: pointer;
  transition: box-shadow 300ms ease;
  transition: background-color 500ms ease;

  display: flex;
  justify-content: center;

  :hover {
    box-shadow: 0px 4px 4px rgba(0,0,0,.3);
  }
`;

const FileContent = styled.div`
  padding: 30px 20px;
  min-height: 70px;

`;

const Comment = styled.span`
  color: grey;
`;

type TProps = {|
  +textContentArr: Array<TNewText>
|}

type TState = {|
  +copyClicked: boolean
|}

class RightHalf extends React.Component<TProps, TState> {
  constructor() {
    super();
    this.state = {
      copyClicked: false
    }
  }

  handleCopyClick = () => {
    this.setState({
      copyClicked: true,
    });
  }
  componentWillReceiveProps = () => {
    this.setState({
      copyClicked: false,
    });
  }

  // what shows on the right side of the page
  buildViewableTextContent = ([text, comment]:TNewText, i: number) => (<div key={i}>{text} <Comment>" {comment}</Comment></div>)

  // what is actually placed on the clipboard
  buildCopyableTextContent = (acc:string, [command, comment]: TNewText) => `${acc}\n${command} " ${comment}`;

  render() {
    const {textContentArr} = this.props;
    const {copyClicked} = this.state;
    const copyButtonText = copyClicked ?
      'Paste and enjoy!' :
      'Copy to clipboard';
    const initialVimrcContent = '" Customizations for the vim editor. Read more at http://vimrc-builder.now.sh\n';

    return (
      <RightHalfWrapper>
        <SectionHeader>
          Copy .vimrc from here
        </SectionHeader>
        <VimrcContainer>
          {/* vimrc file content */}
          <FileContent>
            {textContentArr.map(this.buildViewableTextContent)}
          </FileContent>
        </VimrcContainer>
        <CopyToClipboard
          text={textContentArr.reduce(this.buildCopyableTextContent, initialVimrcContent)}
          onCopy={this.handleCopyClick}>
          <IconWrapperButton style={{
            backgroundColor: copyClicked ? 'black' : '#fff5f5'
          }}>
            <CopyText style={{
              color: copyClicked ? '#fff5f5' : 'black'
            }}>{copyButtonText}</CopyText>
            {!this.state.copyClicked && (
              <div>
                <img
                  alt="right arrow"
                  src={arrowRightIconPath}
                  height="26px"
                  style={{marginLeft: '10px'}}/>
                <img alt="clipboard" src={clipboadIconPath} height="26px" />
              </div>
            )}
          </IconWrapperButton>
        </CopyToClipboard>
      </RightHalfWrapper>
    );
  }
}

export default RightHalf;
