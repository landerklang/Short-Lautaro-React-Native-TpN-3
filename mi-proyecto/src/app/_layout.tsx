import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Las pestañas de abajo (Reportes, Avisos, Permisos) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* El modal de permisos */}
      <Stack.Screen
        name="permisos/[recurso]"
        options={{
          presentation: "modal",
          title: "Permiso necesario",
        }}
      />

      {/* Pantalla de ajustes */}
      <Stack.Screen name="ajustes-app" options={{ title: "Ajustes" }} />
    </Stack>
  );
}
