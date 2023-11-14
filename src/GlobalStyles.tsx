import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Josefin Sans', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  input {
    font: inherit;
  }
  input::placeholder {
    font: inherit;
  }

  body {
    background-color: ${(props) => props.theme.bgColor};
  }



`;

export default GlobalStyle;
