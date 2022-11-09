import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { Navbar } from "./components/Navbar";
import { THEME } from "./theme";
import { MainScreen } from "./screens/MainScreen";
import { TodoScreen } from "./screens/TodoScreen";
import { TodoContext } from "./context/todo/todoContext";
import { ScreenContext } from "./context/screen/screenContex";
export const MainLayout = () => {
  //   const { todos, addTodo, updateTodo, removeTodo } = useContext(TodoContext);
  //   const [todos, setTodos] = useState([]);
  // const [todoId, setTodoId] = useState(null);

  const { todoId } = useContext(ScreenContext);

  //   const addTodo = (title) => {
  //     setTodos((prev) => [
  //       ...prev,
  //       {
  //         id: Date.now().toString(),
  //         title: title,
  //       },
  //     ]);
  //   };

  //   const updateTodo = (id, title) => {
  //     setTodos((old) =>
  //       old.map((todo) => {
  //         if (todo.id == id) {
  //           todo.title = title;
  //         }
  //         return todo;
  //       })
  //     );
  //   };

  //   const removeTodo = (id) => {
  //     const todo = todos.find((t) => t.id === id);
  //     Alert.alert(
  //       "Delete element",
  //       `Do you agree to remove ${todo.title}?`,
  //       [
  //         {
  //           text: "Cancel",
  //           style: "cancel",
  //         },
  //         {
  //           text: "Remove",
  //           onPress: () => {
  //             setTodoId(null);
  //             setTodos((prev) => prev.filter((todo) => todo.id !== id));
  //           },
  //         },
  //       ],
  //       { cancelable: false }
  //     );
  //   };
  //   let content = (
  //     <MainScreen />
  //   );

  //   if (todoId) {
  //     content = (
  //       <TodoScreen/>
  //     );
  //   }

  return (
    <View style={styles.body}>
      <Navbar title="todo app" />
      <View style={styles.container}>
        {todoId ? <TodoScreen /> : <MainScreen />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#f7f7f7'
  },
  container: {
    flex: 1,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
  },
  text: {
    fontSize: 20,
    color: "#000",
  },
  load: {
    width: "100%",
    height: "100%",
  },
});
