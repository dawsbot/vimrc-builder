import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  /* light pink */
  background-color: #fff5f5;
  /* near-black pink */
  color: 1px solid #1f0200;
  padding: 100px;
`
const StaticPageContent = () => (
  <Wrapper>
    <h1>FAQ</h1>

    <h2>What is a vimrc file?</h2>
    <p>
      A vimrc file is how to customize the <a href="http://www.vim.org/">vim editor</a>.
      It allows vim to do things like syntax highlight, have custom keyboard shortcuts, and infinite other options.
    </p>

    <h2>How do I use this?</h2>
    <p>
      On the left side of the screen, you can select commands for vim to interpret.
      The app will place the proper code on the right side of the screen. Copy this page content and place it in <code>~/.vimrc</code>.
      If that file does not yet exist, you can create it and vim will read it before loading file content each time vim is used.
    </p>

    <h2>Who built this and why?</h2>
    <p>
      This started as a project to make vimrc files easier. It was also a proving ground to learn web app practices back in 2015. It is created and maintained by <a href="https://github.com/dawsbot">dawsbot</a> and now boasts technologies like <a href="https://www.styled-components.com/">Styled Components</a>, <a href="https://github.com/facebookincubator/create-react-app">Create React App</a>, and <a href="https://zeit.co/now">Now js</a>!
    </p>

  </Wrapper>
);

export default StaticPageContent;
