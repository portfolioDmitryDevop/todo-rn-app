import React, { useState } from "react";
import { View, StyleSheet, TextInput, Button, Alert, Text, Keyboard } from "react-native";
import { THEME } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { AppButton } from "./UI/AppButton";

export const AddTodo = ({ onSubmit }) => {
  const [todo, setTodo] = useState("");

  const pressHandler = () => {
    if (todo.trim() != "") {
      onSubmit(todo);
      setTodo("");
      Keyboard.dismiss();
    } else {
      Alert.alert("Todo don't be empty");
    }
  };

  return (
    <View style={styles.block}>
      <TextInput
        style={styles.input}
        onChangeText={setTodo}
        value={todo}
        placeholder="Enter text"
        autoCorrect={false}
        autoCapitalize="none"
      />
      <View>
        <AppButton onPress={pressHandler}>
          <Ionicons name="add-circle-outline" size={24} color="white" />
        </AppButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 5,
  },
  input: {
    width: "60%",
    borderBottomColor: THEME.MAIN_COLOR,
    borderStyle: "solid",
    borderBottomWidth: 2,
    padding: 10,
  },
});
