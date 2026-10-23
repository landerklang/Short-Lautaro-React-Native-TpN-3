// app/(tabs)/permisos/index.tsx
import { useFocusEffect, router } from "expo-router";
import { useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { usePermiso, EstadoPermiso } from "../../../hooks/usepermiso";
import { NOMBRES, Recurso } from "../../../lib/permisos";

const RECURSOS: Recurso[] = [
  "camara",
  "ubicacion",
  "notificaciones",
  "galeria",
];

function colorEstado(estado: EstadoPermiso) {
  switch (estado) {
    case "concedido":
      return "#2e7d32";
    case "preguntable":
      return "#f57c00";
    case "bloqueado":
      return "#c62828";
    default:
      return "#666";
  }
}

// Subcomponente para cada fila
function FilaPermiso({ recurso }: { recurso: Recurso }) {
  const { estado, parcial, abrirAjustes } = usePermiso(recurso);

  if (estado === "cargando") {
    return (
      <View style={styles.fila}>
        <Text style={styles.nombre}>{NOMBRES[recurso]}</Text>
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <View style={styles.fila}>
      <View style={styles.info}>
        <Text style={styles.nombre}>{NOMBRES[recurso]}</Text>
        <Text style={[styles.estado, { color: colorEstado(estado) }]}>
          {estado.toUpperCase()} {parcial ? "(Parcial)" : ""}
        </Text>
        <Text style={styles.plataforma}>Plataforma: {Platform.OS}</Text>

        {/* Matices específicos según G2.9 */}
        {recurso === "ubicacion" && estado === "concedido" && (
          <Text style={styles.detalle}>
            Precisión: {parcial ? "Aproximada" : "Exacta"}
          </Text>
        )}
        {recurso === "camara" && parcial && (
          <Text style={styles.detalle}>Acceso limitado (iOS)</Text>
        )}
      </View>

      <View style={styles.acciones}>
        {estado === "preguntable" && (
          <Button
            title="Pedir"
            onPress={() => router.push(`/permisos/${recurso}`)}
          />
        )}
        {estado === "bloqueado" && (
          <Button
            title="Abrir Ajustes"
            onPress={abrirAjustes}
            color="#c62828"
          />
        )}
        {estado === "concedido" && <Text style={styles.textoOk}>OK</Text>}
      </View>
    </View>
  );
}

export default function PanelPermisos() {
  // Forzar re-render al volver a la pestaña
  const [, setTick] = useCallback((t: any) => t, []) as any; // truco simple para forzar actualización
  const [refresh, setRefresh] = useState(0);

  useFocusEffect(
    useCallback(() => {
      setRefresh((r: any) => r + 1);
    }, []),
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 16 }}
    >
      <Text style={styles.titulo}>Estado de Permisos</Text>
      <Text style={styles.subtitulo}>
        Podés cambiar estos accesos en cualquier momento desde los ajustes del
        sistema.
      </Text>

      {RECURSOS.map((recurso) => (
        <FilaPermiso key={`${recurso}-${refresh}`} recurso={recurso} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  titulo: { fontSize: 22, fontWeight: "bold", marginBottom: 8 },
  subtitulo: { fontSize: 14, color: "#666", marginBottom: 24 },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  info: { flex: 1 },
  nombre: { fontSize: 16, fontWeight: "600" },
  estado: { fontSize: 13, fontWeight: "bold", marginTop: 4 },
  plataforma: { fontSize: 12, color: "#888", marginTop: 2 },
  detalle: { fontSize: 12, color: "#444", marginTop: 4, fontStyle: "italic" },
  acciones: { marginLeft: 16, alignItems: "flex-end" },
  textoOk: { color: "#2e7d32", fontWeight: "bold" },
});
