import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { View, Text } from "react-native";

export default function PermisosPanel() {
  const [cameraPermission, requestCamera] = useCameraPermissions();
  const [locStatus, setLocStatus] = useState("");

  useFocusEffect(
    useCallback(() => {
      (async () => {
        // La cámara usa el valor del hook directamente
        // La ubicación sigue usando getForegroundPermissionsAsync (existe en expo-location)
        const loc = await Location.getForegroundPermissionsAsync();
        setLocStatus(loc.status);
      })();
    }, []),
  );

  return (
    <View>
      <Text>Cámara: {cameraPermission?.status ?? "cargando"}</Text>
      <Text>Ubicación: {locStatus}</Text>
    </View>
  );
}
