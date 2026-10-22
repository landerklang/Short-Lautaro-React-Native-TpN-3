export async function activarSeguimiento() {
  const siempre = await Location.requestBackgroundPermissionsAsync();
  if (!siempre.granted) return false;
  const enUso = await Location.requestForegroundPermissionsAsync();
  return enUso.granted;
}
