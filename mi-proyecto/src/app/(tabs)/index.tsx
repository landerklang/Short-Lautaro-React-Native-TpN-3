// app/(tabs)/index.tsx
import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mantenimiento IPF</Text>
      <Text style={styles.subtitle}>Pruebas de pantallas:</Text>

      <View style={styles.botones}>
        <Button
          title="Probar Escáner QR"
          onPress={() => router.push("/reporte/escanear")}
        />
        <Button
          title="Probar Adjuntar Foto"
          onPress={() => router.push("/reporte/foto")}
        />
        <Button
          title="Probar Ubicación"
          onPress={() => router.push("/reporte/ubicacion")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },
  botones: { width: "100%", gap: 15 },
});
