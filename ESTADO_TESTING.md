# 🚀 App Lista para Testing Remoto - Administración de Ovejas

## ✅ Estado Actual
- **Backend**: ✅ Ejecutándose en puerto 3000
- **DevTunnel**: ✅ Activo y funcionando
- **Frontend**: ✅ Ejecutándose con Expo
- **Base de Datos**: ✅ MariaDB local conectada

## 🌐 URLs Públicas
- **API Backend**: `https://c21l4gtk-3000.uks1.devtunnels.ms`
- **Verificar backend**: `https://c21l4gtk-3000.uks1.devtunnels.ms` (debe mostrar "Cannot GET /")
- **Inspección de red**: `https://c21l4gtk-3000-inspect.uks1.devtunnels.ms`

## 📱 Para los Testers

### 1. Descargar Expo Go
- **Android**: [Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)

### 2. Acceder a la App
El desarrollador te enviará:
- **Enlace directo** o **código QR** de Expo
- Los testers **NO necesitan estar en la misma red** - pueden usar datos móviles

### 3. Usuarios de Prueba
#### Propietarios (pueden crear/editar):
- `owner1@test.com` / `password123`
- `owner2@test.com` / `password123`

#### Consumidores (solo lectura):
- `consumer1@test.com` / `password123`
- `consumer2@test.com` / `password123`

### 4. Funcionalidades a Probar
- ✅ Login/Registro
- ✅ Ver lista de ovejas
- ✅ Crear/Editar/Eliminar ovejas (solo propietarios)
- ✅ Gestión de crías
- ✅ Panel de control con estadísticas
- ✅ Subir/cambiar fotos
- ✅ Filtros y búsquedas

## 🔧 Para el Desarrollador

### Comandos Activos:
```bash
# Terminal 1: Backend (ya ejecutándose)
npm run start:backend

# Terminal 2: Túnel (ya ejecutándose)
. .\devtunnel-alias.ps1
devtunnel host -p 3000 --allow-anonymous

# Terminal 3: Frontend (ya ejecutándose)
npm run start:frontend
```

### Verificar Estado:
- **Backend**: `https://c21l4gtk-3000.uks1.devtunnels.ms` → "Cannot GET /"
- **Frontend**: Debería mostrar código QR en la terminal
- **Base de datos**: Verificar que MariaDB esté corriendo

### Si necesitas reiniciar:
1. Mantener el túnel activo (Terminal 2)
2. Si cambias algo en el backend, reinicia Terminal 1
3. Si cambias algo en el frontend, reinicia Terminal 3

## 📋 Compartir con Testers:
1. **Enlace de Expo** (aparece en Terminal 3)
2. **GUIA_TESTING.md** (instrucciones detalladas)
3. **URL de verificación**: `https://c21l4gtk-3000.uks1.devtunnels.ms`

---
**¡Tu app está lista para testing remoto desde cualquier lugar del mundo! 🌍**
