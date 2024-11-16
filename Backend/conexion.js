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
        console.log('Conexión exitosa');
    }
});

// Función para registrar un nuevo usuario
async function registrarUsuario(name, email, password) {
    try {
        // Insertar el nuevo usuario en la base de datos
        const insertQuery = `
            INSERT INTO usuarios (nombre_usuario, email, contrasena, fecha_registro) 
            VALUES ($1, $2, $3, NOW())
        `;
        await client.query(insertQuery, [name, email, password]);

        return { success: true }; // Retorna el resultado de éxito
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        return { success: false, message: 'Error al registrar el usuario.' }; // Maneja el error
    }
}

// Exportar la función para usarla en otros archivos
module.exports = { registrarUsuario };
