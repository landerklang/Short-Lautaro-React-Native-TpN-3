import { View, Text, StyleSheet } from "react-native";

export default function Avisos() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bandeja de Avisos</Text>
      <Text style={styles.subtitle}>No hay avisos por ahora.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 20, fontWeight: "bold" },
  subtitle: { color: "#666", marginTop: 8 },
});
