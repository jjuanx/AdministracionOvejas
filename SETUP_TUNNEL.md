# 🌐 Configuración de Túnel para Testing Remoto

## 📥 Opción 1: ngrok (Recomendado - Más fácil)

### 1. Descargar ngrok:
- Ve a: https://ngrok.com/download
- Descarga la versión para Windows
- Descomprime el archivo `ngrok.exe` en esta carpeta del proyecto

### 2. Crear cuenta gratuita:
- Ve a: https://dashboard.ngrok.com/signup
- Regístrate (gratis)
- Copia tu authtoken

### 3. Configurar ngrok:
```bash
# En esta carpeta, ejecuta:
ngrok config add-authtoken TU_AUTHTOKEN_AQUI
```

### 4. Usar ngrok:
```bash
# Terminal 1: Ejecutar backend
npm run start:backend

# Terminal 2: Crear túnel
ngrok http 3000
```

### 5. Copiar URL:
ngrok te dará una URL como: `https://abc123.ngrok.io`

---

## 📥 Opción 2: DevTunnel ✅ (Configurado!)

### 1. Instalar .NET SDK: ✅
- Ya tienes .NET SDK 9.0.303

### 2. Instalar DevTunnel: ✅
- Ya instalado via winget

### 3. Cargar alias: ✅
```bash
. .\devtunnel-alias.ps1
```

### 4. Autenticarse: ✅
- Ya autenticado como: juapozgar@alum.us.es

### 5. Usar DevTunnel:
```bash
# Terminal 1: Ejecutar backend
npm run start:backend

# Terminal 2: Crear túnel
devtunnel host -p 3000 --allow-anonymous
```

### 6. URLs generadas:
- **Principal**: `https://srtn606x-3000.uks1.devtunnels.ms`
- **Alternativa**: `https://srtn606x.uks1.devtunnels.ms:3000`
- **Inspección**: `https://srtn606x-3000-inspect.uks1.devtunnels.ms`

---

## 🚀 Pasos Después del Túnel

### 1. Actualizar .env del Frontend:
```properties
EXPO_PACKAGER_HOSTNAME=10.100.180.39
HOST_IP=10.100.180.39
EXPO_PUBLIC_API_BASE_URL=https://tu-url-del-tunel.ngrok.io
```

### 2. Ejecutar Frontend:
```bash
npm run start:frontend
```

### 3. Compartir con Testers:
- Enlace de Expo que aparece
- URL del backend para verificar: `https://tu-url-del-tunel.ngrok.io/health`

---

## ⚡ Scripts Rápidos

Una vez configurado, estos comandos en 3 terminales:

```bash
# Terminal 1
npm run start:backend

# Terminal 2  
ngrok http 3000

# Terminal 3 (después de actualizar .env)
npm run start:frontend
```

---

## 🔧 Verificar que Funciona

1. Abre la URL del túnel en tu navegador
2. Deberías ver algo como: "Cannot GET /" o la respuesta de tu API
3. Prueba: `https://tu-url.ngrok.io/health` si tienes esa ruta

¡Listo para testing remoto! 🎉
