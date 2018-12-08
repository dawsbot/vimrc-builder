// @flow
import React from 'react';
import styled from 'styled-components';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import SectionHeader from './SectionHeader';
import clipboadIconPath from '../ionicons/clipboard.svg';
import arrowRightIconPath from '../ionicons/arrow-right-a.svg';

import type { TVimCommands } from '../App';

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
  background-color: #bbeb64;

  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
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
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
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
  +vimCommands: TVimCommands
|};

type TState = {|
  +copyClicked: boolean
|};

class RightHalf extends React.Component<TProps, TState> {
  constructor() {
    super();
    this.state = {
      copyClicked: false
    };
  }

  handleCopyClick = () => {
    this.setState({
      copyClicked: true
    });
  };
  componentWillReceiveProps = () => {
    this.setState({
      copyClicked: false
    });
  };

  buildViewableTextContent = (): Array<any> => {
    const { vimCommands } = this.props;
    let viewableText = [];
    Object.keys(vimCommands).map(command => {
      if (vimCommands[command].active) {
        viewableText.push(
          <div key={command}>
            {command} <Comment>" {vimCommands[command].description}</Comment>
          </div>
        );
      }
    });
    return viewableText;
  };

  // what is actually placed on the clipboard
  buildCopyableTextContent = (): string => {
    const { vimCommands } = this.props;
    let copyableText =
      '" >_ Customizations for the vim editor. Read more at https://github.com/dawsbot/vimrc-builder\n';
    Object.keys(vimCommands).map(command => {
      if (vimCommands[command].active) {
        copyableText += `\n${command} " ${vimCommands[command].description}`;
      }
    });
    return copyableText;
  };

  render() {
    const { copyClicked } = this.state;
    const copyButtonText = copyClicked
      ? 'Paste and enjoy!'
      : 'Copy to clipboard';

    return (
      <RightHalfWrapper>
        <SectionHeader>Copy .vimrc from here</SectionHeader>
        <VimrcContainer>
          {/* vimrc file content */}
          <FileContent>{this.buildViewableTextContent()}</FileContent>
        </VimrcContainer>
        <CopyToClipboard
          text={this.buildCopyableTextContent()}
          onCopy={this.handleCopyClick}
        >
          <IconWrapperButton
            style={{
              backgroundColor: copyClicked ? 'black' : '#fff5f5'
            }}
          >
            <CopyText
              style={{
                color: copyClicked ? '#fff5f5' : 'black'
              }}
            >
              {copyButtonText}
            </CopyText>
            {!this.state.copyClicked && (
              <div>
                <img
                  alt="right arrow"
                  src={arrowRightIconPath}
                  height="26px"
                  style={{ marginLeft: '10px' }}
                />
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
