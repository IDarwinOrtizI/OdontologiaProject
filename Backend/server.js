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
module.exports=client;
client.query('SELECT * FROM usuarios', (err, res) => {
    if (err) {
      console.error('Error en la consulta', err.stack);
    } else {
      console.log('Resultados de la consulta:', res.rows);
    }
});


