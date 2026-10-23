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
