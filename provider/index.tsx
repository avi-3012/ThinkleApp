import { SafeAreaProvider } from "react-native-safe-area-context";
import config from "./../tamagui.config";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView, StatusBar, useColorScheme, Platform } from "react-native";
import { Suspense } from "react";
import { TamaguiProvider, TamaguiProviderProps, Text } from "tamagui";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import { ReactQueryProvider } from "./react-query";
import { ApiProvider } from "@/hooks/useApi";

export function Provider({
  children,
  ...rest
}: Omit<TamaguiProviderProps, "config">) {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background, paddingTop: Platform.OS === 'android' ? 35 : 0 }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaProvider style={{ flex: 1 }}>
        <TamaguiProvider config={config} {...rest}>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <ReactQueryProvider>
              <ApiProvider>
                <Suspense fallback={<Text>Loading...</Text>}>
                  {children}
                </Suspense>
              </ApiProvider>
            </ReactQueryProvider>
          </ThemeProvider>
        </TamaguiProvider>
      </SafeAreaProvider>
    </SafeAreaView>
  );
}
