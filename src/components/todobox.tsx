import * as React from "react";
import "../App.css";
import { TodoInput } from "./todoInput";
import { Todo } from "./todo";
import { TodoContext } from "../utils/todoprovider";

type TodoBoxProps = {
  todoState: string,
  setTodoState : Function
}

type todoType = {
  id: number, 
  value:string, 
  isCompleted: boolean
}

function TodoBox({ todoState , setTodoState }: TodoBoxProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos, activeTodos, setActiveTodos]: [todoType[],Function,number, Function]  = React.useContext(TodoContext);
  // console.log(todos);
  function handleState(event:React.MouseEvent, state: string) {
    event.preventDefault();
    setTodoState(state);
  }
  function clearCompleted(event: React.MouseEvent) {
    event.preventDefault();
    let modifiedTodos: todoType[] = todos.filter(
      (element:todoType) => element.isCompleted === false
    );
    setTodos(modifiedTodos);
  }
  if(todos.length === 0){
    return (<div className="box">
      <TodoInput/>
    </div>)
  }
  return (
    <div className="box">
      <TodoInput />
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} todoState={todoState} />
      ))}
      <footer>
        <span className="totalTodos">{`${activeTodos} items left`}</span>
        <div className="todoType">
          <button
            className={todoState === "all" ? "filters highlight" : "filters"}
            id="all"
            onClick={(event) => handleState(event, "all")}
          >
            All
          </button>
          <button
            className={todoState === "active" ? "filters highlight" : "filters"}
            id="active"
            onClick={(event) => handleState(event, "active")}
          >
            Active
          </button>
          <button
            className={
              todoState === "completed" ? "filters highlight" : "filters"
            }
            id="completed"
            onClick={(event) => handleState(event, "completed")}
          >
            Completed
          </button>
        </div>
        <button
          className="clearAll"
          id="clearCompleted"
          onClick={clearCompleted}
        >
          Clear Completed
        </button>
      </footer>
    </div>
  );
}

export { TodoBox };
