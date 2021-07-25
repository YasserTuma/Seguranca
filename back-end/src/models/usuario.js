const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const UsuarioSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    },
    senha: {
        type: String,
        required: true
    }
});

UsuarioSchema.plugin(mongoosePaginate);

mongoose.model('Usuario', UsuarioSchema);
