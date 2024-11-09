import React from "react";
import Toast from "react-native-toast-message";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { onlineManager } from "@tanstack/react-query";
import NetInfo from "@react-native-community/netinfo";
import "@tanstack/react-query";
import * as Haptics from "expo-haptics";
import { ApiProvider } from "@/hooks/useApi";

interface CustomErrorInterface {
    error: string;
    error_title: string;
    error_log: string;
}

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<CustomErrorInterface>;
  }
}

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

onlineManager.subscribe((isOnline) => {
  if (isOnline) {
    Toast.show({
      type: "success",
      text1: "You are online",
      text2: "Internet access is available",
      position: "top",
    });
  } else {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    Toast.show({
      type: "error",
      text1: "No internet detected",
      text2: "Please check your internet connection",
      position: "top",
    });
  }
});

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error) => {
      console.log("🚀 ~ mut error:", error);
      if (error.code === "ERR_NETWORK") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Toast.show({
          type: "error",
          text1: "No internet detected",
          text2: "Please check your internet connection",
          position: "top",
        });
        return;
      } else if (error.code === "ECONNABORTED" || error.code === "ECONN_ABORTED") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Toast.show({
          type: "error",
          text1: "Slow internet connection",
          text2: "Please change the connection or try again.",
          position: "top",
        });
        return;
      }
      if (error?.response?.data?.error) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        if (__DEV__) {
          console.error("error.request", error);
          return Toast.show({
            type: "error",
            text1: error?.response?.config?.url ?? "Something went wrong",
            text2: error?.response?.data?.error ?? "There was an error fetching information",
          });
        }
        // if error code is 401 then dont show toast
        if (error.response.status === 401) {
          return; // Don't show toast for 401 errors
        }
        return Toast.show({
          type: "error",
          text1: error?.response?.data?.error_title
            ? error?.response?.data?.error_title
            : "Error occurred",
          text2: error.response?.data?.error ?? "There was an error on our end",
        });
      }

      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return Toast.show({
        type: "error",
        text1: error?.response?.data?.error_title ?? "Something went wrong",
        text2: error.response?.data?.error ?? "There was an error on our end",
      });
    },
  }),
  queryCache: new QueryCache({
    onError: (error) => {
      console.log("🚀 ~ query error:", error);
      if (error.code === "ERR_NETWORK") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Toast.show({
          type: "error",
          text1: "No internet detected",
          text2: "Please check your internet connection",
          position: "top",
        });
        return;
      } else if (error.code === "ECONNABORTED" || error.code === "ECONN_ABORTED") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Toast.show({
          type: "error",
          text1: "Slow internet connection!",
          text2: "Please change the connection or try again.",
          position: "top",
        });
        return;
      }
      if (error?.response?.data?.error) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        if (__DEV__) {
          console.error("error.request", error);
          return Toast.show({
            type: "error",
            text1: error?.response?.config?.url ?? "Something went wrong",
            text2: error?.response?.data?.error ?? "There was an error fetching information",
          });
        }
        if (error.response.status === 401) {
          return; // Don't show toast for 401 errors
        }
        return Toast.show({
          type: "error",
          text1: error?.response?.data?.error_title ?? "Something went wrong",
          text2: error?.response?.data?.error ?? "There was an error fetching information",
        });
      }
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      return Toast.show({
        type: "error",
        text1: error?.response?.data?.error_title ?? "Something went wrong",
        text2: error?.response?.data?.error ?? "There was an error fetching information",
      });
    },
  }),
  defaultOptions: {
    queries: {
      staleTime: 300000, //5 minutes
      networkMode: "online",
    },
  },
});

export interface Props {
  children: React.ReactNode;
}

export const ReactQueryProvider = ({ children }: Props) => {
  return (<QueryClientProvider client={queryClient}>
    {children}
    </QueryClientProvider>);
};
