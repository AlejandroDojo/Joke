const express = require("express");
const app = express();
const port = 8000;
const JokesRoute = require('./routes/jokesRoutes');
// Conexión base de datos
require('./config/dataBase')

// Filtro de entrada en express
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );
// Llamar ruta.
JokesRoute(app);
// Iniciar servidor
app.listen( port, () => console.log(`Listening on port: ${port}`) );