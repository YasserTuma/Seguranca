import React, {Component} from 'react';
import api from '../../services/api';
import { Form, InputGroup, FormControl, Button, Alert, ListGroup, Card} from 'react-bootstrap';
import appSocket from '../../services/appSocket';


export default class ChatRoom extends Component{
    state = {
        chat: {},
        mensagens: [],
        msg: "",
        token: localStorage.getItem('token-do-usuario'),
        chavesPublicas: [],
        idUsuario: "",
        cripto: {},
        userLogin: "",
        ultimaMsg: 0,
        chavesR: [],
        userId: ""
    }
    
    async componentDidMount() {
        const cripto = this.iniciar();
        console.log(cripto)
        const {id} = this.props.match.params;
        const {token} = this.state;
        const header={"authorization": "bearer " + token}
        appSocket.emit('room', id);
       const d = await api.get("/usuarios/show", {headers: header});
        const u = d.data._id;
        const l = d.data.login;
        this.enviarChave(id, cripto.pubKey, u);
        this.setState({idUsuario: u, cripto: cripto, userLogin: l, userId: u});
    }

    enviarChave = (idChat, chavePublica, idUsuario) => {
        appSocket.emit('addChave', {idChat, chavePublica, idUsuario});
    }

    obtendoChaves =  () => {
        appSocket.on('newChave', (entrada) =>{
            var {chavesPublicas, chavesR} = this.state;
            if(!chavesR.includes(entrada.idUsuario)){
            //if(ultimaChave !== entrada.idUsuario){
                chavesPublicas.push(entrada);
                chavesR.push(entrada.idUsuario)
                console.log(chavesPublicas);
                this.setState({chavesPublicas: chavesPublicas, chavesR: chavesR});
            } 
        })
    }

    reenviarChave = () => {
        appSocket.on('reenvio', () => {
            const {cripto, userId} = this.state;
            const {id} = this.props.match.params;
            this.enviarChave(id, cripto.pubKey, userId);
        })
    }

    submeterResposta = async e => {
        console.log("enviando..........");
        
        e.preventDefault();
        const {id} = this.props.match.params;
        const {msg, chavesPublicas, cripto} = this.state;
        if(msg === ""){
            this.setState({error: "Preencha o texto da mensagem"});
        }
        else {
            console.log("mensagem nao criptografada:");
            console.log(msg);
            for(let i=0; i < chavesPublicas.length; i++){
                const {idUsuario, chavePublica} = chavesPublicas[i];
                const ct = cripto.encrypt(msg, chavePublica);
                console.log("mensagem criptografada:")
                console.log(ct);
                this.enviar(ct, idUsuario, id);
            }
            
        }
    }

    enviar = (ct, idUsuario, id) => {
        
        const idMensagem = (Math.floor(Math.random() * (1000000 - 0 + 1)) + 0);
        const {userLogin} = this.state;
        const envio = {idDest: idUsuario, ct: ct, idMensagem: idMensagem, remetente: userLogin};
        appSocket.emit('sendChat', {idChat: id, envio: envio});
    }

    iniciar = () =>{
        var Alphabet = "!\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ \nπ®ƒ©∆";

        Alphabet = Alphabet.split("");
        
        var Crypto = function (alpha, gen, C) {
            var p, B, encrypt, decrypt, f, g, modInv, modPow, toAlpha, to10;
            toAlpha = function (x) {
                var y, p, l, n;
                if (x === 0) {
                    return "!!!!";
                }
                y = [];
                n = 4;
                n = Math.ceil(n);
                while (n--) {
                    p = Math.pow(alpha.length, n);
                    l = Math.floor(x / p);
                    y.push(alpha[l]);
                    x -= l * p;
                }
                y = y.join("");
                return y;
            };
            to10 = function (x) {
                var y, p, n;
                y = 0;
                p = 1;
                x = x.split("");
                n = x.length;
                while (n--) {
                    y += alpha.indexOf(x[n]) * p;
                    p *= alpha.length;
                }
                return y;
            };
            modInv = function (gen, mod) {
                var v, d, u, c, q;
                v = 1;
                d = gen;
                c = mod % gen;
                u = Math.floor(mod / gen);
                while (d > 1) {
                    q = Math.floor(d / c);
                    d = d % c;
                    v = v + q * u;
                    if (d) {
                        q = Math.floor(c / d);
                        c = c % d;
                        u = u + q * v;
                    }
                }
                return d ? v : mod - u;
            };
            modPow = function (base, exp, mod) {
                var c;
                if (exp === 0) {
                    return 1;
                } else if (exp < 0) {
                    exp = -exp;
                    base = modInv(base, mod);
                }
                c = 1;
                while (exp > 0) {
                    if (exp % 2 === 0) {
                        base = (base * base) % mod;
                        exp /= 2;
                    } else {
                        c = (c * base) % mod;
                        exp--;
                    }
                }
                return c;
            };
            p = 91744613;
            C = parseInt(C, 10);
            if (isNaN(C)) {
                C = Math.round(Math.sqrt(Math.random() * Math.random()) * (p - 2) + 2);
            }
            B = modPow(gen, C, p);
            decrypt = function (a) {
                var d, x, y;
                x = a[1];
                y = modPow(a[0], -C, p);
                d = (x * y) % p;
                d = Math.round(d) % p;
                return alpha[d - 2];
            };
            encrypt = function (key, d) {
                var k, a;
                k = Math.ceil(Math.sqrt(Math.random() * Math.random()) * 1E10);
                d = alpha.indexOf(d) + 2;
                a = [];
                a[0] = modPow(key[1], k, key[0]);
                a[1] = (d * modPow(key[2], k, key[0])) % key[0];
                return a;
            };
            f = function (message, key) {
                var n, x, y;
                y = [];
                message = message.split("");
                n = message.length;
                while (n--) {
                    x = encrypt(key, message[n]);
                    y.push(toAlpha(x[0]));
                    y.push(toAlpha(x[1]));
                }
                y = y.join("");
                return y;
            };
            g = function (message) {
                var n, m, d, x;
                m = [];
                n = message.length / 8;
                while (n--) {
                    x = message[8 * n + 4];
                    x += message[8 * n + 5];
                    x += message[8 * n + 6];
                    x += message[8 * n + 7];
                    m.unshift(x);
                    x = message[8 * n];
                    x += message[8 * n + 1];
                    x += message[8 * n + 2];
                    x += message[8 * n + 3];
                    m.unshift(x);
                }
                x = [];
                d = [];
                n = m.length / 2;
                while (n--) {
                    x[0] = m[2 * n];
                    x[1] = m[2 * n + 1];
                    x[0] = to10(x[0]);
                    x[1] = to10(x[1]);
                    d.push(decrypt(x));
                }
                message = d.join("");
                return message;
            };
            return {
                pubKey: [p, gen, B],
                priKey: C,
                decrypt: g,
                encrypt: f
            };
        };
        
        const cripto = Crypto(Alphabet, 69); 
        return cripto;
    }
    
    receberMensagens = () => {
        appSocket.on('updateChat', (entrada) =>{
            const {mensagens, cripto, idUsuario, ultimaMsg} = this.state;
            const {idDest, ct, idMensagem, remetente} = entrada;
            if((idUsuario === idDest) && (idMensagem !== ultimaMsg)){
                console.log("recebendo mensagem ............");
                const pt = cripto.decrypt(ct);
                console.log("mensagem criptografada:");
                console.log(ct);
                console.log("mensagem descriptografada");
                console.log(pt);
                mensagens.push({pt, idMensagem, remetente});
                this.setState({mensagens: mensagens, ultimaMsg: idMensagem});
            }
        })
    }


    
    render(){
        this.obtendoChaves();
        this.receberMensagens();
        this.reenviarChave();
        const {mensagens, chat, chavesR} = this.state;
        //console.log(chavesR);
        return(
            <div>
                <Card>
                    <Card.Header><b>{chat.titulo}</b></Card.Header>
                    <ListGroup variant="flush">
                    {mensagens.map(mensagem => (
                        <ListGroup.Item key={mensagem.idMensagem}>
                            <div style={{ width: '100%' }}>{mensagem.pt}</div>
                            <div style={{ width: '100%', color: 'dodgerblue' }}>
                                <i> {mensagem.remetente} </i>
                            </div>
                        </ListGroup.Item>
                    ))}
                    </ListGroup>
                </Card>
                <hr />
                <Form className="formulario" onSubmit={this.submeterResposta}>
                    {this.state.error && <Alert variant="danger">{this.state.error}</Alert>}
                    <InputGroup>
                        <InputGroup.Prepend>
                        <InputGroup.Text>Insira uma mensagem</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl id="texto" as="textarea" aria-label="With textarea" onChange={e => this.setState(({msg: e.target.value}))}/>
                    </InputGroup>
                    <Button className="botao" type="submit">Enviar</Button>
                </Form>
                <hr />
                <Button href={`/chat/add/${this.props.match.params.id}`}>Adicionar novos usuarios</Button>
            </div>      
        );
    }
}