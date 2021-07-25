const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const ChatSchema = new mongoose.Schema({
    idCriador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
    titulo: {
        type: String,
        required: true
    },
    
    publicacao: {
        type: Date,
        default: Date.now,
    }
});

ChatSchema.plugin(mongoosePaginate);

mongoose.model('Chat', ChatSchema);
