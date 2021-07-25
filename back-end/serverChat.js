const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const cors = require('cors');

/*
const app = express();
app.use(express.json());
app.listen(3002);
*/
app.use(cors());

app.get('/', (req, res) => {
    res.send('server rodando')
});


io.sockets.on('connection', (socket) => {
    socket.on('room', (room) => {
        socket.join(room);
        //io.sockets.in(room).emit('addChave');
        io.sockets.in(room).emit("reenvio");
    });

    socket.on('addChave', (entrada) => {
        const {idChat, chavePublica, idUsuario} = entrada;
        io.sockets.in(idChat).emit('newChave', {chavePublica, idUsuario});
    });

    socket.on('sendChat', (mensagem)=> {
        const {idChat, envio} = mensagem;
        io.sockets.in(idChat).emit('updateChat', envio);
    });
});

http.listen(3002);