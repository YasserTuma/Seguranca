const express = require('express');
const mongoose = require('mongoose');
const requireDir = require("require-dir");
const cors = require('cors');

//iniciando o DB
mongoose.connect('mongodb://localhost:27017/nodeapi',{useUnifiedTopology: true, useNewUrlParser: true });
requireDir("./src/models");

//iniciando a aplicacao
const app = express();
app.use(express.json());
app.use(cors());

//primeira rota
app.use('/', require("./src/routes"));
app.listen(3001);
