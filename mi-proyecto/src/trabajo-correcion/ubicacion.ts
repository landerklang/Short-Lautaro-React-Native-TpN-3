import * as Location from "expo-location";

export async function activarSeguimiento(): Promise<boolean> {
  // 1. Solicitar primero el permiso en primer plano (en uso)
  const enUso = await Location.requestForegroundPermissionsAsync();
  if (!enUso.granted) {
    return false;
  }

  // 2. Solo tras conceder primer plano, solicitar segundo plano (siempre)
  const siempre = await Location.requestBackgroundPermissionsAsync();
  return siempre.granted;
}
