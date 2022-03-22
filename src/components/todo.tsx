import * as React from "react";
import "../App.css";
import { TodoContext } from "../utils/todoprovider";

type todoType = {
  id: number, 
  value:string, 
  isCompleted: boolean
}

interface TodoProps  {
  todo: todoType,
  todoState: string
}

function Todo({ todo, todoState }:TodoProps) {
  const inputRef : any = React.useRef()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos, activeTodos, setActiveTodos]: [todoType[],Function,number, Function] = React.useContext(TodoContext);
  const [disabled, setDisabled]= React.useState(true);
  const [localTodoValue, setLocalTodoValue] = React.useState(todo.value);
  function handleRemove(event:React.MouseEvent) {
    event.preventDefault();
    let remainingTodos:todoType[] = todos.filter((element:todoType) => element.id !== todo.id);
    setTodos(remainingTodos);
    if (todo.isCompleted === false) {
      setActiveTodos((prevCount) => prevCount - 1);
    }
  }
  function handleEdit(event:React.ChangeEvent<HTMLInputElement>) {
    setLocalTodoValue(event.target.value);
  }
  function handleDoubleClick(event:React.MouseEvent) {
    event.preventDefault();
    setDisabled(false);
  }
  function saveTodo() {
    let modifiedTodos:todoType[] = todos.map(function (element:todoType) {
      if (element.id === todo.id) {
        return {
          ...element,
          value: localTodoValue,
        };
      }
      return element;
    });
    let remainingTodos:todoType[] = modifiedTodos.filter(
      (element:todoType) => element.value !== ""
    );
    setTodos(remainingTodos);
    setDisabled(true);
    // setTodos(modifiedTodos);
  }
  function handleCheck(event:any) {
    // console.log(event.target.checked);
    let index : number = todos.findIndex((element : todoType) => (element.id === todo.id));
    let modifiedTodos:todoType[] = [...todos];
    modifiedTodos[index].isCompleted = !todos[index].isCompleted;
    setTodos(modifiedTodos);
    if (event.target.checked) {
      setActiveTodos((prevCount:number) => prevCount - 1);
    } else {
      setActiveTodos((prevCount:number) => prevCount + 1);
    }
  }
  function handleKeyCheck(event: any) {
    if(event.type === "keyup" && event.keyCode !== 13) {
      return;
    }
    console.log(inputRef.current.checked)
    let index : number = todos.findIndex((element : todoType) => (element.id === todo.id));
    let modifiedTodos:todoType[] = [...todos];
    modifiedTodos[index].isCompleted = !todos[index].isCompleted;
    setTodos(modifiedTodos);
    if (inputRef.current.checked) {
      setActiveTodos((prevCount:number) => prevCount + 1);
    } else {
      setActiveTodos((prevCount:number) => prevCount - 1);
    }
  }
  if (todoState === "active" && todo.isCompleted) {
    return null;
  }
  if (todoState === "completed" && todo.isCompleted === false) {
    return null;
  }
  return (
    <li
      className="todoDiv"
      onDoubleClick={(event:React.MouseEvent) => {
        handleDoubleClick(event);
      }}
    >
      <label className={todo.isCompleted ? "checkLabelGreen" : "checkLabel"} onKeyUp={handleKeyCheck}>
        {/* ⃝  */}
        
        <div  tabIndex={0} style={{borderRadius:"50%", borderStyle:"solid", height:"30px", width:"30px", position:"relative", left : "4px"}}>
          {/* ✓ */
          <svg
          className={todo.isCompleted ? "tickSpan" : "incompleteTickSpan"}
          data-event-type="check"
          data-testid="tick"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 16 16"
          style={{  position:"absolute", bottom:"1px", right:"4px"}}
        >
          <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
        </svg>
          }
        </div>
        <input
          type={"checkbox"}
          check-id={todo.id}
          data-testid = 'check-box'
          onClick={handleCheck}
          ref = {inputRef}
          checked={todo.isCompleted}
        />
      </label>
      <input
        input-id={todo.id}
        value={localTodoValue}
        onChange={handleEdit}
        onBlur={saveTodo}
        disabled={disabled}
        className={todo.isCompleted ? "strike" : ""}
      />
      <button remove-id={todo.id} onClick={handleRemove} data-testid = 'remove-button'>
        ❌
      </button>
    </li>
  );
}

export { Todo };
