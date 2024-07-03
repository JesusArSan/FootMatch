# FootMatch
TFG - Football Aplication

## Build APK
eas build -p android --profile preview

## Errores hasta ahora
### 1. Problema en el build, no realizaba peticiones
#### npx expo install expo-build-properties
#### En app.json:
##### "plugins": [
#####    [
#####       "expo-build-properties",
#####       {
#####          "android": {
#####             "usesCleartextTraffic": true
#####          }
#####       }
#####    ]
##### ]