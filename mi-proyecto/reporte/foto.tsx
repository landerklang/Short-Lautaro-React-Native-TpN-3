import * as ImagePicker from "expo-image-picker";
import { View, Button, Image } from "react-native";
import { useState } from "react";

export default function FotoScreen() {
  const [image, setImage] = useState<string | null>(null);

  const pickFromLibrary = async () => {
    // El selector del sistema NO requiere permiso explícito
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const takePhoto = async () => {
    // La cámara pedirá permiso automáticamente si no lo tiene
    let result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Sacar foto" onPress={takePhoto} />
      <Button title="Elegir de la galería" onPress={pickFromLibrary} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
    </View>
  );
}
