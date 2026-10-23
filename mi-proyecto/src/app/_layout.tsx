// app/_layout.tsx
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      {/* Esta es la carpeta de las pestañas (Reportes, Avisos, Permisos) */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Las rutas que vamos a usar después */}
      <Stack.Screen name="reporte" options={{ headerShown: false }} />
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
