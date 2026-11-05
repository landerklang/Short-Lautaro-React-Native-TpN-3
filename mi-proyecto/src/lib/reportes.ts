// src/lib/reportes.ts
export type EstadoReporte = "pendiente" | "en curso" | "resuelto";

export interface Reporte {
  id: string;
  titulo: string;
  descripcion: string;
  aula: string;
  categoria: string;
  fotoUri?: string;
  ubicacion?: string;
  estado: EstadoReporte;
  fecha: number;
}

// Nuestra "base de datos" en memoria
let reportes: Reporte[] = [];

export const crearReporte = (
  datos: Omit<Reporte, "id" | "estado" | "fecha">,
) => {
  const nuevoReporte: Reporte = {
    ...datos,
    id: Math.random().toString(36).substring(2, 9),
    estado: "pendiente",
    fecha: Date.now(),
  };
  reportes = [nuevoReporte, ...reportes];
  return nuevoReporte;
};

export const obtenerReportes = () => reportes;

export const obtenerReportePorId = (id: string) =>
  reportes.find((r) => r.id === id);

export const cambiarEstadoReporte = (
  id: string,
  nuevoEstado: EstadoReporte,
) => {
  reportes = reportes.map((r) =>
    r.id === id ? { ...r, estado: nuevoEstado } : r,
  );
};

export let borrador = {
  fotoUri: "",
  ubicacion: "",
  version: 0, // <-- NUEVO: Para forzar actualizaciones
};

export const guardarBorrador = (datos: Partial<typeof borrador>) => {
  borrador = { ...borrador, ...datos, version: borrador.version + 1 };
};

export const limpiarBorrador = () => {
  borrador = { fotoUri: "", ubicacion: "", version: 0 };
};

// src/lib/reportes.ts
export interface Aviso {
  id: string;
  mensaje: string;
  fecha: number;
}

let avisos: Aviso[] = [];

export const obtenerAvisos = () => avisos;

export const agregarAviso = (mensaje: string) => {
  const nuevoAviso: Aviso = {
    id: Math.random().toString(36).substring(2, 9),
    mensaje,
    fecha: Date.now(),
  };
  avisos = [nuevoAviso, ...avisos];
};
