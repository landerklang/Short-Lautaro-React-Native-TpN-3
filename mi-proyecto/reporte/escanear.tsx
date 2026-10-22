import { CameraView, useCameraPermissions } from "expo-camera";
import { View, Text, Button, Linking } from "react-native";

export default function EscanearScreen() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) return <View />; // Cargando

  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <Text>Necesitamos la cámara para leer el QR del aula.</Text>
        {permission.canAskAgain ? (
          <Button title="Dar permiso" onPress={requestPermission} />
        ) : (
          <Button
            title="Abrir Ajustes"
            onPress={() => Linking.openSettings()}
          />
        )}
      </View>
    );
  }

  return (
    <CameraView
      style={{ flex: 1 }}
      barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
      onBarcodeScanned={({ data }) => {
        // data contiene el aula (ej. "Aula 204")
        // Aquí guardarías el dato y volverías atrás
      }}
    />
  );
}
