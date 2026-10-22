import { CameraView, useCameraPermissions } from "expo-camera";
import { Button } from "react-native";
export default function Escanear() {
  const [permiso, pedirPermiso] = useCameraPermissions();
  if (permiso.status === "granted") {
    return <CameraView style={{ flex: 1 }} facing="back" />;
  }
  return (
    <Explicacion texto="Usamos la cámara para leer el QR del aula.">
      <Button title="Permitir" onPress={pedirPermiso} />
    </Explicacion>
  );
}
