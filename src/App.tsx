import styled from 'styled-components';
import GlobalStyle from './GlobalStyles';

import Moon from './assets/images/icon-moon.svg';
import Logo from './assets/images/logo.svg';
import Check from './assets/images/icon-check.svg';

function App() {
  return (
    <>
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
              src={Moon}
              alt="Moon Icon"
            />
          </div>
        </div>
      </StyledHeader>

      <StyledMain>
        <div className="wrapper">
          <div className="input-container">
            <input
              type="checkbox"
              className="checkbox"
            />
            <input
              className="text-input"
              type="text"
              placeholder="Create a new todo..."
            />
          </div>
        </div>
      </StyledMain>
    </>
  );
}

const StyledHeader = styled.header`
  min-height: 20rem;
  background-image: url('src/assets/images/bg-mobile-light.jpg');
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
  .input-container {
    width: 100%;
    background-color: white;
    display: flex;
    align-items: center;
    gap: 2.4rem;
    border-radius: 0.6rem;
    font-size: 1.2rem;
    padding: 2rem 1.4rem;

    .text-input {
      outline: none;
      border: none;
    }

    .text-input::placeholder {
      font-size: 1.2rem;
    }

    .checkbox {
      /* visibility: hidden; */
    }
  }
`;

export default App;
