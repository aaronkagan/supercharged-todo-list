import { useState } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyles';
import Moon from './assets/images/icon-moon.svg';
import Logo from './assets/images/logo.svg';
import Check from './assets/images/icon-check.svg';
import Sun from './assets/images/icon-sun.svg';
import { lightTheme, darkTheme } from './Theme.ts';

function App() {
  const [theme, setTheme] = useState('light');

  const handleToggleTheme = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyle />
      <StyledHeader>
        <div className="wrapper">
          <div className="container">
            <a
              href="#"
              className="logo"
            >
              <img
                src={Logo}
                alt="Todo Logo"
              />
            </a>
            <img
              role="button"
              onClick={handleToggleTheme}
              src={theme === 'light' ? Moon : Sun}
              alt="Moon Icon"
            />
          </div>
        </div>
      </StyledHeader>

      <StyledMain>
        <div className="wrapper">
          <form className="form">
            <button className="submit"></button>
            <input
              className="text-input"
              type="text"
              placeholder="Create a new todo..."
            />
          </form>
        </div>
      </StyledMain>
    </ThemeProvider>
  );
}

const StyledHeader = styled.header`
  min-height: 20rem;
  background-image: url(${(props) => props.theme.backgroundImage});
  background-size: cover;
  .wrapper {
    width: 85%;
    max-width: 54rem;
    margin: 0 auto;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 4.8rem;
  }
`;

const StyledMain = styled.main`
  transform: translateY(-9.3rem);

  .wrapper {
    width: 85%;
    max-width: 54rem;
    margin: 0 auto;
  }
  .form {
    width: 100%;
    background-color: ${(props) => props.theme.todoBg};
    display: flex;
    align-items: center;
    gap: 1.2rem;
    border-radius: 0.6rem;
    font-size: 1.2rem;
    padding: 2rem 1.4rem;

    .text-input {
      outline: none;
      border: none;
      background-color: inherit;
      color: ${(props) => props.theme.todoColor};
    }

    .text-input::placeholder {
      font-size: 1.2rem;
      letter-spacing: -0.167px;
      color: ${(props) => props.theme.todoPlaceholderColor};
    }

    .submit {
      width: 2rem;
      height: 2rem;
      background: none;
      border-radius: 50%;
      border: 1px solid ${(props) => props.theme.checkCircle};
    }
  }
`;

export default App;
