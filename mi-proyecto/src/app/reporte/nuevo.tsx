// app/reporte/nuevo.tsx
import { useState } from "react";
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
import { router, useLocalSearchParams } from "expo-router";
import { crearReporte } from "../../lib/reportes";

export default function NuevoReporte() {
  // Estados del formulario
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [aula, setAula] = useState("");
  const [categoria, setCategoria] = useState("electricidad");

  // Acá recibimos los datos que vuelven de las otras pantallas
  const params = useLocalSearchParams();
  const fotoUri = params.foto as string;
  const ubicacion = params.ubicacion as string;

  const guardar = () => {
    if (!titulo || !descripcion || !aula) {
      Alert.alert(
        "Faltan datos",
        "Por favor, completá el título, la descripción y el aula.",
      );
      return;
    }

    // Guardamos en nuestro Store
    crearReporte({
      titulo,
      descripcion,
      aula,
      categoria,
      fotoUri: fotoUri || undefined,
      ubicacion: ubicacion || undefined,
    });

    Alert.alert("Éxito", "Reporte creado correctamente");
    router.replace("/"); // Volvemos al inicio y recargamos
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
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
        {/* Navegamos al escáner. Si vuelve un código, lo seteamos en el aula */}
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

      {/* Botón para adjuntar foto */}
      <Button
        title={fotoUri ? "Cambiar Foto" : "Adjuntar Foto"}
        onPress={() => router.push("/reporte/foto")}
      />
      {fotoUri && <Image source={{ uri: fotoUri }} style={styles.preview} />}

      <View style={{ height: 16 }} />

      {/* Botón para ubicación */}
      <Button
        title={ubicacion ? "Cambiar Ubicación" : "Marcar Ubicación"}
        onPress={() => router.push("/reporte/ubicacion")}
      />
      {ubicacion && (
        <Text style={styles.ubicacionText}>Ubicación: {ubicacion}</Text>
      )}

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
