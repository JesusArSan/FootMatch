# FootMatch
TFG - Football Aplication

## Build on expo
npm install && npm start --reset-cache

## Build APK
eas build -p android --profile preview

## Errores solucionados hasta el momento
### 1. Problema en el build, no realizaba peticiones
#### Primer Paso: 
npx expo install expo-build-properties
#### Segundo Paso: 
##### En app.json:
"plugins": [ [ "expo-build-properties", { "android": { "usesCleartextTraffic": true } } ] ]

## Posibles problemas a futuro
Al insertar la dependencia de "@testing-library/react-native": "^12.5.1" y "jest", posiblemente
en el futuro de errores al hacer "npm install". Para la instalación forzada: 
npm install --force