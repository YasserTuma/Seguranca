const express = require('express');
const routes = express.Router();

const usuarioController = require('./controllers/usuarioController');
const chatController = require('./controllers/chatController');

const auth = require('./middleware/auth');
//todas as rotas com auth sao aquelas em o usuario tem que estar logado


routes.get("/usuarios/:login/:senha", usuarioController.confirmUsuario);
routes.get("/usuarios", usuarioController.indexUsuario);
routes.get("/usuarios/show", auth, usuarioController.showUsuario);
routes.post("/usuarios", usuarioController.storeUsuario);
routes.put("/usuarios/:id", usuarioController.updateUsuario);
routes.delete("/usuarios/:id", usuarioController.removeUsuario);

routes.get("/chats", chatController.indexChat);
routes.get("/chats/:id", chatController.showChat);
routes.post("/chats", auth, chatController.storeChat);
routes.put("/chats/:id", chatController.updateChat);
routes.delete("/chats/remove/:id", chatController.removeChat);
routes.post("/chats/add", chatController.addNovoUsuario);
routes.delete("/chats/remove/:chat/:usuario", chatController.removeUsuario);
routes.get("/usuarioChat", auth, chatController.UsuarioChat);
routes.get("/chatUsuario/:id", chatController.ChatUsuario);


module.exports = routes;