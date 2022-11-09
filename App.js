import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, View, Alert, Image } from "react-native";
import { Navbar } from "./src/components/Navbar";
import React, { useState, useEffect, useCallback } from "react";
import { MainLayout } from "./src/MainLayout";
import { TodoState } from "./src/context/todo/TodoState";
import { ScreenState } from "./src/context/screen/ScreenState";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          "roboto-regular": require("./assets/Roboto-Regular.ttf"),
          "roboto-bold": require("./assets/Roboto-Bold.ttf"),
        });
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View>
        <Image
          source={require("./assets/load.png")}
          resizeMode="contain"
          style={styles.load}
        />
      </View>
    );
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  );
}

const styles = StyleSheet.create({
  load: {
    width: "100%",
    height: "100%",
  },
});
