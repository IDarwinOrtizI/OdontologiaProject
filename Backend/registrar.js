const { Client } = require('pg');

// Configuración de la conexión
const client = new Client({
    host: 'localhost',
    database: 'bd_Odontologia',
    user: 'postgres',
    password: 'sebastian',
    port: 5432
});

// Conectar a la base de datos
client.connect(err => {
    if (err) {
        console.error('Error de conexión:', err.stack);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});
module.exports = client;

// Función para registrar un usuario
const registrarUsuario = async (nombre, email, contrasena) => {
    try {
        // Consulta para insertar un nuevo usuario en la base de datos
        const query = `
            INSERT INTO usuarios (nombre_usuario, email, contrasena)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        
        // Valores a pasar a la consulta
        const values = [nombre, email, contrasena];
        
        // Ejecutar la consulta
        const res = await client.query(query, values);

        // Verificar si el registro fue exitoso
        if (res.rows.length > 0) {
            console.log('Usuario registrado exitosamente:', res.rows[0]);
            return true;  // Registro exitoso
        } else {
            console.log('Error al registrar el usuario');
            return false; // Error en el registro
        }
    } catch (err) {
        console.error('Error al realizar el registro:', err.stack);
        return false; // En caso de error en la consulta
    }
};

// Capturar el formulario de registro
const registroForm = document.getElementById('registroForm');

// Manejar el envío del formulario
registroForm.addEventListener('submit', async (event) => {
    event.preventDefault();  // Prevenir el envío tradicional del formulario

    // Obtener los valores del formulario
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contraseña').value;

    // Llamar a la función de registro con los valores capturados
    const success = await registrarUsuario(nombre, email, contrasena);

    if (success) {
        // Registro exitoso, redirigir a otra página o mostrar mensaje
        alert('Usuario registrado exitosamente');
        // Redireccionar (ejemplo)
        window.location.href = '/login'; // Redirige a la página de login, puedes cambiar esta URL
    } else {
        // Error en el registro
        alert('Error al registrar el usuario');
    }
});
