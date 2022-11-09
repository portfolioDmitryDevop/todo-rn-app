import React, { useState, useContext } from "react";
import { StyleSheet, View, Button, Dimensions } from "react-native";
import { EditModal } from "../components/EditModal";
import { AppButton } from "../components/UI/AppButton";
import { AppCard } from "../components/UI/AppCard";
import { AppTextBold } from "../components/UI/AppTextBold";
import { THEME } from "../theme";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { TodoContext } from "../context/todo/todoContext";
import { ScreenContext } from "../context/screen/screenContex";

export const TodoScreen = () => {
  const [modal, setModal] = useState(false);
  const { todos, updateTodo, removeTodo } = useContext(TodoContext);
  const { todoId, changeScreen } = useContext(ScreenContext);
  const todo = todos.find((t) => t.id === todoId);

  const saveHandler = async (title) => {
    await updateTodo(todo.id, title);
    setModal(false);
  };

  return (
    <View>
      <EditModal
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
        value={todo.title}
      />
      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />{" "}
        </AppButton>
      </AppCard>
      <View style={styles.buttonBox}>
        <View style={styles.button}>
          <AppButton
            onPress={changeScreen.bind(null, null)}
            color={THEME.GREY_COLOR}
          >
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton color={THEME.DANGER_COLOR} onPress={removeTodo.bind(null, todo.id)}>
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBox: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  button: {
    width: Dimensions.get("window").width / 2.5,
  },
  title: {
    fontSize: 20,
    width: "70%",
  },
  card: {
    marginBottom: 20,
  },
});
