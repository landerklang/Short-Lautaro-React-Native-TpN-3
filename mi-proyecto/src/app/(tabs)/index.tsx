// app/(tabs)/index.tsx
import { useState, useCallback } from "react";
import { View, Text, Button, StyleSheet, FlatList } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { obtenerReportes, Reporte } from "../../lib/reportes";

export default function Inicio() {
  const [reportes, setReportes] = useState<Reporte[]>([]);

  // useFocusEffect hace que la lista se actualice cada vez que volvés a esta pantalla
  useFocusEffect(
    useCallback(() => {
      setReportes(obtenerReportes());
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mantenimiento IPF</Text>

      <View style={styles.botonNuevo}>
        <Button
          title="+ Nuevo Reporte"
          onPress={() => router.push("/reporte/nuevo")}
          color="#005bb5"
        />
      </View>

      <View style={{ height: 20 }} />

      <Text style={styles.subtitle}>Mis Reportes</Text>

      {reportes.length === 0 ? (
        <Text style={styles.vacio}>No tenés reportes creados todavía.</Text>
      ) : (
        <FlatList
          data={reportes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.tarjeta}>
              <Text style={styles.tarjetaTitulo}>{item.titulo}</Text>
              <Text style={styles.tarjetaInfo}>
                Aula: {item.aula} | Categoría: {item.categoria}
              </Text>
              <Text style={styles.tarjetaEstado}>
                Estado: {item.estado.toUpperCase()}
              </Text>
            </View>
          )}
        />
      )}

      {/* Botones de prueba que ya tenías (podés borrarlos cuando termines el TP) */}
      <View style={styles.pruebas}>
        <Text style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>
          Atajos de prueba:
        </Text>
        <Button
          title="Ir a Ajustes"
          onPress={() => router.push("/ajustes-app")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  botonNuevo: { marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  vacio: {
    color: "#666",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 20,
  },
  tarjeta: {
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#f57c00", // Color naranja para "pendiente"
  },
  tarjetaTitulo: { fontSize: 16, fontWeight: "bold" },
  tarjetaInfo: { fontSize: 13, color: "#555", marginTop: 4 },
  tarjetaEstado: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 8,
    color: "#f57c00",
  },
  pruebas: {
    marginTop: 30,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
});
