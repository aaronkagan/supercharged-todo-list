import { useState, useEffect } from 'react';
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

  interface TodoItem {
    id: number;
    title: string;
    isCompleted: boolean;
  }

  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<TodoItem[]>(
    localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos')!)
      : []
  );

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')!); // the "! says that the result from local storage will not be null"
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (todo.length) {
      setTodos([...todos, { title: todo, id: Date.now(), isCompleted: false }]);
      setTodo('');
    }
  };

  const handleDelete = (id: number): void => {
    setTodos(
      todos.filter((todo) => {
        return id !== todo.id;
      })
    );
  };

  const handleToggleDone = (id: number) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id
          ? // If todo has matching id it copies the todo object and changes only the isCompleted property
            { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      })
    );
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
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <button className="submit"></button>
            <input
              className="text-input"
              type="text"
              placeholder="Create a new todo..."
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
          </form>

          {todos.length ? (
            <ul>
              {todos.map((elem) => {
                return (
                  <li key={JSON.stringify(elem.id)}>
                    <span
                      style={
                        elem.isCompleted
                          ? { textDecoration: 'line-through' }
                          : {}
                      }
                    >
                      {elem.title}
                    </span>
                    <button onClick={() => handleToggleDone(elem.id)}>
                      Toggle Done
                    </button>
                    <button onClick={() => handleDelete(elem.id)}>
                      Delete Todo
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : null}
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
