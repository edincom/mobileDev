import { AuthContext } from "@/utils/authContext";
import { Redirect, Stack } from "expo-router";
import { useContext } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const queryClient = new QueryClient();

export default function ProtectedLayout() {
  const authState = useContext(AuthContext);

  if (!authState.isReady) return null;

  if (!authState.isLoggedIn) return <Redirect href="/login" />;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="study/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </QueryClientProvider>
  );
}
