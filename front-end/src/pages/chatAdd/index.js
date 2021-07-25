import React, {Component} from "react";
import api from "../../services/api";
import {Button, Form} from "react-bootstrap";


export default class ChatAdd extends Component{
    state = {
        usuarios: []
    }

    componentDidMount(){
        this.loadUsuarios();
    }

    loadUsuarios = async () => {
        const response = await api.get("/usuarios");
        const registrados = await api.get(`/chatUsuario/${this.props.match.params.id}`);
        const filtrado = response.data.docs.filter(e => {
            const y = registrados.data.map(r => (r.idUsuario));
            const x = y.indexOf(e._id);
            return (x === -1 ? true : false);
        })
        this.setState({usuarios: filtrado});
    }


    adicionarUsuario = async () => {        
        var achk = document.getElementsByName("item");

        for (var i=0;i<achk.length;i++){
            if (achk[i].checked) {
                await api.post("/chats/add",{"idUsuario": achk[i].value, "idChat": this.props.match.params.id});
            }
        }
        window.location.href = `/chat/${this.props.match.params.id}`;
    }

    render(){
        const {usuarios} = this.state;
        return(
            <div className="lista-usuarios">
                <Form>
                    {usuarios.map(usuario =>(
                        <Form.Group key={usuario._id} controlId="formBasicCheckbox">
                            <Form.Check
                                value={usuario._id} 
                                name="item"
                                type="checkbox" 
                                label={usuario.login} 
                            />
                        </Form.Group>
                    ))}   
                </Form> 
                <Button type="submit" onClick={this.adicionarUsuario}>Adicionar usuarios selecionados</Button>
            </div>   
        );
    }
}