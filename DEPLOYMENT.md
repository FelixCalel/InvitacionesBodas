# Guía de Despliegue en Vercel

Este documento proporciona instrucciones detalladas para desplegar el sitio de invitaciones de boda en Vercel.

## 🚀 Despliegue Automático (Recomendado)

### Paso 1: Crear Cuenta en Vercel
1. Visita [vercel.com](https://vercel.com)
2. Regístrate o inicia sesión con tu cuenta de GitHub

### Paso 2: Importar Proyecto
1. En el dashboard de Vercel, haz clic en "Add New..." → "Project"
2. Selecciona "Import Git Repository"
3. Busca y selecciona el repositorio `FelixCalel/InvitacionesBodas`
4. Haz clic en "Import"

### Paso 3: Configurar Proyecto
Vercel detectará automáticamente la configuración gracias al archivo `vercel.json`:
- **Framework Preset**: Other
- **Build Command**: (ninguno necesario)
- **Output Directory**: `.` (raíz del proyecto)

### Paso 4: Desplegar
1. Haz clic en "Deploy"
2. Espera unos segundos mientras Vercel despliega tu sitio
3. ¡Listo! Tu sitio estará disponible en una URL como: `https://invitaciones-bodas-xxxxx.vercel.app`

### Paso 5: Dominio Personalizado (Opcional)
1. En el dashboard del proyecto, ve a "Settings" → "Domains"
2. Agrega tu dominio personalizado
3. Sigue las instrucciones para configurar DNS

## 💻 Despliegue Manual con CLI

### Instalación de Vercel CLI
```bash
npm install -g vercel
```

### Desplegar desde Terminal
```bash
# Navega al directorio del proyecto
cd /ruta/a/InvitacionesBodas

# Inicia sesión en Vercel
vercel login

# Despliega en producción
vercel --prod
```

## 🔄 Despliegue Continuo

Una vez conectado el repositorio a Vercel:
- Cada push a la rama `main` desplegará automáticamente a producción
- Cada pull request creará un preview deployment
- Puedes ver todos los despliegues en el dashboard de Vercel

## 🌍 Accesibilidad

El sitio será accesible desde:
- ✅ Guatemala
- ✅ Todo el mundo
- ✅ Dispositivos móviles y escritorio
- ✅ Todos los navegadores modernos

## 📱 Personalización Post-Despliegue

Para actualizar la información de la boda:

1. Edita los archivos localmente:
   - `index.html` - Nombres, fechas, lugares
   - `styles.css` - Colores y estilos
   - `script.js` - Funcionalidades

2. Commitea los cambios:
   ```bash
   git add .
   git commit -m "Actualizar información de la boda"
   git push
   ```

3. Vercel desplegará automáticamente los cambios

## 🔗 Enlaces Útiles

- [Documentación de Vercel](https://vercel.com/docs)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Custom Domains Guide](https://vercel.com/docs/concepts/projects/custom-domains)

## 🎉 Siguiente Paso

Una vez desplegado:
1. Comparte la URL con tus invitados
2. Personaliza la información de contacto para RSVP
3. Considera agregar integración con Google Calendar o formularios de confirmación

## ⚠️ Notas Importantes

- El plan gratuito de Vercel es suficiente para este proyecto
- No hay límite de visitantes para sitios estáticos
- Los despliegues son instantáneos (< 1 minuto)
- SSL/HTTPS está incluido automáticamente
