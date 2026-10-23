import { useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { usePermiso } from "../../hooks/usepermiso"; // Asegurate de que la ruta a tu hook sea correcta
import { BENEFICIOS, NOMBRES, Recurso } from "../../../src/lib/permisos";

export default function PermisoPrevioModal() {
  const { recurso } = useLocalSearchParams<{ recurso: Recurso }>();
  const { estado, pedir, abrirAjustes } = usePermiso(recurso ?? "camara");

  // SOLUCIÓN AL ERROR: Cerramos el modal DESPUÉS de que se renderice
  useEffect(() => {
    if (estado === "concedido") {
      router.back();
    }
  }, [estado]);

  if (!recurso) {
    return (
      <View style={styles.container}>
        <Text>Recurso no especificado.</Text>
        <Button title="Volver" onPress={() => router.back()} />
      </View>
    );
  }

  if (estado === "cargando") {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Si está concedido, mostramos null mientras el useEffect lo cierra
  if (estado === "concedido") {
    return null;
  }

  const beneficio =
    BENEFICIOS[recurso] ?? "Esta función necesita un permiso para funcionar.";
  const nombre = NOMBRES[recurso] ?? "Permiso";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{nombre}</Text>
      <Text style={styles.beneficio}>{beneficio}</Text>

      {estado === "preguntable" ? (
        <Button
          title="Continuar"
          onPress={async () => {
            await pedir();
          }}
        />
      ) : (
        <>
          <Text style={styles.bloqueado}>
            Este permiso está bloqueado. Podés habilitarlo desde los Ajustes de
            la app.
          </Text>
          <Button title="Abrir Ajustes" onPress={abrirAjustes} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  beneficio: { fontSize: 16, marginBottom: 24, lineHeight: 22 },
  bloqueado: { fontSize: 14, color: "#666", marginBottom: 16, lineHeight: 20 },
});
