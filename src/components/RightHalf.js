import React from 'react';
import styled from 'styled-components';

import {CopyToClipboard} from 'react-copy-to-clipboard';

import SectionHeader from './SectionHeader';
import clipboadIconPath from '../ionicons/clipboard.svg';
import arrowRightIconPath from '../ionicons/arrow-right-a.svg';

const RightHalfWrapper = styled.div`
  width: 60%;
  margin-right: 30px;
`;

const VimrcContainer = styled.div`
  min-height: 300px;
  font-family: "Hack", monospace;
  font-size: 16px;

  border: 1px solid black;
  /* juicy green */
  background-color: #BBEB64;

  box-shadow: 0px 4px 4px rgba(0,0,0,.3);
  border-radius: 5px;
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
  border-top: 1px solid black;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  padding: 4px 8px;
  cursor: pointer;
  transition: box-shadow 300ms ease;

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

const Command = styled.div`
`;

const Comment = styled.span`
  color: grey;
`;

class RightHalf extends React.Component {
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

  render() {
    const {textContentArr} = this.props;
    const {copyClicked} = this.state;
    const copyButtonText = copyClicked ?
      'Paste and enjoy!' :
      'Copy to clipboard';
    return (
      <RightHalfWrapper>
        <SectionHeader>
          Copy .vimrc from here
        </SectionHeader>
        <VimrcContainer>
          {/* vimrc file content */}
          <FileContent>
            {textContentArr.map(([text, comment], i) => (<Command key={i}>{text} <Comment>" {comment}</Comment></Command>))}
          </FileContent>

          <CopyToClipboard
            text={textContentArr.reduce((acc, curr) => `${acc}\n${curr}`, '')}
            onCopy={this.handleCopyClick}>
            <IconWrapperButton style={{
              backgroundColor: copyClicked ? 'black' : '#fff5f5'
            }}>
              <CopyText style={{
                color: copyClicked ? '#fff5f5' : 'black'
              }}>{copyButtonText}</CopyText>
              <img
                alt="right arrow"
                src={arrowRightIconPath}
                height="26px"
                style={{marginLeft: '10px'}}/>
              <img alt="clipboard" src={clipboadIconPath} height="26px" />
            </IconWrapperButton>
          </CopyToClipboard>
        </VimrcContainer>
      </RightHalfWrapper>
    );
  }
}

export default RightHalf;
