// app/reporte/[id].tsx
import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
  Platform,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { obtenerReportePorId, cambiarEstadoReporte } from "../../lib/reportes";
import { usePermiso } from "../../hooks/usepermiso";
import Constants from "expo-constants";

// PARCHE: Evitar crash en Expo Go Android
const Notifications =
  Constants.appOwnership === "expo" && Platform.OS === "android"
    ? null
    : require("expo-notifications");

export default function DetalleReporte() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const reporte = obtenerReportePorId(id || "");
  const { estado } = usePermiso("notificaciones");
  const [resolviendo, setResolviendo] = useState(false);

  if (!reporte) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.error}>Reporte no encontrado</Text>
        <Button title="Volver al inicio" onPress={() => router.replace("/")} />
      </View>
    );
  }

  const simularResolucion = async () => {
    setResolviendo(true);
    cambiarEstadoReporte(reporte.id, "resuelto");

    // Lógica de notificaciones (G2.5)
    if (Notifications && estado === "concedido") {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Reporte Resuelto",
          body: `El problema "${reporte.titulo}" en el ${reporte.aula} ha sido solucionado.`,
        },
        trigger: { seconds: 10 }, // A los 10 segundos
      });
      Alert.alert(
        "Simulación",
        "El reporte se resolvió. Recibirás una notificación en 10 segundos.",
      );
    } else {
      // Si no hay permiso o estamos en Expo Go, cae en la bandeja de avisos
      Alert.alert(
        "Simulación",
        "El reporte se resolvió. Como no hay notificaciones, el aviso se guardó en la bandeja.",
      );
    }

    setResolviendo(false);
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{reporte.titulo}</Text>
      <Text style={styles.estado}>Estado: {reporte.estado.toUpperCase()}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Descripción:</Text>
        <Text style={styles.valor}>{reporte.descripcion}</Text>

        <Text style={styles.label}>Aula:</Text>
        <Text style={styles.valor}>{reporte.aula}</Text>

        <Text style={styles.label}>Categoría:</Text>
        <Text style={styles.valor}>{reporte.categoria}</Text>

        <Text style={styles.label}>Ubicación:</Text>
        <Text style={styles.valor}>
          {reporte.ubicacion || "No especificada"}
        </Text>
      </View>

      {reporte.fotoUri && (
        <View>
          <Text style={styles.label}>Foto adjunta:</Text>
          <Image source={{ uri: reporte.fotoUri }} style={styles.foto} />
        </View>
      )}

      <View style={{ height: 30 }} />

      {reporte.estado !== "resuelto" ? (
        <Button
          title="Simular Resolución"
          onPress={simularResolucion}
          disabled={resolviendo}
          color="#f57c00"
        />
      ) : (
        <Text style={styles.resuelto}>¡Este reporte ya fue resuelto!</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  centrado: { flex: 1, justifyContent: "center", alignItems: "center" },
  error: { fontSize: 18, color: "red", marginBottom: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  estado: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f57c00",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  label: { fontSize: 14, fontWeight: "bold", color: "#555", marginTop: 10 },
  valor: { fontSize: 16, marginTop: 2 },
  foto: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginTop: 10,
    resizeMode: "cover",
  },
  resuelto: {
    fontSize: 16,
    color: "#2e7d32",
    fontWeight: "bold",
    textAlign: "center",
  },
});
