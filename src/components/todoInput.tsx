import * as React from "react";
import "../App.css";
import { TodoContext } from "../utils/todoprovider";

type todoType = {
  id: number, 
  value:string, 
  isCompleted: boolean
}

function TodoInput() {
  const [todos , setTodos, activeTodos, setActiveTodos] : [todoType[],Function,number,Function] =
    React.useContext(TodoContext);

  function addTodo(event:any) {
    if (event.type === "keyup" && event.keyCode !== 13) {
      return;
    }
    // console.log(event);
    if (event.target.value === "") {
      return;
    }
    const newTodo: todoType = {
      id: Date.now(),
      value: event.target.value,
      isCompleted: false,
    };

    const newTodos : todoType[] = [...todos, newTodo];
    setTodos(newTodos);
    event.target.value = "";
    setActiveTodos((prevCount) => prevCount + 1);
  }

  function selectAll(event:any) {
    if(event.type === "keyup" && event.keyCode !== 13) {
      return;
    }
    if (activeTodos === 0) {
      let modifiedTodos:todoType[] = todos.map(function (element) {
        return {
          ...element,
          isCompleted: false,
        };
      });

      setTodos(modifiedTodos);
      setActiveTodos(todos.length);
    } else {
      let modifiedTodos:todoType[] = todos.map(function (element) {
        return {
          ...element,
          isCompleted: true,
        };
      });

      setTodos(modifiedTodos);
      setActiveTodos(0);
    }
  }

  return (
    <div className="inputDiv">
      <label className="check" tabIndex={0} onKeyUp= {selectAll}>
        ⌄
        <input type="checkbox" id="selectAll" onClick={selectAll} />
      </label>
      <input
        type="text"
        id="enterTodo"
        placeholder="What needs to be done?"
        onBlur={addTodo}
        onKeyUp={addTodo}
      />
      <label htmlFor="enterTodo"></label>
    </div>
  );
}

export { TodoInput };
