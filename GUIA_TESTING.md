# 🧪 Guía para Testers - App de Administración de Ovejas

## 📱 Requisitos
1. **Smartphone Android/iOS**
2. **Expo Go** (descargar desde Play Store o App Store)
3. **Conexión a internet** (WiFi o datos móviles)
4. **NO necesitas estar en la misma ubicación** que el desarrollador

## 🚀 Pasos para Probar la App

### 1. Instalar Expo Go
- **Android**: [Descargar desde Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)
- **iOS**: [Descargar desde App Store](https://apps.apple.com/app/expo-go/id982107779)

### 2. Obtener Link de la App
El desarrollador te enviará:
- **Un enlace directo** tipo: `exp://exp.host/@usuario/proyecto`
- **O un código QR** para escanear
- **URL del backend**: `https://xxx.devtunnels.ms` (para verificar que funciona)

### 3. Conectar al Proyecto
- **Opción A**: Abre el enlace directo en tu móvil
- **Opción B**: Escanea el código QR desde Expo Go
- **Opción C**: En Expo Go, ve a "Enter URL manually" y pega el enlace

### 4. Usuarios de Prueba
La app viene con usuarios predefinidos para testing:

#### Propietarios (pueden crear/editar ovejas):
- **Email**: `owner1@test.com` | **Password**: `password123`
- **Email**: `owner2@test.com` | **Password**: `password123`

#### Consumidores (solo pueden ver):
- **Email**: `consumer1@test.com` | **Password**: `password123`
- **Email**: `consumer2@test.com` | **Password**: `password123`

### 5. Funcionalidades a Probar

#### 🐑 Gestión de Ovejas (Solo Propietarios)
- [ ] Ver lista de ovejas
- [ ] Crear nueva oveja
- [ ] Editar oveja existente
- [ ] Eliminar oveja
- [ ] Subir foto de oveja

#### 🐣 Gestión de Crías (Solo Propietarios)
- [ ] Ver lista de crías
- [ ] Crear nueva cría
- [ ] Editar cría existente
- [ ] Eliminar cría
- [ ] Marcar cría como viva/muerta

#### 📊 Panel de Control
- [ ] Ver estadísticas de ovejas
- [ ] Ver gráficos de estado del rebaño
- [ ] Ver estadísticas de crías

#### 👤 Perfil de Usuario
- [ ] Ver información personal
- [ ] Cambiar avatar
- [ ] Cerrar sesión

### 6. Casos de Prueba Específicos

#### Registro de Nueva Oveja
1. Ir a "Ovejas" → "+"
2. Llenar formulario completo
3. Subir una foto
4. Guardar
5. Verificar que aparece en la lista

#### Crear Cría
1. Ir a "Ovejas" → Seleccionar una oveja
2. Tocar "Añadir Cría"
3. Llenar formulario de cría
4. Asignar madre (oveja seleccionada)
5. Guardar y verificar

#### Filtros y Búsquedas
1. Probar filtro por estado (buena/regular/mala)
2. Buscar oveja por ID
3. Verificar que los filtros funcionan

### 7. Reportar Problemas
Si encuentras algún error:
1. **Captura de pantalla** del error
2. **Pasos para reproducir** el problema
3. **Dispositivo y versión** (Android X.X / iOS X.X)
4. **Hora aproximada** del error

### 8. URLs del Backend
- **API Base**: `https://tu-tunnel.devtunnels.ms`
- **Estado del servidor**: `https://tu-tunnel.devtunnels.ms/health`
- **Verifica que funciona**: Abre la URL en tu navegador móvil

## 🔧 Solución de Problemas

### App no carga
- Verificar conexión a internet (WiFi o datos móviles)
- Reiniciar Expo Go
- Verificar que el backend esté funcionando (abrir URL en navegador)
- Contactar al desarrollador

### Error de conexión al servidor
- Verificar que tienes conexión a internet
- Probar abrir `https://tu-tunnel.devtunnels.ms/health` en el navegador
- Si no abre, el servidor está caído - contactar desarrollador
- Reiniciar la app

### Datos no se actualizan
- Hacer "pull to refresh" en las listas
- Navegar fuera y volver a la pantalla
- Cerrar y reabrir la app

---
**¡Gracias por probar la aplicación! 🚀**
