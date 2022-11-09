import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  Dimensions,
  EventEmitter,
} from "react-native";
import { AddTodo } from "../components/AddTodo";
import { Todo } from "../components/Todo";
import { AppButton } from "../components/UI/AppButton";
import { AppLoader } from "../components/UI/AppLoader";
import { AppText } from "../components/UI/AppText";
import { ScreenContext } from "../context/screen/screenContex";
import { TodoContext } from "../context/todo/todoContext";
import { THEME } from "../theme";

export const MainScreen = () => {
  const [deviceWidth, setDeviceWidth] = useState(
    Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2
  );
  const { changeScreen } = useContext(ScreenContext);
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } =
    useContext(TodoContext);

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get("window").width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width);
    };
    const listener = Dimensions.addEventListener("change", update);
    return () => {
      listener.remove();
    };
  });

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Repeat</AppButton>
      </View>
    );
  }

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        focusable={true}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
    if (todos.length == 0) {
      content = (
        <View style={styles.imageWrap}>
          <Image
            style={styles.image}
            source={require("../../assets/no-items.png")}
            resizeMode="contain"
          />
          {/* <Image
            style={styles.image}
            source={{
              uri: "https://paperbrothers.ru/wp-content/uploads/2017/11/image_1600_900.jpg",
            }}
            resizeMode="contain"
          /> */}
        </View>
      );
    }
  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  );
};

const styles = StyleSheet.create({
  imageWrap: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    height: "80%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
  },
});
