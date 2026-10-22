// src/lib/ubicacion.ts
import * as Location from "expo-location";

interface ResultadoUbicacion {
  coords: Location.LocationObjectCoords;
  aproximada: boolean;
}

// b) Activar seguimiento con el orden correcto
export async function activarSeguimiento(): Promise<boolean> {
  const enUso = await Location.requestForegroundPermissionsAsync();
  if (!enUso.granted) {
    return false;
  }

  const siempre = await Location.requestBackgroundPermissionsAsync();
  return siempre.granted;
}

// c) Obtener ubicación contemplando precisión aproximada de iOS y Android
export async function obtenerUbicacion(): Promise<ResultadoUbicacion | null> {
  try {
    const respuesta = await Location.requestForegroundPermissionsAsync();

    if (!respuesta.granted) {
      return null;
    }

    // Casteo a any para acceder con seguridad a las propiedades de precisión de ambas plataformas
    const res = respuesta as any;
    const aproximada =
      res.android?.accuracy === "coarse" ||
      res.ios?.scope === "reduced" ||
      res.accuracy === "reduced" ||
      res.accuracy === "none";

    const ubicacion = await Location.getCurrentPositionAsync({});

    return {
      coords: ubicacion.coords,
      aproximada,
    };
  } catch (error) {
    return null;
  }
}
