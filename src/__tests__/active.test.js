import * as React from "react";
import { render, screen } from "@testing-library/react";
import { TodoBox } from "../components/todobox";
import userEvent from "@testing-library/user-event";
import { TodoProvider } from "../utils/todoprovider";

test("Todo present when added but removed when on completion", async () => {
  const setTodoState = jest.fn();
  render(
    <TodoProvider>
      <TodoBox todoState="active" setTodoState={setTodoState} />
    </TodoProvider>
  );
  const todoValue = "abc";
  const input = screen.getByPlaceholderText("What needs to be done?");
  userEvent.type(input, `${todoValue}{enter}`);
  // screen.debug();
  expect(screen.getByDisplayValue(todoValue)).toBeInTheDocument();
  expect(screen.getByText("1 items left")).toBeInTheDocument();
  const checkBox = screen.getByTestId("check-box");
  userEvent.click(checkBox);
  expect(screen.queryByDisplayValue(todoValue)).not.toBeInTheDocument();
});
