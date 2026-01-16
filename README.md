# Gestión de Gastos

Aplicación moderna para gestionar y administrar tus gastos de forma eficiente, construida con Nuxt 4 y Nuxt UI.

## 🚀 Características

- **Gestión de Gastos:** Crea, visualiza y administra tus gastos.
- **Formularios Validados:** Validación de datos utilizando Zod y Vee-Validate.
- **Interfaz Moderna:** Diseño limpio y responsivo utilizando Nuxt UI (@nuxt/ui).
- **Consumo de API:** Integración con backend para persistencia de datos.

## 🛠️ Tecnologías

- **Framework:** [Nuxt 4](https://nuxt.com/)
- **UI Kit:** [Nuxt UI](https://ui.nuxt.com/)
- **Validación:** [Zod](https://zod.dev/) & [Vee-Validate](https://vee-validate.logaretm.com/)
- **Estilo:** Tailwind CSS (via Nuxt UI)

## 📦 Instalación

Asegúrate de tener [pnpm](https://pnpm.io/) instalado.

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

## ⚙️ Configuración

Renombrar el archivo `.env.template` a `.env`.

La aplicación requiere asignar la variable de entorno `NUXT_PUBLIC_API_BASE` con la URL de la API.

```bash
# Ejemplo
NUXT_PUBLIC_API_BASE=http://localhost:3000/api/v1
```
