import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import { THEME } from "../theme";
import { AppTextBold } from "./UI/AppTextBold";

export const Navbar = (props) => {
  return (
    <View
      style={{
        ...styles.navbar,
        ...Platform.select({
          ios: styles.navbarOS,
          android: styles.navbarAndroid,
        }),
      }}
    >
      <AppTextBold style={styles.text}>{props.title}</AppTextBold>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    height: 70,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
  navbarAndroid: {
    backgroundColor: THEME.MAIN_COLOR,
  },
  navbarOS: {
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
  },
  text: {
    color: Platform.OS === "ios" ? THEME.MAIN_COLOR : "#fff",
    fontSize: 20,
  },
});
