// app/reporte/escanear.tsx
import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { CameraView } from "expo-camera";
import { usePermiso } from "../../hooks/usepermiso";
import { router } from "expo-router";

export default function EscanearQR() {
  const { estado, pedir, abrirAjustes } = usePermiso("camara");
  const [codigoManual, setCodigoManual] = useState("");
  const [escaneado, setEscaneado] = useState(false);

  // 1. Estado de carga
  if (estado === "cargando") {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 10 }}>Consultando cámara...</Text>
      </View>
    );
  }

  // 2. Estado bloqueado
  if (estado === "bloqueado") {
    return (
      <View style={styles.centrado}>
        <Text style={styles.titulo}>Cámara bloqueada</Text>
        <Text style={styles.texto}>
          Habilitá el permiso desde los ajustes para escanear el QR.
        </Text>
        <Button title="Abrir Ajustes" onPress={abrirAjustes} />
      </View>
    );
  }

  // 3. Estado preguntable (explicación)
  if (estado === "preguntable") {
    return (
      <View style={styles.centrado}>
        <Text style={styles.titulo}>Escanear código del aula</Text>
        <Text style={styles.texto}>
          Usamos la cámara para leer el QR pegado en la puerta del aula.
        </Text>
        <Button title="Continuar" onPress={pedir} />
        <View style={{ height: 20 }} />
        <Text style={styles.textoChico}>O ingresá el código a mano:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: AULA-204"
          value={codigoManual}
          onChangeText={setCodigoManual}
        />
        <Button
          title="Usar código"
          onPress={() => router.back()}
          disabled={!codigoManual}
        />
      </View>
    );
  }

  // 4. Estado concedido (Cámara abierta)
  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
        onBarcodeScanned={({ data }) => {
          if (!escaneado) {
            setEscaneado(true);
            console.log("QR Escaneado:", data);
            // Acá después guardaremos el dato y volveremos atrás
            router.back();
          }
        }}
      />
      <View style={styles.overlay}>
        <Text style={styles.overlayText}>Apuntá al código QR</Text>
        <Button
          title="Cancelar y escribir a mano"
          onPress={() => router.back()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centrado: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    alignItems: "center",
  },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  texto: { fontSize: 16, textAlign: "center", marginBottom: 20, color: "#444" },
  textoChico: { fontSize: 14, color: "#666", marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
    borderRadius: 10,
  },
  overlayText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 16,
  },
});
