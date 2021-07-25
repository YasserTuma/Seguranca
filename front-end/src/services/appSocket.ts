import IO from 'socket.io-client';


const appSocket = IO.connect("http://localhost:3002", {secure: true});

export default appSocket;