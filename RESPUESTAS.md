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

### a) ¿Qué permisos se conceden solos al instalar y cuáles hay que pedir además en tiempo de ejecución?

RTA: Los permisos que se conceden al instalar son( `android.permission.INTERNET`) y a los que se deben de pedir en tiempo de ejecucion son (`android.permission.CAMERA`,`android.permission.ACCESS_COARSE_LOCATION`,`android.permission.ACCESS_FINE_LOCATION`,`android.permission.POST_NOTIFICATIONS`,`android.permission.READ_EXTERNAL_STORAGE`)

### b) ¿Qué significa android:maxSdkVersion="32"? ¿Qué permisos reemplazan a READ_EXTERNAL_STORAGE desde Android 13?

<!-- si son superior a la version indicada el sistema igrona por completo esta declaracion y la aplicacion no solicita este permiso -->

RTA: Significa que le esta indicando al sistema operativo que este permiso solo debe solicitarse y otorgarse en dispositivos cuya versión de Android sea como máximo el nivel de API 32.Los permisos que reemplaza a READ_EXTERNAL_STORAGE desde Android 13 se dividen segun su permiso granulares y especificos segun el tipo de contenido son:`android.permission.READ_MEDIA_IMAGES` (para acceder a fotografías e imágenes),`android.permission.READ_MEDIA_VIDEO` (para acceder a videos) y por ultimo `android.permission.READ_MEDIA_AUDIO` (para acceder a música y archivos de audio).

### c) ¿Qué hace tools:node="remove"? Escribí el fragmento de app.json que lo genera.

RTA:Lo que hace es indicarle a las herramientas de compilación de Gradle que eliminen por completo ese elemento del `AndroidManifest.xml` final empaquetado, incluso si alguna librería o dependencia de terceros lo incluyó en su propio manifiesto.

_Fragmento_
{
"expo": {
"android": {
"blockedPermissions": [
"android.permission.RECORD_AUDIO"
]
}
}
}

### d) Necesitás agregar SCHEDULE_EXACT_ALARM, que ninguna librería declara. ¿En qué propiedad de app.json va?

RTA: Va dentro del arreglo de la propiedad `android.permissions`.
ejemplo de codigo

```json
{
  "expo": {
    "android": {
      "permissions": ["android.permission.SCHEDULE_EXACT_ALARM"]
    }
  }
}
```

### e) ¿Por qué en Expo no conviene editar este archivo a mano? ¿Funciona blockedPermissions en Expo Go?

RTA:Porque En el flujo de trabajo gestionado de Expo, la carpeta `android/` y el archivo `AndroidManifest.xml` son artefactos generados dinámicamente a partir de la configuración definida en `app.json`,si se editan a mano, cualquier ejecución posterior de comandos como `npx expo prebuild --clean` o los procesos de compilación en la nube (EAS Build) sobreescribirán por completo el archivo.No, no funciona porque la aplicacion expo go ya viene todo configurado los permisos nativo y si se quiere configurar `blockedPermissions` solo funcionara si se genera un binario personalizado.

# B4. Así pregunta Android

### a) ¿Se puede poner texto propio dentro del diálogo de Android? Entonces, ¿dónde tenés que explicar para qué usás el permiso?

Rta:No, Porque los diálogo emergente es 100% nativo y gestionado por el sistema operativo Android. La aplicación no puede alterar su diseño, títulos, botones ni inyectar texto explicativo personalizado.Se debe explicar dentro de la propia interfaz de la app antes de invocar la API del sistema, mediante una pantalla explicativa previa. También se recomienda pedir el permiso en contexto de uso (por ejemplo, mostrar el cartel justo al tocar el botón de "Tomar foto") para que el usuario entienda claramente la necesidad del recurso antes de ver el diálogo oficial.

### b) ¿Qué diferencia hay entre “Mientras la app está en uso” y “Solo esta vez”? ¿Para qué permisos existe esta última opción?

RTA:La diferencia que hay entre mientras la app está en uso y el solo esta ves es que **mientra la app esta en uso** otorga el acceso únicamente mientras la aplicación tenga una actividad visible en primer plano (o ejecute un servicio en primer plano debidamente notificado). El permiso persiste entre sesiones sucesivas mientras la app esté abierta,**Mientras que el solo esta ves** concede un acceso temporal y de sesión única. Cuando la app pasa a segundo plano o su proceso se detiene durante un tiempo considerable, el permiso caduca automáticamente y vuelve al estado sin decidir.Existe para los permisos mas sensibles en materia de privacidad en tiempo real como puede ser la ubicacion, camara y microfono

### c) En Android 11+, ¿qué pasa si la persona toca “No permitir” dos veces? ¿Qué valor toma canAskAgain?

RTA:Lo que ocurre es que el sistema operativo interpreta el doble rechazo consecutivo como un "No volver a preguntar" implícito. A partir de ese momento, Android suprime permanentemente el diálogo nativo para ese permiso.El valor que toma es `false` (el estado en Expo pasa a bloqueado con `status: 'denied'` y `canAskAgain: false`). Si la app vuelve a llamar a la función para solicitar el permiso, la promesa resolverá denegada de forma inmediata sin mostrar ninguna interfaz.

### d) La ubicación aproximada tiene una precisión de unos 3 km². Dá un ejemplo de función que anda bien con ella y otro de una que no.

RTA:Las funciones que anda bien son las que se utilizan para pronostica el clima o la de seleccion regional de noticias ya que para saber las temperatura actual o las condiciones meteorologica basta con conocer la ciudad o la zona aproximada en donde se encuentra la persona, y las funciones que no andan bien son las de gps para conducir o las de transporte de pasajero ya que la precision debe de ser exacta para que puede ejerser su funcionadad de forma correcta

### e) Si la persona revoca un permiso desde Ajustes mientras la app está abierta, ¿qué hace Android con el proceso de la app?

RTA:Lo que hace android es realizar un proceso llamado `SIGKILL` esto lo hace como una medida de seguridad y consistencia arquitectónica. Al destruir el proceso, el sistema se asegura de purgar de la memoria cualquier objeto, hilo o puntero que estuviera reteniendo hardware sensible de forma activa y cuando la persona usuaria regresa a la app, esta se reinicia desde cero (_cold start_) obligando al código a evaluar nuevamente el estado actual de los permisos.

# B5. Android, versión por versión

Completá en qué versión apareció cada cambio y qué implica para tu código.

| Cambio                                                               | Versión (API)                                                  | Qué implica para el código                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------------------------------------------------------- | :------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nacen los permisos en tiempo de ejecución**                        | Android 6.0 (API 23 - Marshmallow)                             | Ya no alcanza con declarar los permisos en el manifiesto para que se concedan al instalar. El código debe comprobar dinámicamente si el permiso está otorgado antes de usar una API sensible y solicitarlo explícitamente en ejecución manejando el resultado asíncrono.                                                                                                                                                                             |
| **La ubicación en segundo plano pasa a ser un permiso aparte**       | Android 10 (API 29 - Q)                                        | Se separa `ACCESS_BACKGROUND_LOCATION` de la ubicación en primer plano. No se pueden pedir juntos en el mismo diálogo; el código debe solicitar primero la ubicación en primer plano y recién después, en un paso independiente con justificación clara, pedir la de segundo plano (que en versiones posteriores incluso deriva a Ajustes).                                                                                                          |
| **Dos rechazos equivalen a “no volver a preguntar”**                 | Android 11 (API 30 - R)                                        | Si la persona usuaria presiona "No permitir" dos veces consecutivas, el sistema bloquea el diálogo nativo (`canAskAgain: false`). El código no debe intentar pedirlo en bucle; tiene que detectar este estado y ofrecer un botón o mensaje que redirija a la pantalla de Ajustes del sistema (`Linking.openSettings()`).                                                                                                                             |
| **Ubicación precisa o aproximada**                                   | Android 12 (API 31 - S)                                        | Se deben solicitar obligatoriamente juntos `ACCESS_FINE_LOCATION` y `ACCESS_COARSE_LOCATION`. La app debe estar preparada técnicamente para funcionar con degradación elegante si el usuario elige solo la opción de ubicación aproximada (_Approximate_).                                                                                                                                                                                           |
| **Las notificaciones pasan a ser un permiso (`POST_NOTIFICATIONS`)** | Android 13 (API 33 - Tiramisu)                                 | Enviar notificaciones deja de estar habilitado por defecto. Hay que declarar `POST_NOTIFICATIONS` en el manifiesto y solicitar el permiso explícitamente en tiempo de ejecución antes de programar o disparar notificaciones locales o remotas. Si el usuario lo deniega, el código debe continuar funcionando sin bloquear la app, adaptando la experiencia a la ausencia de alertas.                                                               |
| **Acceso parcial a fotos y videos (“Seleccionar fotos”)**            | Android 14 (API 34 - Upside Down Cake)                         | Aparece el permiso `READ_MEDIA_VISUAL_USER_SELECTED`. La aplicación debe contemplar el escenario de autorización parcial donde la persona usuaria solo otorga acceso a un subconjunto de fotos/videos en lugar de toda la galería. Se debe manejar el estado devuelto, permitir que el usuario actualice la selección si necesita más archivos o preferir APIs del sistema como el Photo Picker nativo (que no requiere permisos de almacenamiento). |
| **Permiso de red local (`ACCESS_LOCAL_NETWORK`)**                    | Android 15 (API 35 - Vanilla Ice Cream) / Android 16 (Baklava) | Acceder a dispositivos o sockets dentro de la red de área local (LAN/Wi-Fi) ya no está cubierto por el permiso genérico de `INTERNET`. Para escanear, descubrir (por mDNS/SSDP) o comunicarse con otros equipos en la misma red local, el código debe declarar y solicitar este permiso específico en tiempo de ejecución, gestionando el rechazo si la app se ejecuta en redes restringidas o si el usuario deniega el acceso.                      |

### ¿Qué es el `targetSdkVersion`? ¿A qué API apunta Expo SDK 57 y qué exige Google Play desde el 31 de agosto de 2026?

RTA:
**¿Qué es el `targetSdkVersion`?:**  
 Es un atributo entero que se define en la configuración de Android y le indica al sistema operativo para qué nivel de API específico fue diseñada y probada la aplicación. No restringe la versión mínima en la que puede correr la app, sino que actúa como un **interruptor de compatibilidad de comportamientos**: le garantiza al sistema que la app está preparada para acatar todas las políticas de seguridad, cambios en el modelo de permisos y restricciones de privacidad introducidas hasta esa versión puntual de Android.

- **¿A qué API apunta Expo SDK 57?:**  
  Expo SDK 57 apunta de forma predeterminada al nivel de **API 36** (correspondiente a **Android 16**), alineándose con las dependencias y compiladores base de React Native para cumplir con los requerimientos más recientes del ecosistema.

- **¿Qué exige Google Play desde el 31 de agosto de 2026?:**  
  Siguiendo la política anual de Google Play (que exige que las nuevas aplicaciones y actualizaciones apunten al nivel de API de la versión estable de Android del año previo o dentro del margen de un año desde su lanzamiento oficial), a partir del 31 de agosto de 2026 se exige como requisito obligatorio tener como mínimo **`targetSdkVersion` en API 36 (Android 16)** para poder enviar actualizaciones o publicar nuevas apps en la tienda.

# Parte C · iOS: textos de propósito y acceso parcial

## C1. Claves del Info.plist

Escribí la clave que corresponde a cada recurso. Si no lleva clave, indicalo.

| Recurso                      | Clave en Info.plist                                                                                                          |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| **Cámara**                   | `NSCameraUsageDescription`                                                                                                   |
| **Micrófono**                | `NSMicrophoneUsageDescription`                                                                                               |
| **Ubicación en uso**         | `NSLocationWhenInUseUsageDescription`                                                                                        |
| **Ubicación siempre**        | `NSLocationAlwaysAndWhenInUseUsageDescription`                                                                               |
| **Fotos (leer)**             | `NSPhotoLibraryUsageDescription`                                                                                             |
| **Fotos (solo guardar)**     | `NSPhotoLibraryAddUsageDescription`                                                                                          |
| **Contactos**                | `NSContactsUsageDescription`                                                                                                 |
| **Face ID**                  | `NSFaceIDUsageDescription`                                                                                                   |
| **Rastreo entre apps (ATT)** | `NSUserTrackingUsageDescription`                                                                                             |
| **Notificaciones**           | _No lleva clave en Info.plist_ (se solicita directamente en tiempo de ejecución mediante la API `UNUserNotificationCenter`). |

## C2. Sin texto, no hay permiso

### a) ¿Qué pasa si falta el texto de propósito y la app intenta usar la cámara? ¿Y al subir la build a App Store Connect? Mencioná el código de error.

- **En ejecución:** La app crashea de inmediato (cierre forzoso).
- **En App Store Connect:** El procesamiento rechaza el binario automáticamente.
- **Código de error:** `ITMS-90683` (_Missing Purpose String in Info.plist_).

---

### b) ¿Cuántas veces muestra iOS el diálogo de un permiso? Si la persona dice que no, ¿qué le queda a la app?

- **Veces que se muestra:** Una sola vez por código.
- **Qué le queda a la app:** Mostrar una UI propia explicando la necesidad del permiso y ofrecer un botón que abra los ajustes nativos mediante `Linking.openSettings()`.

---

### c) En el diálogo de iOS, ¿qué parte arma el sistema y cuál escribís vos? En Expo, ¿dónde se configura ese texto?

- **Arma el sistema:** El título ("NombreApp desea acceder..."), los botones de acción ("OK" / "No permitir") y el diseño.
- **Escribís vos:** El mensaje explicativo del cuerpo (el _purpose string_).
- **En Expo se configura en:** `app.json`, dentro de `ios.infoPlist` (o en los `plugins` del módulo correspondiente).

---

### d) Una librería usa una API protegida que tu app nunca llama y Apple rechaza la build. ¿Por qué pasa y cómo se resuelve?

- **Por qué pasa:** El escáner estático de Apple busca símbolos de código en todo el binario compilado; si una librería incluye referencias a la API, Apple exige la clave de privacidad aunque tu app no la invoque.
- **Cómo se resuelve:** Declarar la clave con un texto explicativo en `app.json` (`ios.infoPlist`), o deshabilitar/excluir ese módulo desde la configuración del plugin de la librería.

## C3. Probador de textos de propósito

Evaluá cada texto para `NSLocationWhenInUseUsageDescription` según la pauta 5.1.1 de Apple.

| Texto propuesto                                                               | ¿Aprobado?                                                        | Versión mejorada                                                                        |
| :---------------------------------------------------------------------------- | :---------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| **“Necesitamos tu ubicación.”**                                               | **No** (demasiado vago, no explica el fin)                        | Usamos tu ubicación para mostrarte los comercios adheridos más cercanos en el mapa.     |
| **“Para mejorar tu experiencia.”**                                            | **No** (frase genérica rechazada habitualmente por App Store)     | Usamos tu ubicación para sugerirte eventos y actividades disponibles en tu ciudad.      |
| **“Usamos tu ubicación para mostrarte las farmacias de turno más cercanas.”** | **Sí**                                                            | _(No requiere cambios; explica claramente qué dato usa y el beneficio directo)._        |
| **“La app no funciona sin ubicación.”**                                       | **No** (coercitivo y no comunica la utilidad real)                | Usamos tu ubicación para calcular la ruta y guiarte paso a paso hasta tu destino.       |
| **“Ubicación requerida por el sistema.”**                                     | **No** (engañoso; el requerimiento proviene de la app, no del SO) | Usamos tu ubicación para registrar el recorrido exacto de tus salidas de entrenamiento. |

---

## C4. Acceso parcial y gradual

Para cada caso indicá desde qué versión de iOS existe y qué valor o función de Expo lo detecta o lo pide.

| Caso                                                      | iOS      | En Expo                                                                                                                                                                                    |
| :-------------------------------------------------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Fotos limitadas (“Seleccionar fotos”)**                 | iOS 14   | `status: 'granted'` con `accessPrivileges: 'limited'` en `ImagePicker.getMediaLibraryPermissionsAsync()` / `requestMediaLibraryPermissionsAsync()`.                                        |
| **Ubicación aproximada (interruptor “Precisa”)**          | iOS 14   | `Location.requestForegroundPermissionsAsync()`; se detecta evaluando `accuracy` en el objeto devuelto por `Location.getForegroundPermissionsAsync()` (`accuracy: 'reduced'` o `'coarse'`). |
| **“Permitir una vez” (ubicación)**                        | iOS 13   | `Location.requestForegroundPermissionsAsync()`; devuelve `status: 'granted'`, pero el permiso expira en cuanto la app finaliza su sesión actual.                                           |
| **Ubicación escalonada: de “al usar la app” a “Siempre”** | iOS 13   | Se pide primero `Location.requestForegroundPermissionsAsync()` y, una vez concedido, se invoca `Location.requestBackgroundPermissionsAsync()`.                                             |
| **Notificaciones provisionales**                          | iOS 12   | `Notifications.requestPermissionsAsync({ ios: { allowAnnouncements: true, provideAppNotificationSettings: true } })` usando el flag de autorización provisional nativo en iOS.             |
| **Rastreo entre apps (App Tracking Transparency)**        | iOS 14.5 | `requestTrackingPermissionsAsync()` y `getTrackingPermissionsAsync()` de la librería `expo-tracking-transparency`.                                                                         |

### ¿Qué versión mínima de iOS requiere Expo SDK 57? ¿Qué consecuencia práctica tiene eso sobre la tabla anterior?

- **Versión mínima de iOS:**  
  Requiere como mínimo **iOS 16.0** (o superior).

- **Consecuencia práctica sobre la tabla anterior:**  
  Todas las funciones de granularidad y acceso parcial mencionadas en la tabla (como fotos limitadas de iOS 14, ubicación precisa/aproximada de iOS 14, ATT de iOS 14.5 y ubicación en un solo uso de iOS 13) **están garantizadas al 100% en todos los dispositivos que corran la app**.

  Esto significa que ya **no es necesario escribir bifurcaciones condicionales por versión de sistema operativo** (como verificar si el dispositivo soporta fotos limitadas o tracking) para dispositivos viejos, ya que ningún iPhone que ejecute una app construida con Expo SDK 57 tendrá una versión inferior a iOS 16.

## C5. Android vs iOS, lado a lado

| Aspecto                                  | Android                                                                         | iOS                                                                                                 |
| :--------------------------------------- | :------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------- |
| **¿Dónde se declara?**                   | `AndroidManifest.xml` (etiqueta `<uses-permission>`).                           | `Info.plist` (mediante claves `*UsageDescription`).                                                 |
| **Texto en el diálogo**                  | Fijo y definido por el sistema operativo (no editable).                         | Título y botones fijos; el cuerpo (_purpose string_) lo redacta el desarrollador.                   |
| **Oportunidades para preguntar**         | Múltiples (hasta 2 rechazos consecutivos antes de bloquearse).                  | Una sola vez programáticamente.                                                                     |
| **“Solo esta vez” / “Permitir una vez”** | Disponible desde Android 11 para ubicación, cámara y micrófono.                 | Disponible desde iOS 13 para ubicación.                                                             |
| **Notificaciones**                       | Permiso en tiempo de ejecución desde Android 13 (`POST_NOTIFICATIONS`).         | Se solicita en tiempo de ejecución con `UNUserNotificationCenter` (no lleva clave en `Info.plist`). |
| **Ubicación en segundo plano**           | Permiso separado (`ACCESS_BACKGROUND_LOCATION`) pedido tras el de primer plano. | Proceso en dos pasos escalonados: primero "Al usar la app" y luego "Siempre".                       |
| **Si falta la declaración**              | Arroja `SecurityException` en tiempo de ejecución al invocar la API.            | Crashea de inmediato en ejecución o es rechazada por App Store (`ITMS-90683`).                      |

# Parte D · Expo: una API, dos plataformas

## D1. Módulos y funciones

Indicá qué módulo de Expo y qué hook o función de permiso usarías en cada caso.

| Necesidad                                       | Módulo                                             | Hook / función de permiso                                                                                             |
| :---------------------------------------------- | :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| **Escanear un QR con la cámara**                | `expo-camera`                                      | `useCameraPermissions()` / `requestCameraPermissionsAsync()`                                                          |
| **Grabar video con sonido**                     | `expo-camera` (requiere también permisos de audio) | `useCameraPermissions()` y `Audio.usePermissions()` (o `Audio.requestPermissionsAsync()` de `expo-audio` / `expo-av`) |
| **Mostrar farmacias cercanas**                  | `expo-location`                                    | `useForegroundPermissions()` / `requestForegroundPermissionsAsync()`                                                  |
| **Seguir un envío con la app en segundo plano** | `expo-location`                                    | `useBackgroundPermissions()` / `requestBackgroundPermissionsAsync()`                                                  |
| **Mostrar un recordatorio**                     | `expo-notifications`                               | `usePermissions()` / `requestPermissionsAsync()`                                                                      |
| **Grabar una nota de voz**                      | `expo-audio` (o `expo-av`)                         | `usePermissions()` / `requestRecordingPermissionsAsync()`                                                             |
| **Galería propia dentro de la app**             | `expo-media-library`                               | `usePermissions()` / `requestPermissionsAsync()`                                                                      |
| **Publicidad personalizada entre apps (iOS)**   | `expo-tracking-transparency`                       | `useTrackingPermissions()` / `requestTrackingPermissionsAsync()`                                                      |

### Un tutorial usa `import * as Permissions from 'expo-permissions'`. ¿Qué te dice eso sobre el tutorial?

- **El tutorial está desactualizado y obsoleto:**  
  El paquete centralizado `expo-permissions` fue marcado como _deprecated_ en Expo SDK 41 y eliminado por completo en Expo SDK 45.

- **Qué implica en versiones modernas:**  
  En las versiones actuales de Expo, cada módulo gestiona sus propios permisos de forma modular e independiente a través de sus propios métodos y hooks (por ejemplo, `useCameraPermissions()` dentro de `expo-camera`, o `useForegroundPermissions()` dentro de `expo-location`). El código de ese tutorial fallará al intentar instalar o importar la librería.

## D2. Consultar, pedir y el hook

### a) ¿Qué diferencia hay entre `get…PermissionsAsync()` y `request…PermissionsAsync()`? ¿Cuál puede mostrar un diálogo?

- **Diferencia:** `get…PermissionsAsync()` solo consulta el estado actual del permiso en el sistema operativo sin interactuar con el usuario. En cambio, `request…PermissionsAsync()` pide activamente el acceso al sistema.
- **Cuál muestra el diálogo:** Únicamente **`request…PermissionsAsync()`** tiene la capacidad de mostrar el diálogo nativo (siempre que el permiso no esté bloqueado permanentemente).

---

### b) El hook devuelve tres elementos. ¿Qué es cada uno? ¿Qué vale permiso en el primer render y qué tiene que mostrar la pantalla mientras tanto?

- **Los tres elementos:**
  1. `permiso`: Objeto con el estado del permiso (`status`, `granted`, `canAskAgain`, etc.).
  2. `pedirPermiso`: Función asíncrona para solicitar el permiso.
  3. `consultarPermiso`: Función asíncrona para volver a chequear el estado sin mostrar diálogo.
- **Valor en el primer render:** Vale **`null`** (mientras se resuelve la consulta inicial al sistema operativo de fondo).
- **Qué debe mostrar la pantalla:** Una vista de carga transitoria (como un `ActivityIndicator` o pantalla en blanco) para evitar parpadeos de interfaz o evaluar permisos antes de tiempo.

---

### c) Si `canAskAgain` es `false`, ¿qué pasa al llamar a `request…()`? ¿Qué problema aparece si se lo llama en un bucle?

- **Qué pasa al llamar a `request…()`:** Se resuelve inmediatamente en estado denegado (`status: 'denied'`), sin mostrar ningún diálogo nativo en pantalla.
- **Problema si se llama en un bucle:** Provoca un bucle infinito de resoluciones automáticas que traba el hilo de ejecución de JavaScript, congela la app y drena la batería del dispositivo.

## D3. Leé la respuesta

Para cada `PermissionResponse`, indicá qué debería hacer la app.

| Respuesta                                                | Qué hace la app                                                                                                                            |
| :------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `null`                                                   | Muestra un indicador de carga (`ActivityIndicator` o _spinner_) mientras espera la respuesta asíncrona inicial del sistema operativo.      |
| `{ status: 'granted', granted: true }`                   | Habilita y ejecuta la funcionalidad protegida normalmente (acceso total).                                                                  |
| `{ status: 'undetermined', canAskAgain: true }`          | Presenta la pantalla de contexto previo (_pre-permission_) o llama a `request...()` para abrir el diálogo nativo del sistema.              |
| `{ status: 'denied', canAskAgain: true }`                | Explica en pantalla por qué se necesita el recurso y ofrece un botón propio para volver a intentar pedirlo con `request...()`.             |
| `{ status: 'denied', canAskAgain: false }`               | Informa que el permiso está bloqueado y muestra un botón que redirige a los Ajustes del sistema mediante `Linking.openSettings()`.         |
| `{ status: 'granted', accessPrivileges: 'limited' }`     | Opera con las fotos seleccionadas por el usuario y ofrece una opción en la UI para gestionar o sumar más fotos a la selección.             |
| `{ status: 'granted', android: { accuracy: 'coarse' } }` | Adapta la funcionalidad a un radio aproximado (degradación elegante) o explica por qué requiere activar la precisión si es imprescindible. |

---

### ¿Cuáles son los dos campos que deciden casi todo? ¿Qué pregunta responde cada uno?

1. **`granted` (o `status`):**
   - **Pregunta que responde:** _¿Tengo acceso al recurso en este momento?_ (Define si el código puede invocar la API protegida).

2. **`canAskAgain`:**
   - **Pregunta que responde:** _¿Puedo volver a mostrar el diálogo nativo del sistema?_ (Define si se llama a `request...()` o si se debe redirigir a `Linking.openSettings()`).

## D4. Simulación del ciclo completo

### Android 14, app recién instalada, `expo-location`

| #     | Acción                                                                                       | status                                                                                                                                                               | canAskAgain | ¿Diálogo? |
| :---- | :------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------- | :-------- |
| **1** | `getForegroundPermissionsAsync()`                                                            | `undetermined`                                                                                                                                                       | `true`      | No        |
| **2** | `requestForegroundPermissionsAsync()` → "No permitir"                                        | `denied`                                                                                                                                                             | `true`      | Sí        |
| **3** | `requestForegroundPermissionsAsync()` → "No permitir"                                        | `denied`                                                                                                                                                             | `false`     | Sí        |
| **4** | `requestForegroundPermissionsAsync()`                                                        | `denied`                                                                                                                                                             | `false`     | No        |
| **5** | `Linking.openSettings()` → habilita "Mientras la app está en uso" → vuelve y la app consulta | `granted`                                                                                                                                                            | `true`      | No        |
| **6** | Igual que el 5, pero la app no vuelve a consultar: ¿qué muestra?                             | _Muestra el estado anterior en memoria (`denied`), manteniendo la pantalla bloqueada hasta que se monte de nuevo el componente o se ejecute una consulta explícita._ | —           | No        |

---

### Repetí los pasos 1 a 4 en iOS. ¿En qué paso cambia el resultado y por qué?

- **Paso 1:** `undetermined` \| `canAskAgain: true` \| Diálogo: No.
- **Paso 2:** `denied` \| `canAskAgain: false` \| Diálogo: Sí.
- **Paso 3:** `denied` \| `canAskAgain: false` \| Diálogo: No.
- **Paso 4:** `denied` \| `canAskAgain: false` \| Diálogo: No.

- **¿En qué paso cambia y por qué?:**  
  Cambia en el **Paso 2**. En iOS rige la política estricta de un solo intento; tras el primer rechazo, `canAskAgain` pasa inmediatamente a `false` (en Android esto recién ocurre tras el segundo rechazo en el Paso 3).

---

### ¿Qué pasa en iOS si la persona elige “Permitir una vez” y después cierra y reabre la app?

Al cerrar la app finaliza la sesión autorizada. Al reabrirla, el permiso vuelve automáticamente al estado inicial **`undetermined`** con **`canAskAgain: true`**, por lo que la app puede volver a presentar el diálogo nativo cuando lo solicite.

## D5. Configurar app.json

Enlace:[expo.plugins](./app.json)

¿Por qué expo-camera agrega RECORD_AUDIO en Android aunque la app no grabe sonido?
Porque expo-camera es una librería que soporta tanto fotos como videos con audio. A nivel nativo en Android, el archivo AndroidManifest.xml empaquetado dentro de la librería ya trae escrito <uses-permission android:name="android.permission.RECORD_AUDIO" />.

## D6. Expo Go no es tu app

### a) ¿Por qué tus textos de propósito no aparecen cuando probás en Expo Go?

RTA: Porque Expo Go es un binario nativo ya precompilado por el equipo de Expo con su propio archivo `Info.plist`. Las configuraciones que escribís en `app.json` (incluidos los textos de propósito como `NSCameraUsageDescription`) solo se inyectan al compilar la app; Expo Go no puede modificar su propio binario en tiempo de ejecución para mostrar tus textos.

### b) ¿Qué se puede probar en Expo Go y qué necesita una development build? Pensá en push en Android y en ubicación en segundo plano.

RTA: Se puede probar en Expo Go: Flujos básicos de permisos estándar en primer plano (cámara, galería, ubicación en uso), componentes de interfaz y lógica de JavaScript general y lo que necesita Development Build:
**Push notifications en Android:** Desde Android 13 requieren el permiso de ejecución `POST_NOTIFICATIONS` y servicios nativos de mensajería (FCM/Expo Notifications) configurados a nivel de proyecto.
**Ubicación en segundo plano:** Requiere registrar tareas en segundo plano (`expo-task-manager`), servicios en segundo plano nativos y el permiso `ACCESS_BACKGROUND_LOCATION` compilado en el binario final.
-Cualquier modificación al `AndroidManifest.xml` o `Info.plist` (como `blockedPermissions` o plugins nativos personalizados).

### c) Escribí los comandos para ver los archivos nativos generados y para compilar una development build en Android.

RTA: El codigo para generar y ver archivos nativos es : -_npx expo prebuild_ y para compilar y correr la build _npx expo run:android_

### d) ¿Cómo volvés un permiso a “sin decidir” sin reinstalar, en Android (adb) y en el simulador de iOS (xcrun simctl)?

RTA: Se ejecuta el comando para restablecer todos los permisos de la aplicación a su estado de fábrica:

```bash
adb shell pm reset-permissions <package_name>
```

## E1. Encontrá los errores (cámara)

### Esta pantalla funciona la primera vez, pero tiene varios problemas. Encontrá al menos tres y escribí la versión corregida con los cuatro estados (cargando → concedido → preguntable → bloqueado).

```
src/app/escanear.tsx
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from 'react-native';
export default function Escanear() {
 const [permiso, pedirPermiso] = useCameraPermissions();
 if (permiso.status === 'granted') {
 return <CameraView style={{ flex: 1 }} facing="back" />;
 }
 return (
 <Explicacion texto="Usamos la cámara para leer el QR del aula.">
 <Button title="Permitir" onPress={pedirPermiso} />
 </Explicacion>
 );
}
E2
```

### Errores identificados

-**Crash por lectura de `null` en el primer render:**  
 `permiso` inicia en `null` mientras se resuelve la consulta asíncrona nativa. Acceder a `permiso.status` provoca un error de ejecución inmediato (`Cannot read properties of null (reading 'status')`). Falta manejar el estado de carga inicial.
**No maneja el estado bloqueado (`canAskAgain: false`):**  
 Si el usuario deniega el permiso permanentemente (doble rechazo en Android o rechazo único en iOS), el botón `pedirPermiso` no hace nada. Se debe detectar `!permiso.canAskAgain` y redirigir con `Linking.openSettings()`. **Elementos incompletos / JSX roto:**  
 Falta envolver los retornos con contenedores de maquetación (`View`, `Text`, estilos), `CameraView` requiere `style={{ flex: 1 }}` para ser visible en pantalla, y no se importa ni se gestiona la redirección nativa.

## E2. El orden importa (ubicación)

src/lib/ubicacion.ts
export async function activarSeguimiento() {
const siempre = await Location.requestBackgroundPermissionsAsync();
if (!siempre.granted) return false;
const enUso = await Location.requestForegroundPermissionsAsync();
return enUso.granted;
}

### a) ¿Qué está mal? ¿Qué ocurre en iOS y qué ocurre en Android 11+?

**RTA:** Está mal el orden de solicitud: pide segundo plano antes de tener el de primer plano. En sistemas operativos móviles modernos es obligatorio tener concedido primero el permiso en primer plano para poder escalar al de segundo plano.

- **En iOS:** La solicitud falla directamente o se resuelve denegada sin mostrar diálogo, porque el sistema exige haber otorgado previamente "Al usar la app" para poder ofrecer la opción "Siempre". La función retorna `false` de inmediato.
- **En Android 11+:** El sistema operativo prohíbe pedir `ACCESS_BACKGROUND_LOCATION` de entrada. Si no se tiene previamente `ACCESS_FINE_LOCATION` o `ACCESS_COARSE_LOCATION`, la llamada se ignora o arroja excepción, no abre la pantalla de ajustes de ubicación y devuelve `denied`.

### d) ¿Hace falta segundo plano para “farmacias cercanas”? ¿Qué exige Google Play si lo pedís?

RTA: No, no hace falta segundo plano. Para una función como "farmacias cercanas" solo se requiere el permiso de primer plano (`ACCESS_COARSE_LOCATION` o `ACCESS_FINE_LOCATION`), ya que la consulta de coordenadas se realiza puntualmente mientras el usuario interactúa con la pantalla de la app.

Si se solicita segundo plano (`ACCESS_BACKGROUND_LOCATION`), Google Play exige:

- **Justificación de funcionalidad crítica:** Demostrar que la función principal de la app no puede existir sin el rastreo continuo cuando la aplicación está cerrada o minimizada (por ejemplo: apps de navegación en tiempo real, geocercas de seguridad o flotas logísticas). La búsqueda de comercios cercanos no califica.
- **Declaración de ubicación en Google Play Console:** Completar un formulario de declaración de permisos detallando el uso del recurso y adjuntando las políticas de privacidad actualizadas.
- **Video de demostración:** Presentar un video sin editar a los revisores de Google mostrando la experiencia del usuario, la divulgación previa dentro de la app (_prominent disclosure_) y el funcionamiento en segundo plano.
- **Aprobación manual estricta:** Pasar una revisión humana específica; si determinan que la función puede resolverse en primer plano, rechazan la actualización o eliminan la app de la tienda.

**la actividad B y C esta resueltas en el ejercisio a corregir**
