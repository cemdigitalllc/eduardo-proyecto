// Desvanecer la página antes de abrir otra página del sitio.
const enlaces = document.querySelectorAll('a[href$=".html"]');
enlaces.forEach(function (enlace) {
  enlace.addEventListener('click', function (evento) {
    // Conservar abrir en otra pestaña y la preferencia de movimiento reducido.
    if (evento.button !== 0 || evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    evento.preventDefault();
    document.body.classList.add('saliendo');
    setTimeout(function () {
      window.location.href = enlace.href;
    }, 180);
  });
});

// Al volver con el botón Atrás, la página debe seguir visible.
window.addEventListener('pageshow', function () {
  document.body.classList.remove('saliendo');
});

// Mostrar solo las actividades de la categoría elegida.
const categoria = document.querySelector('#categoria');
if (categoria) {
  categoria.addEventListener('change', function () {
    const actividades = document.querySelectorAll('[data-category]');
    let cantidad = 0;
    actividades.forEach(function (actividad) {
      const mostrar = categoria.value === 'Todas' || actividad.dataset.category === categoria.value;
      actividad.hidden = !mostrar;
      if (mostrar) cantidad++;
    });
    document.querySelector('#filter-status').textContent = cantidad + (cantidad === 1 ? ' actividad' : ' actividades');
  });
}

// Sustituye la cadena vacía por el correo oficial cuando el instituto lo confirme.
// Ejemplo de formato: nombre@dominio.hn. No pongas contraseñas en este archivo.
const correoInstituto = '';
const form = document.querySelector('#contact-form');
if (form) {
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const status = document.querySelector('#form-status');
    if (!form.reportValidity()) return;
    if (!correoInstituto) {
      status.textContent = 'Falta configurar el correo oficial del instituto. No se ha enviado ni guardado tu información.';
      return;
    }
    const datos = new FormData(form);
    const asunto = 'Consulta sobre ' + datos.get('programa');
    const mensaje = 'Nombre: ' + datos.get('nombre') + '\nCorreo: ' + datos.get('correo') +
      '\nPrograma: ' + datos.get('programa') +
      '\n\n' + datos.get('mensaje');
    const destino = 'mailto:' + encodeURIComponent(correoInstituto) + '?subject=' +
      encodeURIComponent(asunto) + '&body=' + encodeURIComponent(mensaje);
    window.location.href = destino;
    status.textContent = 'Se solicitó abrir tu aplicación de correo. Revisa el mensaje y pulsa Enviar allí. Si no se abre, configura una aplicación de correo en tu dispositivo.';
  });
}
