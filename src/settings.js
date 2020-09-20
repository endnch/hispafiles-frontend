/**
 * Hispachan Files Frontend
 *
 * Archivo de configuración.
 * Este archivo es visible desde los navegadores, no pongas información delicada aquí.
 */

export default {
  /* Configuración del sitio */
  site: {
    // Se muestra en la barra de título y el menú superior
    title: 'Hispachan Files',
    // Se muestra en la barra de título de la página principal
    subtitle: 'Archivo de Hispachan',
    // URL base del back-end
    // Es importante que configures esto ya que es usado para enviar y solicitar datos del back-end
    url: process.env.REACT_APP_URL || 'http://localhost:8000',
  },
  /* Características del sitio */
  features: {
    // Establecer en false para desactivar la página de la API
    apiEnabled: true,
  },
  /* Miscelaneo */
  misc: {
    email: process.env.REACT_APP_EMAIL || 'zeta@pagalacoca.com',
  },
  /* Estilo por defecto (los estilos están en la carpeta styles) */
  defaultStyle: 'Hispachan',
}
