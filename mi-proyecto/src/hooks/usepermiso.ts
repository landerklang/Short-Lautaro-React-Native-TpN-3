// src/hooks/usePermiso.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, Linking, Platform } from "react-native";
import { Camera } from "expo-camera";
import * as Location from "expo-location";
import * as Notifications from "expo-notifications";
import { Recurso, RECURSO_SIN_PERMISO } from "../lib/permisos";

export type EstadoPermiso =
  | "cargando"
  | "concedido"
  | "preguntable"
  | "bloqueado";

export interface UsePermisoResult {
  estado: EstadoPermiso;
  parcial: boolean; // true si es "limited" (iOS cámara) o "approximate" (ubicación)
  pedir: () => Promise<void>;
  abrirAjustes: () => void;
}

// Tipo interno para normalizar lo que devuelve cada API
interface RawPermiso {
  granted: boolean;
  canAskAgain: boolean;
  status: string;
  // Campos específicos
  accuracy?: string; // 'approximate' | 'precise' | etc.
  ios?: { accessPrivileges?: string };
  accessPrivileges?: string; // por si viene en la raíz (versiones viejas)
}

async function consultarPermiso(recurso: Recurso): Promise<RawPermiso | null> {
  if (RECURSO_SIN_PERMISO[recurso]) {
    return { granted: true, canAskAgain: false, status: "granted" };
  }

  switch (recurso) {
    case "camara": {
      const p = await Camera.getCameraPermissionsAsync();
      return {
        granted: p.granted,
        canAskAgain: p.canAskAgain,
        status: p.status,
        accessPrivileges: (p as any).accessPrivileges,
        ios: (p as any).ios,
      };
    }
    case "ubicacion": {
      const p = await Location.getForegroundPermissionsAsync();
      return {
        granted: p.granted,
        canAskAgain: p.canAskAgain,
        status: p.status,
        accuracy: (p as any).accuracy,
      };
    }
    case "notificaciones": {
      const p = await Notifications.getPermissionsAsync();
      return {
        granted: p.granted,
        canAskAgain: p.canAskAgain,
        status: p.status,
      };
    }
    default:
      return null;
  }
}

async function solicitarPermiso(recurso: Recurso): Promise<RawPermiso | null> {
  if (RECURSO_SIN_PERMISO[recurso]) return consultarPermiso(recurso);

  switch (recurso) {
    case "camara": {
      const p = await Camera.requestCameraPermissionsAsync();
      return {
        granted: p.granted,
        canAskAgain: p.canAskAgain,
        status: p.status,
        accessPrivileges: (p as any).accessPrivileges,
        ios: (p as any).ios,
      };
    }
    case "ubicacion": {
      const p = await Location.requestForegroundPermissionsAsync();
      return {
        granted: p.granted,
        canAskAgain: p.canAskAgain,
        status: p.status,
        accuracy: (p as any).accuracy,
      };
    }
    case "notificaciones": {
      const p = await Notifications.requestPermissionsAsync();
      return {
        granted: p.granted,
        canAskAgain: p.canAskAgain,
        status: p.status,
      };
    }
    default:
      return null;
  }
}

function derivarEstado(raw: RawPermiso | null): {
  estado: EstadoPermiso;
  parcial: boolean;
} {
  if (!raw) return { estado: "cargando", parcial: false };

  let estado: EstadoPermiso;
  if (raw.granted) {
    estado = "concedido";
  } else if (raw.canAskAgain) {
    estado = "preguntable";
  } else {
    estado = "bloqueado";
  }

  // Parcial:
  // - Cámara iOS: accessPrivileges === 'limited'
  // - Ubicación: accuracy === 'approximate' (o cualquier valor que no sea 'precise'/'full')
  let parcial = false;
  if (
    raw.accessPrivileges === "limited" ||
    raw.ios?.accessPrivileges === "limited"
  ) {
    parcial = true;
  }
  if (raw.accuracy && raw.accuracy !== "precise" && raw.accuracy !== "full") {
    parcial = true;
  }

  return { estado, parcial };
}

export function usePermiso(recurso: Recurso): UsePermisoResult {
  const [estado, setEstado] = useState<EstadoPermiso>("cargando");
  const [parcial, setParcial] = useState(false);
  const appState = useRef(AppState.currentState);

  const refrescar = useCallback(async () => {
    const raw = await consultarPermiso(recurso);
    const { estado: nuevoEstado, parcial: nuevoParcial } = derivarEstado(raw);
    setEstado(nuevoEstado);
    setParcial(nuevoParcial);
  }, [recurso]);

  // Carga inicial y cuando cambia el recurso
  useEffect(() => {
    setEstado("cargando");
    refrescar();
  }, [refrescar]);

  // Refrescar al volver de Ajustes (AppState)
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        refrescar();
      }
      appState.current = nextAppState;
    });

    return () => subscription.remove();
  }, [refrescar]);

  const pedir = useCallback(async () => {
    setEstado("cargando");
    const raw = await solicitarPermiso(recurso);
    const { estado: nuevoEstado, parcial: nuevoParcial } = derivarEstado(raw);
    setEstado(nuevoEstado);
    setParcial(nuevoParcial);
  }, [recurso]);

  const abrirAjustes = useCallback(() => {
    Linking.openSettings();
  }, []);

  return { estado, parcial, pedir, abrirAjustes };
}
