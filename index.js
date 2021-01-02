const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./app/models')
const solicitante = require('./app/routers/Solicitantes.router.js');
const clubs = require('./app/routers/Clubs.router.js');
const app = express();



var corsOptions = {
	origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parserequest of content- type app/json
app.use(bodyParser.json());

// make db
//db.sequelize.sync({ force: true }).then(() => {
//console.log("Drop and re-sync db.");
//});
// conect db
db.sequelize.sync();
app.use('/solicitante', solicitante);
app.use('/clubs', clubs);
//simple route
app.get('/', (req, res) => {

	res.json({ message: "Hola Bienvenido" })
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
	console.log(`server is running on port $${PORT}.` )
});
