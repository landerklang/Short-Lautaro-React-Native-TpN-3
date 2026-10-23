import React from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Linking,
  StyleSheet,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function Escanear() {
  const [permiso, pedirPermiso] = useCameraPermissions();

  // 1. Estado: Cargando (mientras permiso sea null)
  if (!permiso) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 2. Estado: Concedido
  if (permiso.granted) {
    return (
      <View style={styles.container}>
        <CameraView facing="back" style={StyleSheet.absoluteFill} />
      </View>
    );
  }

  // 3. Estado: Bloqueado (denegado permanentemente / canAskAgain en false)
  if (!permiso.canAskAgain) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Permiso bloqueado</Text>
        <Text style={styles.description}>
          Para escanear códigos es necesario habilitar la cámara manualmente
          desde los ajustes del sistema.
        </Text>
        <Button title="Abrir Ajustes" onPress={() => Linking.openSettings()} />
      </View>
    );
  }

  // 4. Estado: Preguntable (undetermined o denegado temporalmente)
  return (
    <View style={styles.centerContainer}>
      <Text style={styles.title}>Se requiere acceso a la cámara</Text>
      <Text style={styles.description}>
        Necesitamos usar la cámara para leer los códigos QR.
      </Text>
      <Button title="Continuar y permitir" onPress={pedirPermiso} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
});
