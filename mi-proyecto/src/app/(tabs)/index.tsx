import { View, Text, Button, StyleSheet } from "react-native";
import { router } from "expo-router";

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mantenimiento IPF</Text>
      <Text style={styles.subtitle}>Lista de reportes (próximamente)</Text>

      <Button
        title="Ir a Nuevo Reporte (Prueba)"
        onPress={() => router.push("/reporte/nuevo")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  subtitle: { fontSize: 16, color: "#666", marginBottom: 20 },
});
