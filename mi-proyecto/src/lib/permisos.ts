// src/lib/permisos.ts
import { Platform } from "react-native";

export type Recurso = "camara" | "ubicacion" | "notificaciones" | "galeria";

export const BENEFICIOS: Record<Recurso, string> = {
  camara:
    "Necesitamos la cámara para escanear el código QR del aula y adjuntar fotos del desperfecto.",
  ubicacion:
    "Usamos tu ubicación para marcar dónde está el problema (patio, pasillo, estacionamiento).",
  notificaciones: "Te avisaremos cuando tu reporte haya sido resuelto.",
  galeria:
    "Podés elegir una foto existente de tu galería para adjuntar al reporte.",
};

// Para el panel de permisos (G2.9)
export const NOMBRES: Record<Recurso, string> = {
  camara: "Cámara",
  ubicacion: "Ubicación",
  notificaciones: "Notificaciones",
  galeria: "Galería (selector)",
};

// La galería en Android/iOS modernos NO requiere permiso para launchImageLibraryAsync.
// La tratamos como "siempre concedida" para que el panel la muestre sin botón de pedir.
export const RECURSO_SIN_PERMISO: Partial<Record<Recurso, boolean>> = {
  galeria: true,
};
