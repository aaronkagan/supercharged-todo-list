import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
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
    font-weight: 400;
    font-family: 'Josefin Sans', sans-serif;
    font-size: 1.2rem;
  }



`;

export default GlobalStyle;
