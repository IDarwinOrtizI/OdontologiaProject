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
module.exports=client;
// Función para loguear un usuario
const loginUsuario = async (email, contrasena) => {
    try {
        // Consulta para verificar si el usuario existe con el email y contraseña proporcionados
        const query = `
            SELECT * 
            FROM usuarios 
            WHERE email = $1 AND contrasena = $2
        `;
        
        // Valores a pasar a la consulta
        const values = [email, contrasena];
        
        // Ejecutar la consulta
        const res = await client.query(query, values);

        // Verificar si el usuario existe en la base de datos
        if (res.rows.length > 0) {
            console.log('Login exitoso:', res.rows[0]);
            return true;  // Login exitoso
        } else {
            console.log('Email o contraseña incorrectos');
            return false; // Login fallido
        }
    } catch (err) {
        console.error('Error al realizar el login:', err.stack);
        return false; // En caso de error en la consulta
    } finally {
        client.end(); // Cerrar la conexión
    }
};

// Capturar el formulario de login
const loginForm = document.getElementById('loginForm');

// Manejar el envío del formulario
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();  // Prevenir el envío tradicional del formulario

    // Obtener los valores del email y contraseña
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('password').value;

    // Llamar a la función de login con los valores capturados
    loginUsuario(email, contrasena);
});