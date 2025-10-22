# 🚀 Deployment GRATUITO en Railway

## 📋 **Pasos para hacer tu app independiente del PC:**

### **1. Crear cuenta en Railway:**
- Ve a: https://railway.app
- Conecta con tu cuenta de GitHub
- ✅ **100% GRATIS** hasta 500 horas/mes

### **2. Crear nuevo proyecto:**
1. Click en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Conecta tu repositorio `AdministracionOvejas`
4. Railway detectará automáticamente tu backend

### **3. Configurar variables de entorno:**
En Railway, ve a **Variables** y añade:
```
NODE_ENV=production
APP_PORT=3000
```

### **4. Añadir base de datos:**
1. En tu proyecto Railway, click **"+ New"**
2. Selecciona **"Database"** → **"MySQL"**
3. Railway creará automáticamente las variables:
   - `MYSQLHOST`
   - `MYSQLPORT` 
   - `MYSQLUSER`
   - `MYSQLPASSWORD`
   - `MYSQLDATABASE`

### **5. Deploy automático:**
- Railway hará deploy automáticamente
- Te dará una URL tipo: `https://tu-app.railway.app`
- ✅ **Tu backend estará online 24/7**

### **6. Actualizar frontend:**
Cambia en `Frontend-Ovejas/.env`:
```
EXPO_PUBLIC_API_BASE_URL=https://tu-app.railway.app
```

## 📱 **Para la app móvil:**

### **Opción A: Expo Go (actual)**
- Los testers siguen usando Expo Go
- Tú solo cambias la URL del backend
- **No necesitas PC encendido**

### **Opción B: Expo Build (más profesional)**
```bash
npx expo build:android
npx expo build:ios
```
- Crea archivos `.apk` y `.ipa`
- Los testers instalan la app real
- **Totalmente independiente**

## 💡 **Ventajas de Railway:**
- ✅ **Gratis** hasta 500 horas/mes (más que suficiente)
- ✅ **SSL automático** (HTTPS)
- ✅ **Deploy automático** desde GitHub
- ✅ **Base de datos incluida**
- ✅ **Escalable** si necesitas más después

## 🔄 **Workflow final:**
1. **Código en GitHub** → Railway hace deploy automático
2. **Backend online 24/7** en Railway
3. **Testers usan Expo Go** con nueva URL
4. **¡No necesitas PC encendido!**

---

**🎯 Resultado: Tu app funcionará desde cualquier móvil, en cualquier lugar, sin depender de tu PC.**
