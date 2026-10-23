import { View, Text, StyleSheet } from "react-native";

export default function Inicio() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mantenimiento IPF</Text>
      <Text style={styles.subtitle}>Lista de reportes (Próximamente)</Text>
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
  subtitle: { fontSize: 16, color: "#666" },
});
