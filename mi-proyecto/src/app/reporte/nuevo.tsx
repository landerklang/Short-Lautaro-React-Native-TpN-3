// app/reporte/nuevo.tsx
import { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { crearReporte, borrador, limpiarBorrador } from "../../lib/reportes";

export default function NuevoReporte() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [aula, setAula] = useState("");
  const [categoria, setCategoria] = useState("electricidad");

  // Cada vez que volvemos a esta pantalla, leemos el borrador (si hay foto o ubicación)
  useFocusEffect(
    useCallback(() => {
      // Forzamos un re-render para leer los valores actualizados del borrador
      setTitulo((t) => t);
    }, []),
  );

  const guardar = () => {
    if (!titulo || !descripcion || !aula) {
      Alert.alert(
        "Faltan datos",
        "Por favor, completá el título, la descripción y el aula.",
      );
      return;
    }

    crearReporte({
      titulo,
      descripcion,
      aula,
      categoria,
      fotoUri: borrador.fotoUri || undefined,
      ubicacion: borrador.ubicacion || undefined,
    });

    limpiarBorrador(); // Limpiamos para el próximo reporte
    Alert.alert("Éxito", "Reporte creado correctamente");
    router.replace("/");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 60 }}
    >
      <Text style={styles.title}>Nuevo Reporte</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ej: Luz quemada"
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={descripcion}
        onChangeText={setDescripcion}
        multiline
        placeholder="Describí el problema..."
      />

      <Text style={styles.label}>Aula</Text>
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 16 }}>
        <TextInput
          style={[styles.input, { flex: 1, marginBottom: 0 }]}
          value={aula}
          onChangeText={setAula}
          placeholder="Ej: Aula 204"
        />
        <Button
          title="Escanear"
          onPress={() => router.push("/reporte/escanear")}
        />
      </View>

      <Text style={styles.label}>Categoría</Text>
      <View style={styles.categorias}>
        {["electricidad", "agua", "mobiliario", "equipos"].map((cat) => (
          <Button
            key={cat}
            title={cat.toUpperCase()}
            color={categoria === cat ? "#005bb5" : "#666"}
            onPress={() => setCategoria(cat)}
          />
        ))}
      </View>

      <View style={{ height: 20 }} />

      <Button
        title={borrador.fotoUri ? "Cambiar Foto" : "Adjuntar Foto"}
        onPress={() => router.push("/reporte/foto")}
      />
      {borrador.fotoUri ? (
        <Image source={{ uri: borrador.fotoUri }} style={styles.preview} />
      ) : null}

      <View style={{ height: 16 }} />

      <Button
        title={borrador.ubicacion ? "Cambiar Ubicación" : "Marcar Ubicación"}
        onPress={() => router.push("/reporte/ubicacion")}
      />
      {borrador.ubicacion ? (
        <Text style={styles.ubicacionText}>
          Ubicación: {borrador.ubicacion}
        </Text>
      ) : null}

      <View style={{ height: 40 }} />

      <Button title="Guardar Reporte" onPress={guardar} color="#2e7d32" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "600", marginBottom: 8, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  categorias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
  },
  preview: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginTop: 12,
    resizeMode: "cover",
  },
  ubicacionText: {
    marginTop: 8,
    fontSize: 14,
    color: "#005bb5",
    fontStyle: "italic",
  },
});
