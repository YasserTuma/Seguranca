const mongoose = require('mongoose');

const UsuarioChatSchema = new mongoose.Schema({
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    idChat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        require: true
    }
});

mongoose.model('UsuarioChat', UsuarioChatSchema);