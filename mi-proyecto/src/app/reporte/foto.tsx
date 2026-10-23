// app/reporte/foto.tsx
import { useState } from "react";
import { View, Text, Button, StyleSheet, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { usePermiso } from "../../hooks/usepermiso";

export default function AdjuntarFoto() {
  const [image, setImage] = useState<string | null>(null);
  const { estado, pedir, abrirAjustes } = usePermiso("camara");

  const tomarFoto = async () => {
    if (estado === "preguntable") {
      await pedir();
      return;
    }

    if (estado === "bloqueado") {
      Alert.alert(
        "Cámara bloqueada",
        "Habilitá el permiso de cámara en los ajustes para sacar fotos.",
        [
          { text: "Abrir Ajustes", onPress: abrirAjustes },
          { text: "Cancelar", style: "cancel" },
        ],
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const elegirDeGaleria = async () => {
    // El selector del sistema NO requiere pedir permisos (Cumple G2.3)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const confirmarFoto = () => {
    // Acá después guardaremos la foto en el formulario
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adjuntar Foto</Text>

      {image ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: image }} style={styles.preview} />
          <Button title="Usar esta foto" onPress={confirmarFoto} />
          <View style={{ height: 10 }} />
          <Button
            title="Elegir otra"
            onPress={() => setImage(null)}
            color="gray"
          />
        </View>
      ) : (
        <View style={styles.botones}>
          <Button title="Sacar foto" onPress={tomarFoto} />
          <View style={{ height: 16 }} />
          <Button title="Elegir de la galería" onPress={elegirDeGaleria} />

          <Text style={styles.nota}>
            (El selector de galería es seguro y no requiere dar acceso a todos
            tus archivos)
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  botones: { marginTop: 20 },
  previewContainer: { alignItems: "center" },
  preview: { width: 250, height: 250, borderRadius: 10, marginBottom: 20 },
  nota: { fontSize: 12, color: "#666", textAlign: "center", marginTop: 20 },
});
