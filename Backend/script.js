// Selecciona los elementos del DOM
const wrapper = document.querySelector('.wrapper'); // Selecciona el contenedor principal de los formularios
const loginLink = document.querySelector('.login-link'); // Selecciona el enlace para volver al login
const registerLink = document.querySelector('.register-link'); // Selecciona el enlace para abrir el registro
const btnPopup = document.querySelector('.btnLogin-Popup'); // Selecciona el botón que abre el formulario de login/registro
const iconClose = document.querySelector('.icon-close'); // Selecciona el icono de cierre (X)

// Evento que se activa cuando el enlace de "Registrarse" es clicado
registerLink.addEventListener('click', () => {
    wrapper.classList.add('active'); // Añade la clase 'active' para mostrar el formulario de registro
});

// Evento que se activa cuando el enlace de "Login" es clicado
loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active'); // Remueve la clase 'active' para mostrar el formulario de login
});

// Evento que se activa al hacer clic en el botón de "Login" del encabezado
btnPopup.addEventListener('click', () => {
    wrapper.classList.add('active-popup'); // Añade la clase 'active-popup' para mostrar el popup del formulario
});

// Evento que se activa al hacer clic en el icono de cierre (X)
iconClose.addEventListener('click', () => {
    wrapper.classList.remove('active-popup'); // Remueve la clase 'active-popup' para cerrar el popup
});
