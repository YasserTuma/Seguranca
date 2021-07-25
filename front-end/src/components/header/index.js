import React, {Component} from 'react';
import { Navbar, Nav, Form, Container, Button } from 'react-bootstrap';
import './styles.css';

export default class Header extends Component{

    state = {
        pesquisa: ""
    }

    isLogin = () => {
        const token = localStorage.getItem('token-do-usuario');

        if(token === "") {
            return(
                <Form inline>
                    <Nav className="mr-auto">
                        <Nav.Link href="/registrar">Cadastrar</Nav.Link>
                        <Button onClick={this.fazerLogin} variant="outline-primary">Login</Button>
                    </Nav>
                </Form>
            );
        } else {
            const login = localStorage.getItem('login-do-usuario');           
            return(
                <Form inline>
                    <Nav className="mr-auto">
                        <Nav.Link href="/"><b>{login}</b></Nav.Link>
                        <Button onClick={this.sair} variant="outline-primary">Sair</Button>
                    </Nav>
                </Form>
            );
        }
    }

    isAdm = () => {
        const adm = localStorage.getItem('isAdm')
        if(adm === "true"){
            return(
                <Form inline>
                        <Nav.Link href="/adm/users">Listar Usuarios</Nav.Link>
                        <Nav.Link href="/adm/chats">Listar Chats</Nav.Link>
                </Form>
            );
        }
        else
            return null;
    }

    sair = () => {
        localStorage.setItem('token-do-usuario', "");
        localStorage.setItem('login-do-usuario', "");
        localStorage.setItem('isAdm', false);
        localStorage.setItem('id-do-usuario', "");
        window.location.href = '/';
    }

    fazerLogin = () => {
        window.location.href = '/login'
    }

    tratamentoLogo = () => {
        var pergunta = window.location.pathname.toString().indexOf('pergunta');
        var adm = window.location.pathname.toString().indexOf('adm');

        if (pergunta === 1 || adm === 1) {
            return (
                null
            );
        } else {
            return (
                <Navbar.Brand id="banner" href="/">
                    <img
                        alt=""
                        src="logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
            );
        }
    }

    pesquisar = (e) => {
        e.preventDefault();
        window.location.href = `/pesquisa/${this.state.pesquisa}`;
    }
 
    render(){
        //const x = this.isAdm();
        return(
                <Navbar stick="top" bg="dark" variant="dark" expand="lg">
                    <Container>
                        {this.tratamentoLogo()}
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home</Nav.Link>                        
                                <Nav.Link href="/chat">Chat</Nav.Link>
                                {this.isAdm()}
                            </Nav>
                            {this.isLogin()}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
        );
    }
}