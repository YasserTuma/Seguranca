const mongoose = require("mongoose");
const Chat = mongoose.model("Chat");
const UsuarioChat = mongoose.model("UsuarioChat");

module.exports = {

    async indexChat(req, res){
        const {page = 1} = req.query;
        const chats = await Chat.paginate(req.body, {page, limit: 10});
        return res.json(chats);
    },
    async showChat(req,res){
        const chat = await Chat.findById(req.params.id);
        const usuarios = await UsuarioChat.find({"idChat": req.params.id}).populate('idUsuario');
        return res.json({chat, usuarios});
    },
    async UsuarioChat(req,res){
        const chats = await UsuarioChat.find({"idUsuario": req.userId}).populate('idChat');
        return res.json(chats);
    },
    async ChatUsuario(req, res){
        const usuarios = await UsuarioChat.find({"idChat": req.params.id});
        return res.json(usuarios)
    },
    async storeChat(req, res){
        const {titulo} = req.body;
        const chat = await Chat.create({"idCriador": req.userId, "titulo": titulo});
        await UsuarioChat.create({"idUsuario": req.userId, "idChat": chat._id});

        return res.json(chat);
    },
    async addNovoUsuario(req, res){
        const adicionar = await UsuarioChat.create(req.body);
        return res.json(adicionar);
    },
    async removeUsuario(req, res){
        const {chat, usuario} = req.params;
        await UsuarioChat.deleteOne({"idChat": chat, "idUsuario": usuario});
        return res.send();
    },
    async updateChat(req, res){
        const chat = await Chat.findByIdAndUpdate(req.params.id, req.body, {new: true});
        return res.json(chat);
    },
    async removeChat(req, res){
        await Chat.findByIdAndRemove(req.params.id);
        await UsuarioChat.deleteMany({"idChat": req.params.id})
        return res.send();
    }
}