import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyles';
import Moon from './assets/images/icon-moon.svg';
import Logo from './assets/images/logo.svg';
import Check from './assets/images/icon-check.svg';
import Cross from './assets/images/icon-cross.svg';
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
            <StyledTodoList>
              {todos.map((elem) => {
                return (
                  <StyledTodoItem key={JSON.stringify(elem.id)}>
                    <div className="container">
                      <div
                        className="mark-checked"
                        role="checkbox"
                        onClick={() => handleToggleDone(elem.id)}
                      />
                      <span
                        onClick={() => handleToggleDone(elem.id)}
                        style={
                          elem.isCompleted
                            ? { textDecoration: 'line-through' }
                            : {}
                        }
                      >
                        {elem.title}
                      </span>
                    </div>

                    <img
                      src={Cross}
                      role="button"
                      onClick={() => handleDelete(elem.id)}
                    />
                  </StyledTodoItem>
                );
              })}
              <div className="todoListBottom">
                <span>
                  {todos.filter((elem) => !elem.isCompleted).length} items left
                </span>
                <span
                  className="clear-completed"
                  onClick={() =>
                    setTodos((prevTodos) =>
                      prevTodos.filter((elem) => !elem.isCompleted)
                    )
                  }
                >
                  Clear Completed
                </span>
              </div>
            </StyledTodoList>
          ) : null}
          <StyledFilterBar>
            <span>All</span>
            <span>Active</span>
            <span>Completed</span>
          </StyledFilterBar>
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

  img {
    cursor: pointer;
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
    padding: 0rem 2rem;

    .submit {
      cursor: pointer;
      width: 2rem;
      height: 2rem;
      background: none;
      border-radius: 50%;
      border: 1px solid ${(props) => props.theme.checkCircle};
    }

    .text-input {
      outline: none;
      border: none;
      background-color: inherit;
      color: ${(props) => props.theme.todoColor};
      width: 90%;
      padding: 2.4rem 0;
    }

    .text-input::placeholder {
      font-size: 1.2rem;
      letter-spacing: -0.167px;
      color: ${(props) => props.theme.todoPlaceholderColor};
    }
  }
`;

const StyledTodoList = styled.ul`
  list-style-type: none;
  margin-top: 1.6rem;
  border-radius: 0.5rem;
  background-color: ${(props) => props.theme.todoBg};
  box-shadow: ${(props) => props.theme.todoListBoxShadow};
  color: ${(props) => props.theme.todoColor};

  .todoListBottom {
    color: ${(props) => props.theme.todoBottomColor};
    color: ${(props) => props.theme.todoListBottomColor};

    padding: 1.6rem 2rem;
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    letter-spacing: -0.167px;

    .clear-completed {
      cursor: pointer;
    }
  }
`;

const StyledTodoItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 2rem;

  .container {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .mark-checked {
    width: 2rem;
    height: 2rem;
    background: none;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.checkCircle};
    cursor: pointer;
  }

  span {
    cursor: pointer;
  }

  img {
    cursor: pointer;
    width: 1.2rem;
  }
`;

const StyledFilterBar = styled.div`
  padding: 1.7rem;
  background-color: ${(props) => props.theme.todoBg};
  box-shadow: ${(props) => props.theme.todoListBoxShadow};
  color: ${(props) => props.theme.todoListBottomColor};
  display: flex;
  border-radius: 0.5rem;
  margin-top: 1.6rem;
  display: flex;
  justify-content: center;
  gap: 1.9rem;
  font-size: 1.4rem;
  letter-spacing: -0.194px;

  span {
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.todoColor};
    }
  }
`;

export default App;
