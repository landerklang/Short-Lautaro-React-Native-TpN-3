# A1. Conceptos

### a) ¿Qué es un permiso? ¿Qué papel cumplen la app, el sistema operativo y la persona usuaria?

- **¿Qué es un permiso?:** Es la autorización que la persona usuaria le concede a una aplicación para acceder a recursos sensibles o privados del dispositivo (como la cámara, el micrófono, la ubicación o los contactos).
- **Papel de la app:** Declara previamente qué recursos necesita y solicita el acceso en el momento adecuado para poder ejecutar sus funciones.
- **Papel del sistema operativo:** Actúa como intermediario y garante de seguridad: muestra el diálogo oficial de solicitud al usuario (el cual la app no puede falsificar), guarda la decisión tomada y restringe o habilita el acceso físico al hardware/datos según corresponda.
- **Papel de la persona usuaria:** Es quien tiene el control final; decide conscientemente si concede el permiso, lo rechaza o asigna un acceso parcial o temporal (por ejemplo, "solo mientras la app está en uso" o "esta sola vez").

### b) ¿Qué es la caja de arena (sandbox) y qué relación tiene con los permisos? ¿Qué puede hacer una app sin ningún permiso?

- **¿Qué es la caja de arena (sandbox)?:** Es un espacio aislado y seguro donde los componente puede interactuar sin que esto afecten a otra aplicacion.

- **¿Qué relación tiene con los permisos?** La relacion central es que el sandbox es la regla por defectos y los permisos son las excepciones autorizados

- **¿Qué puede hacer una app sin ningún permiso?:** Una app sin permiso puede mostrar pantalla, guardar sus propios datos y conectarse a internet

### c) Nombrá las cuatro razones por las que existen los permisos y dá un ejemplo concreto de cada una.

1. **Razón 1:** La primera razon es la privacidad un ejemplo seria una app de calculadora no puede leer tu lista de contactos, tus fotos privadas ni tus mensajes de texto.

2. **Razón 2:** La segunda es seguridad un ejemplo seria si una app maliciosa se cuela, el daño queda limitado a lo que se le permitio.

3. **Razón 3:** La tercera transparencia un ejemplo seria que si el sistema muestra lo que esta utilizado la app: microfono,indicadores de camaras, ubicacion.

4. **Razón 4:** la cuarta control un ejemplo seria que las decisiones que tomo el usuario las puede cambiar en ajuste

---

### d) En la analogía del portero del edificio, ¿quién es la visita, quién el portero y quién el dueño del departamento? ¿Qué significa que “el portero se acuerda de la respuesta”?

-El visitante es la aplicacion que viene de afuera y solicita ingresar al dispositivo para usar un recurso, el portero es el sistema que actua como intermediario en la puerta de entrada, intercepta la petición de la app, muestra el diálogo al dueño y hace cumplir la decisión tomada, el dueño del departamento Es el usuaria, quien es dueña del dispositivo y de sus datos sensibles, y tiene la autoridad final para autorizar o denegar el acceso. el significado que el sistema operativo guarda y recuerda la decisión tomada por el usuario (persiste el estado del permiso). De esta forma, la app no tiene que volver a mostrar el diálogo de autorización cada vez que requiere el recurso.

# A2. Declarar y solicitar

Todo permiso pasa por dos momentos. Completá la tabla.

Aspecto | Declarar (al compilar) | Solicitar (al ejecutar) |
¿Qué se hace? | Se informa formalmente al sistema operativo que la aplicación tiene la capacidad técnica de utilizar un recurso sensible determinado. | Se invoca la función en código para que el sistema le pregunte directamente a la persona usuaria en tiempo de ejecución si autoriza o deniega el acceso.

¿Dónde / cómo en Android? | En el archivo `AndroidManifest.xml`, agregando etiquetas `<uses-permission android:name="..." />`. | Mediante la API de JavaScript/React Native con `PermissionsAndroid.request(...)` o librerías nativas.
¿Dónde / cómo en iOS? | En el archivo `Info.plist`, agregando las claves de uso correspondientes (por ejemplo `NSCameraUsageDescription`) acompañadas del texto que explica el motivo del uso. | Invocando las APIs de Objective-C/Swift o los módulos de React Native; iOS dispara el diálogo nativo automáticamente la primera vez que se llama al recurso.
¿Dónde / cómo en Expo? | En `app.json` (o `app.config.js`), configurando `android.permissions` para Android y los plugins de configuración (`plugins`) o `ios.infoPlist` para iOS. | Usando los hooks o métodos provistos por los módulos de Expo, como `useCameraPermissions()`, `requestCameraPermissionsAsync()` o la librería `expo-camera`/`expo-location`.
¿Qué pasa si se omite? | El sistema operativo bloquea la acción directamente o la app crashea al intentar solicitarlo, ya que no tiene la declaración previa exigida por el binario. | La aplicación no obtiene la autorización del usuario; al intentar invocar la cámara, GPS o hardware sensible, la llamada falla, arroja un error de permisos o devuelve datos vacíos/falsos.

# A3. Verdadero o falso

Indicá V o F y justificá las falsas.

### a) El diálogo de permiso lo dibuja tu app con componentes de React Native. F

-RTA: Porque el diálogo lo dibuja exclusivamente el sistema operativo (Android o iOS) a través de un proceso del sistema para evitar que las aplicaciones puedan falsificar, alterar o engañar al usuario en la solicitud de acceso.

### b) En Expo, la fuente de verdad de los permisos es app.json (o app.config.ts), no el AndroidManifest.xml. V

### c) Agregar un permiso nuevo en el Info.plist se puede publicar con una actualización OTA. F

-RTA: Porque las actualizaciones OTA (Over-The-Air, como Expo Updates) solo actualizan el paquete de JavaScript y recursos estáticos. Modificar el `Info.plist` altera el código nativo compilado, por lo que exige generar un nuevo binario (`.ipa`) y volver a publicarlo a través del App Store / TestFlight.

### d) Si tu código pide un permiso que no está en el manifiesto, Android igual muestra el diálogo. F

-RTA: Porque Android ignora la solicitud en tiempo de ejecución o devuelve inmediatamente que el permiso fue denegado sin mostrar diálogo alguno, debido a que el sistema operativo exige que todo permiso peligroso esté declarado previamente en el manifiesto.

### e) El paquete expo-permissions es la forma recomendada de pedir permisos en SDK 57. F

-RTA: Porque el paquete `expo-permissions` quedó obsoleto (deprecated) y fue discontinuado hace varias versiones. La forma recomendada es utilizar los métodos y hooks específicos provistos directamente por cada módulo (por ejemplo, `useCameraPermissions()` de `expo-camera` o `requestForegroundPermissionsAsync()` de `expo-location`).

### f) En iOS, las notificaciones no llevan texto de propósito en el Info.plist. V

### g) Con acceso limitado a fotos, status vale 'granted' y el matiz está en accessPrivileges. V

### h) Desinstalar y reinstalar la app es la forma confiable de volver a “sin decidir” en las dos plataformas. V

## A4. Los estados de un permiso

### a) Diagrama de estados de un permiso en Android y en iOS. ¿Cuál es la diferencia central entre las dos plataformas?

![Diagrama de estados de permisos en Android e iOS](./Captura%20de%20pantalla%202026-10-18%20202227.png)

### b) Completá qué devuelve Expo en cada estado:

| Estado                             | status       | canAskAgain | ¿Puede aparecer el diálogo? |
| :--------------------------------- | :----------- | :---------- | :-------------------------- |
| Sin decidir                        | undetermined | true        | Sí                          |
| Concedido                          | granted      | true        | No                          |
| Denegado (se puede volver a pedir) | denied       | true        | Sí                          |
| Bloqueado                          | denied       | false       | No                          |
