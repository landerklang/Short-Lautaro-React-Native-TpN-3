import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      {/* <Stack.Screen name="reporte" options={{ headerShown: false }} /> */}
      <Stack.Screen
        name="permisos/[recurso]"
        options={{
          presentation: "modal",
          title: "Permiso necesario",
        }}
      />
      <Stack.Screen name="ajustes-app" options={{ title: "Ajustes" }} />
    </Stack>
  );
}
