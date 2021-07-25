const mongoose = require("mongoose");
const Usuario = mongoose.model("Usuario");
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

module.exports = {

    async confirmUsuario(req, res){
        const {login, senha} = req.params;
        const usuario = await Usuario.findOne({"login": login, "senha": senha});

        const token = jwt.sign({id: usuario.id}, authConfig.secret, {expiresIn: 7200});

        return res.json({usuario, token});
    },

    async indexUsuario(req, res){
        const {page = 1} = req.query;
        const usuarios = await Usuario.paginate({}, {page, limit: 10});
        return res.json(usuarios);
    },
    async showUsuario(req,res){
        const usuario = await Usuario.findById(req.userId);
        return res.json(usuario);
    },
    async storeUsuario(req, res){
        const usuario = await Usuario.create(req.body);
        return res.json(usuario);
    },
    async updateUsuario(req, res){
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(usuario);
    },
    async removeUsuario(req, res){
        await Usuario.findByIdAndRemove(req.params.id);
        return res.send();
    }
}
