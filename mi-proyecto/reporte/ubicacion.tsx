import * as Location from "expo-location";
import { View, Text, Button, Alert } from "react-native";

export default function UbicacionScreen() {
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      // Si deniega, ofrecer elegir sector a mano
      Alert.alert(
        "Ubicación no disponible",
        "¿Querés elegir el sector manualmente?",
        [
          {
            text: "Elegir sector",
            onPress: () => {
              /* Abrir selector */
            },
          },
          { text: "Cancelar", style: "cancel" },
        ],
      );
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    // Usar loc.coords para marcar
  };

  return (
    <View>
      <Button title="Marcar ubicación actual" onPress={getLocation} />
      <Button
        title="Elegir sector a mano"
        onPress={() => {
          /* ... */
        }}
      />
    </View>
  );
}
