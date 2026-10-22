import { useEffect, useRef } from 'react';
import { AppState } from 'react-native';
export function useRevisarAlVolver(revisar: () => void) {
const anterior = useRef(AppState.currentState);
useEffect(() => {
const sub = AppState.addEventListener('change', (nuevo) => {
const estabaAfuera = **\*\*\*\***\_\_\_\_**\*\*\*\***;
if (estabaAfuera && **\*\*\*\***\_\_\_\_**\*\*\*\***) revisar();
anterior.current = nuevo;
});
return () => **\*\*\*\***\_\_\_\_**\*\*\*\***;
}, [revisar]);
}