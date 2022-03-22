import React from "react";

type todoType = {
  id: number, 
  value:string, 
  isCompleted: boolean
}

const TodoContext = React.createContext<[todoType[],Function,number,Function]|null>(null);

function TodoProvider(props:JSX.Element) {
  if (!localStorage.getItem("todoList")) {
    let newTodoList:todoType[] = [];
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
  }
  if (!localStorage.getItem("activeTodos")) {
    localStorage.setItem("activeTodos", JSON.stringify(0));
  }
  const [todos, setTodos] = React.useState(() => {
    if (localStorage.getItem("todoList")) {
      let localArr:todoType[] = JSON.parse(localStorage.getItem("todoList"));
      return localArr;
    }
  });
  const [activeTodos, setActiveTodos] = React.useState(() => {
    if (localStorage.getItem("activeTodos")) {
      let leftTodos:number = JSON.parse(localStorage.getItem("activeTodos"));
      return leftTodos;
    }
  });
  const value:[todoType[],Function,number, Function] = [todos, setTodos, activeTodos, setActiveTodos];
  return <TodoContext.Provider value={value} {...props} />;
}

export { TodoProvider, TodoContext };
