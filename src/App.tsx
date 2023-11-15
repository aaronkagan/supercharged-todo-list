import { useState, useEffect, useRef, RefObject } from 'react';
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
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('theme')) setTheme(localStorage.getItem('theme'));
  }, []);

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

  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

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

  const filterRef1 = useRef<HTMLElement>(null);
  const filterRef2 = useRef<HTMLElement>(null);
  const filterRef3 = useRef<HTMLElement>(null);
  const filterRefs = [filterRef1, filterRef2, filterRef3];

  const handleFilterClick = (ref: RefObject<HTMLElement>) => {
    if (ref !== null && ref.current !== null) {
      filterRefs.forEach((filterRef) => {
        if (filterRef.current !== null) {
          filterRef.current.classList.remove('active-filter-link');
        }
      });
      ref.current.classList.add('active-filter-link');
    }
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

          {filteredTodos.length ? (
            <StyledTodoList>
              {filteredTodos.map((elem) => {
                return (
                  <StyledTodoItem key={JSON.stringify(elem.id)}>
                    <div className="container">
                      <div
                        className="mark-checked"
                        role="checkbox"
                        onClick={() => handleToggleDone(elem.id)}
                        style={{
                          background: `${
                            elem.isCompleted
                              ? 'linear-gradient(135deg, #55ddff, #c058f3)'
                              : 'none'
                          }`
                        }}
                      >
                        <img
                          style={{
                            display: `${elem.isCompleted ? 'block' : 'none'}`,
                            background: `${
                              elem.isCompleted
                                ? 'linear-gradient(135deg, #55ddff, #c058f3)'
                                : 'none'
                            }`
                          }}
                          src={Check}
                          alt=""
                        />
                      </div>
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
            <span
              ref={filterRef1}
              onClick={() => {
                handleFilterClick(filterRef1);
                setFilteredTodos(todos);
              }}
            >
              All
            </span>
            <span
              ref={filterRef2}
              onClick={() => {
                handleFilterClick(filterRef2);
                setFilteredTodos(todos.filter((elem) => !elem.isCompleted));
              }}
            >
              Active
            </span>
            <span
              ref={filterRef3}
              onClick={() => {
                handleFilterClick(filterRef3);
                setFilteredTodos(todos.filter((elem) => elem.isCompleted));
              }}
            >
              Completed
            </span>
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
      padding: 2.2rem 0;
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
  border-bottom: 1px solid ${(props) => props.theme.todoItemBorder};

  .container {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }

  .mark-checked {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    border: 1px solid ${(props) => props.theme.checkCircle};
    cursor: pointer;
    display: grid;
    place-items: center;

    img {
      width: 7.25px;
    }
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
  .active-filter-link {
    color: #3a7cfd;
  }

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
