# Mantenimiento IPF

Aplicación móvil desarrollada con Expo Router (SDK 57) para reportar desperfectos en el edificio del Instituto.

## Estructura de carpetas

```
app/
├── (tabs)/
│   ├── _layout.tsx          # Configuración de las pestañas
│   ├── index.tsx            # Inicio (Lista de reportes)
│   ├── avisos.tsx           # Bandeja de avisos
│   └── permisos/
│       └── index.tsx        # Panel de estado de permisos
├── permisos/
│   └── [recurso].tsx        # Pantalla previa modal
├── reporte/
│   ├── nuevo.tsx            # Formulario de creación
│   ├── escanear.tsx         # Escáner QR
│   ├── foto.tsx             # Adjuntar foto (Cámara/Galería)
│   ├── ubicacion.tsx        # Marcar ubicación
│   └── [id].tsx             # Detalle del reporte
├── _layout.tsx              # Stack raíz
└── ajustes-app.tsx          # Interruptor de notificaciones
```
