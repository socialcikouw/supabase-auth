import { Stack } from "expo-router";

export default function ModalLayout() {
  return (
    <Stack>
      <Stack.Screen name="AuthScreen" options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="RegisterScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} />
      <Stack.Screen
        name="DropLamaFormScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="DropBaruFormScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NasabahBaruFormScreen"
        options={{ headerShown: false }}
      />
      <Stack.Screen name="PembayaranScreen" options={{ headerShown: false }} />
      <Stack.Screen name="NasabahBaru" options={{ headerShown: true }} />
      <Stack.Screen name="Nasabah" options={{ headerShown: true }} />
      <Stack.Screen name="NasabahForm" options={{ headerShown: true }} />
    </Stack>
  );
}
