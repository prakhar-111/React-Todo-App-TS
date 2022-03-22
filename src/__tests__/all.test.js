import * as React from "react";
import { render, screen } from "@testing-library/react";
import { TodoBox } from "../components/todobox";
import userEvent from "@testing-library/user-event";
// import { TodoInput } from "../components/todoInput";
import { TodoProvider } from "../utils/todoprovider";

test("Can add todo", async () => {
  const setTodoState = jest.fn();
  render(
    <TodoProvider>
      <TodoBox todoState="all" setTodoState={setTodoState} />
    </TodoProvider>
  );
  const todoValue = "abc";
  const input = screen.getByPlaceholderText("What needs to be done?");
  userEvent.type(input, `${todoValue}{enter}`);
  // screen.debug();
  expect(screen.getByDisplayValue(todoValue)).toBeInTheDocument();
  expect(screen.getByText("1 items left")).toBeInTheDocument();
});

test("Can mark todo as read", async () => {
  const setTodoState = jest.fn();
  render(
    <TodoProvider>
      <TodoBox todoState="all" setTodoState={setTodoState} />
    </TodoProvider>
  );
  const todoValue = "abc";
  const input = screen.getByPlaceholderText("What needs to be done?");
  userEvent.type(input, `${todoValue}{enter}`);
  const checkBox = screen.getByTestId("check-box");
  userEvent.click(checkBox);
  // screen.debug();
  expect(screen.getByDisplayValue(todoValue)).toHaveClass("strike");
  expect(screen.getByText("0 items left")).toBeInTheDocument();
});

test("Clear completed deletes completed todos", async () => {
  const setTodoState = jest.fn();
  render(
    <TodoProvider>
      <TodoBox todoState="all" setTodoState={setTodoState} />
    </TodoProvider>
  );
  const todoValues = ["abc", "def", "ghi"];
  const input = screen.getByPlaceholderText("What needs to be done?");
  todoValues.forEach((todo) => {
    userEvent.type(input, `${todo}{enter}`);
  });

  const checkBox = screen.getAllByTestId("check-box");
  // console.log(checkBox);
  userEvent.click(checkBox[0]);
  userEvent.click(checkBox[1]);
  // screen.debug();
  const clearAll = screen.getByRole("button", { name: /clear completed/i });
  userEvent.click(clearAll);

  expect(screen.queryByDisplayValue(todoValues[0])).not.toBeInTheDocument();
  expect(screen.queryByDisplayValue(todoValues[1])).not.toBeInTheDocument();
  expect(screen.getByDisplayValue(todoValues[2])).toBeInTheDocument();
  expect(screen.getByText("1 items left")).toBeInTheDocument();
});

test("Can delete todo", async () => {
  const setTodoState = jest.fn();
  render(
    <TodoProvider>
      <TodoBox todoState="all" setTodoState={setTodoState} />
    </TodoProvider>
  );
  const todoValue = "abc";
  const input = screen.getByPlaceholderText("What needs to be done?");
  userEvent.type(input, `${todoValue}{enter}`);
  const removeButton = screen.getByTestId("remove-button");
  userEvent.click(removeButton);
  // screen.debug();
  expect(screen.queryByDisplayValue(todoValue)).not.toBeInTheDocument();
  expect(screen.queryByRole("contentinfo")).not.toBeInTheDocument();
});

test("Select all todos", async () => {
  const setTodoState = jest.fn();
  render(
    <TodoProvider>
      <TodoBox todoState="all" setTodoState={setTodoState} />
    </TodoProvider>
  );
  const todoValues = ["abc", "def", "ghi"];
  const input = screen.getByPlaceholderText("What needs to be done?");
  todoValues.forEach((todo) => {
    userEvent.type(input, `${todo}{enter}`);
  });

  const checkBox = screen.getAllByTestId("check-box");
  // console.log(checkBox);
  userEvent.click(checkBox[0]);
  userEvent.click(checkBox[1]);
  userEvent.click(checkBox[2]);
  // screen.debug();
  expect(screen.getByDisplayValue(todoValues[0])).toHaveClass("strike");
  expect(screen.getByDisplayValue(todoValues[1])).toHaveClass("strike");
  expect(screen.getByDisplayValue(todoValues[2])).toHaveClass("strike");

  expect(screen.getByText("0 items left")).toBeInTheDocument();
});
