const express = require('express');
const restful = require('node-restful');
const server = express();
const mongoose = restful.mongoose;
const bodyParser = require('bodyParser');
const cors = require('cors');


//database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://db/mydb');

//Middlewares
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(cors());

// ODM
const Client = restful.model('Client', {
    name: { type: String, required: true }
});

// REST API
Client.methods(['get', 'put', 'post', 'delete']);
Client.updateOptions({new: true, runValidators: true});

// Routes
Client.register(server, '/clients');



//teste
//server.get('/', (req, res, next) => res.send('Backend'));


//Iniciar Servidor
server.listen(3000);
