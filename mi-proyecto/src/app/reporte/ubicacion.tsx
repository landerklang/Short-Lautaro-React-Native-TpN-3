// app/reporte/ubicacion.tsx
import { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import * as Location from "expo-location";
import { router } from "expo-router";
import { usePermiso } from "../../hooks/usepermiso";

const SECTORES = ["Patio", "Estacionamiento", "Pasillo", "Aula", "Otro"];

export default function MarcarUbicacion() {
  const { estado, parcial, pedir, abrirAjustes } = usePermiso("ubicacion");
  const [cargandoGPS, setCargandoGPS] = useState(false);
  const [ubicacion, setUbicacion] = useState<{
    tipo: "gps" | "aproximada" | "sector";
    valor: string;
  } | null>(null);

  const [sectorManual, setSectorManual] = useState("");
  const [mostrarManual, setMostrarManual] = useState(false);

  const obtenerUbicacion = async () => {
    setCargandoGPS(true);
    try {
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Si el permiso es parcial (aproximado) o la precisión es muy baja, lo marcamos como aproximada
      const esAproximada =
        parcial || (loc.coords.accuracy && loc.coords.accuracy > 1000);

      if (esAproximada) {
        setUbicacion({ tipo: "aproximada", valor: "Ubicación aproximada" });
      } else {
        setUbicacion({
          tipo: "gps",
          valor: `${loc.coords.latitude.toFixed(5)}, ${loc.coords.longitude.toFixed(5)}`,
        });
      }
    } catch (error) {
      // Si falla, pasamos a manual
      setMostrarManual(true);
    } finally {
      setCargandoGPS(false);
    }
  };

  const guardarManual = () => {
    if (!sectorManual.trim()) return;
    setUbicacion({ tipo: "sector", valor: sectorManual.trim() });
  };

  const confirmar = () => {
    // Acá después guardaremos la ubicación en el formulario
    router.back();
  };

  // 1. Cargando
  if (estado === "cargando") {
    return (
      <View style={styles.centrado}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 2. Confirmación
  if (ubicacion) {
    return (
      <View style={styles.centrado}>
        <Text style={styles.titulo}>Ubicación seleccionada</Text>
        <Text style={styles.valor}>{ubicacion.valor}</Text>
        <View style={{ height: 20 }} />
        <Button title="Confirmar y volver" onPress={confirmar} />
        <View style={{ height: 10 }} />
        <Button
          title="Elegir otra"
          onPress={() => {
            setUbicacion(null);
            setMostrarManual(false);
          }}
          color="gray"
        />
      </View>
    );
  }

  // 3. Manual o Bloqueado
  if (mostrarManual || estado === "bloqueado") {
    return (
      <View style={styles.centrado}>
        <Text style={styles.titulo}>Elegir sector a mano</Text>
        <Text style={styles.texto}>Seleccioná dónde está el problema:</Text>

        <View style={styles.sectores}>
          {SECTORES.map((sec) => (
            <Button
              key={sec}
              title={sec}
              onPress={() => setSectorManual(sec)}
              color={sectorManual === sec ? "#005bb5" : "#666"}
            />
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="O escribí el sector exacto"
          value={sectorManual}
          onChangeText={setSectorManual}
        />

        <Button
          title="Usar este sector"
          onPress={guardarManual}
          disabled={!sectorManual.trim()}
        />

        {estado === "bloqueado" && (
          <View style={{ marginTop: 20 }}>
            <Text style={styles.textoChico}>
              El permiso de ubicación está bloqueado.
            </Text>
            <Button
              title="Abrir Ajustes"
              onPress={abrirAjustes}
              color="#c62828"
            />
          </View>
        )}
      </View>
    );
  }

  // 4. Preguntable
  if (estado !== "concedido") {
    return (
      <View style={styles.centrado}>
        <Text style={styles.titulo}>Ubicación</Text>
        <Text style={styles.texto}>
          Usamos tu ubicación para marcar dónde está el problema.
        </Text>

        {estado === "preguntable" ? (
          <>
            <Button title="Continuar" onPress={pedir} />
            <View style={{ height: 16 }} />
            <Button
              title="Elegir sector a mano"
              onPress={() => setMostrarManual(true)}
              color="gray"
            />
          </>
        ) : (
          <Button
            title="Elegir sector a mano"
            onPress={() => setMostrarManual(true)}
            color="#005bb5"
          />
        )}
      </View>
    );
  }

  // 5. Concedido (Ofrecer GPS)
  return (
    <View style={styles.centrado}>
      <Text style={styles.titulo}>Marcar ubicación</Text>
      <Text style={styles.texto}>
        Obtené tu ubicación actual o elegí un sector a mano.
      </Text>

      {cargandoGPS ? (
        <ActivityIndicator size="large" color="#005bb5" />
      ) : (
        <>
          <Button title="Obtener ubicación actual" onPress={obtenerUbicacion} />
          <View style={{ height: 16 }} />
          <Button
            title="Elegir sector a mano"
            onPress={() => setMostrarManual(true)}
            color="gray"
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  centrado: { flex: 1, justifyContent: "center", padding: 24 },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  texto: { fontSize: 16, textAlign: "center", marginBottom: 24, color: "#444" },
  textoChico: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    textAlign: "center",
  },
  valor: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    color: "#005bb5",
  },
  sectores: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    padding: 10,
    borderRadius: 5,
    marginBottom: 16,
  },
});
