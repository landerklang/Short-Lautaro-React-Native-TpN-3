// app/permisos/[recurso].tsx
import { useLocalSearchParams, router } from "expo-router";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { usePermiso } from "../../hooks/usepermiso";
import { BENEFICIOS, Recurso, NOMBRES } from "../../lib/permisos";

export default function PermisoPrevioModal() {
  const { recurso } = useLocalSearchParams<{ recurso: Recurso }>();
  const { estado, pedir, abrirAjustes } = usePermiso(recurso);

  if (estado === "cargando") {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (estado === "concedido") {
    // Si ya está concedido, cerrar automáticamente
    router.back();
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
            router.back();
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
