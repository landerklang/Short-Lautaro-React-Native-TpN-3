// app/(tabs)/avisos.tsx
import { useState, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "expo-router";
import { obtenerAvisos, Aviso } from "../../lib/reportes";

export default function Avisos() {
  const [avisos, setAvisos] = useState<Aviso[]>([]);

  useFocusEffect(
    useCallback(() => {
      setAvisos(obtenerAvisos());
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bandeja de Avisos</Text>

      {avisos.length === 0 ? (
        <Text style={styles.vacio}>No tenés avisos por ahora.</Text>
      ) : (
        <FlatList
          data={avisos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <Text style={styles.mensaje}>{item.mensaje}</Text>
              <Text style={styles.fecha}>
                {new Date(item.fecha).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  vacio: {
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  tarjeta: {
    padding: 15,
    backgroundColor: "#e3f2fd",
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#005bb5",
  },
  mensaje: { fontSize: 16, fontWeight: "600", color: "#0d47a1" },
  fecha: { fontSize: 12, color: "#666", marginTop: 8 },
});
