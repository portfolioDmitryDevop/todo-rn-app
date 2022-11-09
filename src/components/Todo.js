import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AppText } from "./UI/AppText";
import { AppTextBold } from "./UI/AppTextBold";

export const Todo = ({ todo, onRemove, onOpen }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.4}
      onLongPress={onRemove.bind(null, todo.id)}
      onPress={() => onOpen(todo.id)}
    >
      <View style={styles.todo}>
        <AppTextBold>{todo.title}</AppTextBold>
        <AppText>{todo.id}</AppText>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  todo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#eee",
    borderStyle: "solid",
    justifyContent: "space-between",
    marginBottom: 5,
  },
});
