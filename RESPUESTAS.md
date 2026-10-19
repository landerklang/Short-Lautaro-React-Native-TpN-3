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

# B1. Clasificá los permisos

Indicá el tipo (de instalación / de tiempo de ejecución / especial) y cómo los obtiene la app.

| Permiso                 | Tipo                                                      | ¿Cómo se obtiene?                                                                                                                                                                                               |
| :---------------------- | :-------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| INTERNET                | De instalación (Normal)                                   | Se declara en el manifiesto (`AndroidManifest.xml`) y el sistema operativo lo concede automáticamente al momento de la instalación.                                                                             |
| CAMERA                  | De tiempo de ejecución (Peligroso / Runtime)              | Se declara en el manifiesto y se solicita en código durante la ejecución; el usuario decide a través del diálogo nativo del sistema.                                                                            |
| VIBRATE                 | De instalación (Normal)                                   | Se declara en el manifiesto (`AndroidManifest.xml`) y el sistema lo otorga de manera automática al instalar la app sin confirmación explícita.                                                                  |
| SYSTEM_ALERT_WINDOW     | Especial                                                  | Requiere declaración en el manifiesto y dirigir al usuario a la pantalla dedicada de configuración del sistema (`Settings.ACTION_MANAGE_OVERLAY_PERMISSION`) para habilitar "Mostrar sobre otras aplicaciones". |
| POST_NOTIFICATIONS      | De tiempo de ejecución (Runtime - a partir de Android 13) | Se declara en el manifiesto y se solicita en tiempo de ejecución mediante el diálogo emergente del sistema para permitir notificaciones.                                                                        |
| ACCESS_NETWORK_STATE    | De instalación (Normal)                                   | Se declara en el archivo de configuración/manifiesto y el sistema lo aprueba automáticamente al instalar.                                                                                                       |
| READ_CONTACTS           | De tiempo de ejecución (Peligroso / Runtime)              | Se declara en el manifiesto y se pide de forma interactiva en la app mediante el diálogo del sistema operativo en tiempo de ejecución.                                                                          |
| SCHEDULE_EXACT_ALARM    | Especial                                                  | Se declara en el manifiesto y, a partir de Android 13/14, puede requerir que la persona usuaria lo conceda en una pantalla especial de configuración del sistema ("Alarmas y recordatorios").                   |
| RECORD_AUDIO            | De tiempo de ejecución (Peligroso / Runtime)              | Se declara en el manifiesto y se solicita dinámicamente en tiempo de ejecución con la confirmación expresa del usuario mediante diálogo emergente.                                                              |
| MANAGE_EXTERNAL_STORAGE | Especial                                                  | Se declara en el manifiesto y exige enviar al usuario a la vista de ajustes avanzados del sistema (`Settings.ACTION_MANAGE_ALL_FILES_ACCESS_PERMISSION`) para otorgar acceso a todos los archivos.              |

# B2. Grupos y nombres

### a) ¿Qué es un grupo de permisos? Si la app pide ACCESS_FINE_LOCATION y ACCESS_COARSE_LOCATION juntos, ¿cuántos diálogos ve la persona?

-RTA: Es un agrupamiento lógico que hace Android de varios permisos individuales que están relacionados con una misma capacidad o recurso del dispositivo (por ejemplo, el grupo `LOCATION`, `CAMERA`),la persona ve un solo diálogo.

### b) ¿Qué prefijo lleva el nombre completo de un permiso? Escribí el nombre completo del permiso de cámara.

-RTA: El prefijo Lleva android.permission y el nombre completo es android.permission.CAMERA

### c) ¿Qué son los permisos de firma (signature)? ¿Por qué no se usan en apps comunes?

-RTA: Son permisos de seguridad avanzada definidos con `android:protectionLevel="signature"`. El sistema operativo los otorga automáticamente, sin pedir confirmación al usuario, únicamente si la app que los solicita está firmada con la misma clave criptográfica. Porque hay imcompatiblidad de firmas debido a que esta pensados para la comunicacion interna entre aplicaciones de un mismo desarrollador.

# B3. Leé el manifiesto

# Este es el AndroidManifest.xml que generó npx expo prebuild. Observalo y respondé:

Taller Complementario – React Native II · Instituto Politécnico Formosa · Trabajo Práctico N° 3 3
android/app/src/main/AndroidManifest.xml (generado)
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
 xmlns:tools="http://schemas.android.com/tools">
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE"
 android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.RECORD_AUDIO"
 tools:node="remove" />
</manifest>

a) ¿Qué permisos se conceden solos al instalar y cuáles hay que pedir además en tiempo de
ejecución?

RTA: Los permisos que se conceden al instalar son( `android.permission.INTERNET`) y a los que se deben de pedir en tiempo de ejecucion son (`android.permission.CAMERA`,`android.permission.ACCESS_COARSE_LOCATION`,`android.permission.ACCESS_FINE_LOCATION`,`android.permission.POST_NOTIFICATIONS`,`android.permission.READ_EXTERNAL_STORAGE`)

b) ¿Qué significa android:maxSdkVersion="32"? ¿Qué permisos reemplazan a
READ_EXTERNAL_STORAGE desde Android 13?

<!-- si son superior a la version indicada el sistema igrona por completo esta declaracion y la aplicacion no solicita este permiso -->

RTA: Significa que le esta indicando al sistema operativo que este permiso solo debe solicitarse y otorgarse en dispositivos cuya versión de Android sea como máximo el nivel de API 32.Los permisos que reemplaza a READ_EXTERNAL_STORAGE desde Android 13 se dividen segun su permiso granulares y especificos segun el tipo de contenido son:`android.permission.READ_MEDIA_IMAGES` (para acceder a fotografías e imágenes),`android.permission.READ_MEDIA_VIDEO` (para acceder a videos) y por ultimo `android.permission.READ_MEDIA_AUDIO` (para acceder a música y archivos de audio).
