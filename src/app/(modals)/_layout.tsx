import { Slot } from "expo-router";

export default function ModalLayout() {
  return (
    <Slot />
    // <Stack>
    //   <Stack.Screen name="AuthScreen" options={{ headerShown: false }} />
    //   <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
    //   <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
    //   <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} />
    // </Stack>
  );
}
