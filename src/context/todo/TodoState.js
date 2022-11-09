import React, { useReducer, useContext } from "react";
import { Alert } from "react-native";
import { ScreenContext } from "../screen/screenContex";
import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from "../types";
import { TodoContext } from "./todoContext";
import { todoReducer } from "./todoReducer";
import { Http } from "../../http";

export const TodoState = ({ children }) => {
  const initialState = {
    todos: [],
    loading: false,
    error: null,
  };

  const { changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async (title) => {
    clearError();
    try {
      const data = await Http.post(
        "https://rn-todo-app-f792a-default-rtdb.firebaseio.com/todos.json",
        { title }
      );
      dispatch({ type: ADD_TODO, title: title, id: data.name });
    } catch (error) {
      showError("Something happened...");
    }
  };

  const removeTodo = (id) => {
    const todo = state.todos.find((t) => t.id === id);
    Alert.alert(
      "Delete element",
      `Do you agree to remove ${todo.title}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: async () => {
            clearError();
            try {
              await Http.delete(
                `https://rn-todo-app-f792a-default-rtdb.firebaseio.com/todos/${id}.json`
              );
              changeScreen(null);
              dispatch({ type: REMOVE_TODO, id: id });
            } catch (error) {
              showError("Something happened...");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(
        `https://rn-todo-app-f792a-default-rtdb.firebaseio.com/todos/${id}.json`,
        { title }
      );
      dispatch({ type: UPDATE_TODO, id: id, title: title });
    } catch (error) {
      showError("Something happened...");
      console.log(error);
    }
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = (error) => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });
  const fetchTodos = async () => {
    showLoader();
    clearError();
    try {
      const response = await Http.get(
        "https://rn-todo-app-f792a-default-rtdb.firebaseio.com/todos.json"
      );
      const data = response;

      const todos =
        data != null
          ? Object.keys(data).map((key) => ({ ...data[key], id: key }))
          : [];
      setTimeout(() => {
        dispatch({ type: FETCH_TODOS, todos });
        hideLoader();
      }, 500);
    } catch (error) {
      showError("Something happened...");
      console.log(error);
    } finally {
      hideLoader();
    }
  };
  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
        loading: state.loading,
        error: state.error,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
