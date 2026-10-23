// app/ajustes-app.tsx
import { useEffect, useState } from "react";
import { View, Text, Switch, StyleSheet, Platform, Alert } from "react-native";
import Constants from "expo-constants";
import { usePermiso } from "../hooks/usepermiso";

// PARCHE: Evitar crash en Expo Go Android
const Notifications =
  Constants.appOwnership === "expo" && Platform.OS === "android"
    ? null
    : require("expo-notifications");

export default function AjustesApp() {
  const { estado, pedir, abrirAjustes } = usePermiso("notificaciones");
  const [activado, setActivado] = useState(false);

  useEffect(() => {
    if (estado === "concedido") {
      setActivado(true);
    } else {
      setActivado(false);
    }
  }, [estado]);

  const cambiarInterruptor = async (valor: boolean) => {
    if (!valor) {
      setActivado(false);
      return;
    }

    // 1. En Android, crear el canal ANTES de pedir (si el módulo existe)
    if (Platform.OS === "android" && Notifications) {
      await Notifications.setNotificationChannelAsync("reportes", {
        name: "Reportes Resueltos",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    // 2. Evaluar el estado del permiso
    if (estado === "preguntable") {
      await pedir();
    } else if (estado === "bloqueado") {
      Alert.alert(
        "Notificaciones bloqueadas",
        "Habilitá las notificaciones desde los ajustes del sistema.",
        [
          { text: "Abrir Ajustes", onPress: abrirAjustes },
          { text: "Cancelar", style: "cancel" },
        ],
      );
    } else if (estado === "concedido") {
      setActivado(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ajustes de la App</Text>

      <View style={styles.fila}>
        <Text style={styles.textoFila}>
          Avisarme cuando se resuelva mi reporte
        </Text>
        <Switch
          value={activado}
          onValueChange={cambiarInterruptor}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={activado ? "#005bb5" : "#f4f3f4"}
        />
      </View>

      <Text style={styles.nota}>
        Si activás esta opción, te enviaremos una notificación cuando el área de
        mantenimiento marque tu reporte como "Resuelto".
      </Text>

      {Platform.OS === "android" && !Notifications && (
        <View style={styles.alerta}>
          <Text style={styles.alertaTexto}>
            (Nota: En Expo Go las notificaciones no están disponibles por
            limitaciones de la herramienta. En la app compilada funcionarán
            correctamente).
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  fila: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  textoFila: { fontSize: 16, flex: 1, marginRight: 16 },
  nota: { fontSize: 13, color: "#666", marginTop: 16, lineHeight: 18 },
  alerta: {
    marginTop: 30,
    padding: 12,
    backgroundColor: "#fff3e0",
    borderRadius: 8,
  },
  alertaTexto: { fontSize: 12, color: "#e65100", fontStyle: "italic" },
});
