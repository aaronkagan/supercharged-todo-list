import { useState, useEffect, useRef } from 'react';
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
  const [theme, setTheme] = useState<string | null>('dark');

  const activeFilter = useRef<string>('all');
  const filterAllRef = useRef<HTMLElement>(null);
  const filterActiveRef = useRef<HTMLElement>(null);
  const filterCompletedRef = useRef<HTMLElement>(null);
  const filterAllRefDesktop = useRef<HTMLElement>(null);
  const filterActiveRefDesktop = useRef<HTMLElement>(null);
  const filterCompletedRefDesktop = useRef<HTMLElement>(null);
  const filterRefs = [filterAllRef, filterActiveRef, filterCompletedRef];
  const filterRefsDesktop = [
    filterAllRefDesktop,
    filterActiveRefDesktop,
    filterCompletedRefDesktop
  ];

  const handleResetFilterLinks = () => {
    filterRefs.forEach((filterRef) => {
      if (filterRef.current !== null) {
        filterRef.current.classList.remove('active-filter-link');
      }
    });
    filterRefsDesktop.forEach((filterRef) => {
      if (filterRef.current !== null) {
        filterRef.current.classList.remove('active-filter-link');
      }
    });
  };

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
    handleActiveFilter();
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')!); // the "! says that the result from local storage will not be null"
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    handleActiveFilter();
  }, [todos]);

  const handleActiveFilter = () => {
    handleResetFilterLinks();
    if (activeFilter.current === 'all') {
      setFilteredTodos(todos);
      if (filterAllRef.current !== null) {
        filterAllRef.current.classList.add('active-filter-link');
      }
      if (filterAllRefDesktop.current !== null) {
        filterAllRefDesktop.current.classList.add('active-filter-link');
      }
    }
    if (activeFilter.current === 'active') {
      setFilteredTodos(todos.filter((elem) => !elem.isCompleted));
      if (filterActiveRef.current !== null) {
        filterActiveRef.current.classList.add('active-filter-link');
      }
      if (filterActiveRefDesktop.current !== null) {
        filterActiveRefDesktop.current.classList.add('active-filter-link');
      }
    }
    if (activeFilter.current === 'completed') {
      setFilteredTodos(todos.filter((elem) => elem.isCompleted));
      if (filterCompletedRef.current !== null) {
        filterCompletedRef.current.classList.add('active-filter-link');
      }
      if (filterCompletedRefDesktop.current !== null) {
        filterCompletedRefDesktop.current.classList.add('active-filter-link');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (todo.length) {
      setTodos([...todos, { title: todo, id: Date.now(), isCompleted: false }]);
      setTodo('');
    }
  };

  const handleDelete = (
    id: number,
    e: React.MouseEvent<HTMLImageElement>
  ): void => {
    e.currentTarget.parentElement?.classList.add('fall');
    document.addEventListener('transitionend', () => {
      setTodos(
        todos.filter((todo) => {
          return id !== todo.id;
        })
      );
    });
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

  // Drag and Drop

  const dragItemIndex = useRef<number | null>(null);
  const dragOverItemIndex = useRef<number | null>(null);

  const handleDragSort = () => {
    // Fixing splice type error. Splice won't accept a parameter of type <number | null>
    if (dragItemIndex.current === null || dragOverItemIndex.current === null)
      return;

    // Doing this to not accidentally mutate original array
    const copiedItems = [...todos];
    // Splice returns an array but we need a string hence the [0] to grab the only item in the array
    const draggedItemContent = copiedItems.splice(dragItemIndex.current, 1)[0];
    copiedItems.splice(dragOverItemIndex.current, 0, draggedItemContent);

    // Retting the refs
    dragItemIndex.current = null;
    dragOverItemIndex.current = null;

    setTodos(copiedItems);
  };

  const handleDragStart = (index: number) => (dragItemIndex.current = index);
  const handleDragEnter = (index: number) =>
    (dragOverItemIndex.current = index);

  //

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
                className="logo"
                src={Logo}
                alt="Todo Logo"
              />
            </a>
            <img
              className="moon-sun"
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
              {filteredTodos.map((elem, index) => {
                return (
                  <StyledTodoItem
                    id="todo-item"
                    key={JSON.stringify(elem.id)}
                    draggable
                    onDragStart={() => {
                      handleDragStart(index);
                    }}
                    onDragEnter={() => {
                      handleDragEnter(index);
                    }}
                    onDragEnd={() => {
                      handleDragSort();
                    }}
                    // To prevent the item from ghosting back to original position before switching
                    onDragOver={(e) => e.preventDefault()}
                  >
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
                      onClick={(e) => handleDelete(elem.id, e)}
                    />
                  </StyledTodoItem>
                );
              })}
            </StyledTodoList>
          ) : null}
          <div className="todoListBottom">
            <span>
              {todos.filter((elem) => !elem.isCompleted).length} items left
            </span>
            <StyledFilterBarDesktop>
              <span
                ref={filterAllRefDesktop}
                onClick={() => {
                  activeFilter.current = 'all';
                  handleActiveFilter();
                }}
              >
                All
              </span>
              <span
                ref={filterActiveRefDesktop}
                onClick={() => {
                  activeFilter.current = 'active';
                  handleActiveFilter();
                }}
              >
                Active
              </span>
              <span
                ref={filterCompletedRefDesktop}
                onClick={() => {
                  activeFilter.current = 'completed';
                  handleActiveFilter();
                }}
              >
                Completed
              </span>
            </StyledFilterBarDesktop>
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
          <StyledFilterBar>
            <span
              ref={filterAllRef}
              onClick={() => {
                activeFilter.current = 'all';
                handleActiveFilter();
              }}
            >
              All
            </span>
            <span
              ref={filterActiveRef}
              onClick={() => {
                activeFilter.current = 'active';
                handleActiveFilter();
              }}
            >
              Active
            </span>
            <span
              ref={filterCompletedRef}
              onClick={() => {
                activeFilter.current = 'completed';
                handleActiveFilter();
              }}
            >
              Completed
            </span>
          </StyledFilterBar>
          <p className="drag-text">Drag and drop to reorder list</p>
        </div>
      </StyledMain>
    </ThemeProvider>
  );
}

const StyledHeader = styled.header`
  min-height: 20rem;
  background-image: url(${(props) => props.theme.backgroundImageMobile});
  background-size: cover;
  .wrapper {
    max-width: 32.7rem;
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

  .logo {
    width: 10.8rem;
  }

  .moon-sun {
    width: 2rem;
    height: 2rem;
  }

  @media all and (min-width: 1000px) {
    background-image: url(${(props) => props.theme.backgroundImageDesktop});
    min-height: 30rem;

    .wrapper {
      max-width: 54rem;
    }

    .container {
      padding-top: 7rem;
    }

    .logo {
      width: 16.7rem;
    }

    .moon-sun {
      width: 2.6rem;
      height: 2.6rem;
    }
  }
`;

const StyledMain = styled.main`
  transform: translateY(-10rem);

  .wrapper {
    max-width: 32.7rem;
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
    margin-bottom: 1.6rem;

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

  .drag-text {
    color: ${(props) => props.theme.todoListBottomColor};
    font-size: 1.4rem;
    letter-spacing: -0.194px;
    text-align: center;
    margin-top: 4rem;
  }

  .todoListBottom {
    color: ${(props) => props.theme.todoBottomColor};
    color: ${(props) => props.theme.todoListBottomColor};
    background-color: ${(props) => props.theme.todoBg};
    border-radius: 0 0 0.5rem 0.5rem;

    padding: 2rem;
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    letter-spacing: -0.167px;

    .clear-completed {
      cursor: pointer;
    }
  }

  @media all and (min-width: 1000px) {
    transform: translateY(-13rem);

    .wrapper {
      max-width: 54rem;
    }

    .form {
      gap: 2.4rem;
      padding: 0.1rem 2.4rem;

      .submit {
        width: 2.4rem;
        height: 2.4rem;
      }

      .text-input {
        font-size: 1.8rem;
        letter-spacing: -0.25px;
      }

      .text-input::placeholder {
        font-size: 1.8rem;
        letter-spacing: -0.25px;
      }
    }

    .todoListBottom {
      font-size: 1.4rem;
      letter-spacing: -0.194px;
      padding: 2rem 2.4rem;

      .clear-completed {
        margin-left: -3.5rem;
      }
    }
  }
`;

const StyledTodoList = styled.ul`
  .fall {
    transform: translateY(10rem);
    transition: all 0.5s;
    opacity: 0;
  }
  list-style-type: none;
  /* margin-top: 1.6rem; */
  border-radius: 0.5rem 0.5rem 0 0;
  background-color: ${(props) => props.theme.todoBg};
  box-shadow: ${(props) => props.theme.todoListBoxShadow};
  color: ${(props) => props.theme.todoColor};
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

  @media all and (min-width: 1000px) {
    padding-top: 2rem;
    padding-bottom: 2rem;

    .container {
      gap: 2.4rem;
    }

    .mark-checked {
      width: 2.4rem;
      height: 2.4rem;
      img {
        width: 11px;
      }
    }

    span {
      font-size: 1.8rem;
      letter-spacing: -0.25px;
    }

    img {
      width: 1.8rem;
    }
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

  @media all and (min-width: 1000px) {
    display: none;
  }
`;

const StyledFilterBarDesktop = styled(StyledFilterBar)`
  margin-top: 0;
  padding: 0;
  display: none;

  @media all and (min-width: 1000px) {
    display: flex;
  }
`;

export default App;
