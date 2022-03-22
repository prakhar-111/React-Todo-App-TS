import "./App.css";
import { TodoBox } from "./components/todobox";
import * as React from "react";
import { TodoContext } from "./utils/todoprovider";

type todoType = {
  id: number, 
  value:string, 
  isCompleted: boolean
}

function App() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos, activeTodos, setActiveTodos]: [todoType[],Function,number, Function] = React.useContext(TodoContext);
  if (!localStorage.getItem("todoState")) {
    localStorage.setItem("todoState", "all");
  }
  const [todoState, setTodostate] = React.useState(() => {
    const initialState:string = localStorage.getItem("todoState");
    return initialState;
  });
  React.useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);
  React.useEffect(() => {
    localStorage.setItem("todoState", todoState);
  }, [todoState]);
  React.useEffect(() => {
    localStorage.setItem("activeTodos", JSON.stringify(activeTodos));
  }, [activeTodos]);

  return (
    <div className="App">
      <h1>todos</h1>
      <TodoBox todoState={todoState} setTodoState={setTodostate}></TodoBox>
    </div>
  );
}

export { App };
