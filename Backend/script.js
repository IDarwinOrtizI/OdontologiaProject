// Selecciona los elementos del DOM
const wrapper = document.querySelector('.wrapper'); // Selecciona el contenedor principal de los formularios
const loginLink = document.querySelector('.login-link'); // Selecciona el enlace para volver al login
const registerLink = document.querySelector('.register-link'); // Selecciona el enlace para abrir el registro
const btnPopup = document.querySelector('.btnLogin-Popup'); // Selecciona el botón que abre el formulario de login/registro
const iconClose = document.querySelector('.icon-close'); // Selecciona el icono de cierre (X)

// Seleccionar los formularios por su ID
const loginForm = document.getElementById('loginForm'); // Selecciona el formulario de login
const registerForm = document.getElementById('registerForm'); // Selecciona el formulario de registro

// Evento que se activa cuando el enlace de "Registrarse" es clicado
registerLink.addEventListener('click', (event) => {
    event.preventDefault(); // Previene la acción por defecto del enlace
    wrapper.classList.add('active'); // Añade la clase 'active' para mostrar el formulario de registro
});

// Evento que se activa cuando el enlace de "Login" es clicado
loginLink.addEventListener('click', (event) => {
    event.preventDefault(); // Previene la acción por defecto del enlace
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

// Manejo del envío del formulario de login
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const email = document.querySelector('input[type="email"]:nth-of-type(1)').value; // Obtener el primer input de tipo email
    const password = document.querySelector('input[type="password"]:nth-of-type(1)').value; // Obtener el primer input de tipo password

    // Aquí haces la llamada a tu backend para autenticar al usuario
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (result.success) {
            // Maneja el éxito (ej. redirigir a otra página o mostrar un mensaje)
            alert('Login exitoso!');
        } else {
            // Maneja el error (ej. mostrar un mensaje de error)
            alert('Error de login: ' + result.message);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
    }
});

// Manejo del envío del formulario de registro
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario

    const name = document.querySelector('input[type="text"]').value; // Obtener el primer input de tipo text
    const email = document.querySelector('input[type="email"]:nth-of-type(2)').value; // Obtener el segundo input de tipo email
    const password = document.querySelector('input[type="password"]:nth-of-type(2)').value; // Obtener el segundo input de tipo password

    console.log('Datos enviados al backend:', { name, email, password }); // Verifica que los datos se envían correctamente

    try {
        // Enviar datos al backend para registrarlos en la base de datos
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });

        const result = await response.json();
        if (result.success) {
            alert('Registro exitoso! Ahora puedes iniciar sesión.');
            wrapper.classList.remove('active'); // Cierra el formulario de registro
        } else {
            alert('Error de registro: ' + result.message);
        }
    } catch (error) {
        console.error('Error en la solicitud:', error);
        alert('Hubo un problema al intentar registrarte.');
    }
});

