import React from 'react';
import {Breadcrumb} from 'react-bootstrap';
import './styles.css';

const  Bar = () => (
    <Breadcrumb>
        <Breadcrumb.Item href="/">Todas as perguntas</Breadcrumb.Item>
        <Breadcrumb.Item href="/enviarPergunta">Enviar Pergunta</Breadcrumb.Item>
        <Breadcrumb.Item href="/">Todos os usuarios</Breadcrumb.Item>
        <Breadcrumb.Item href="/chat">Chat</Breadcrumb.Item>
    </Breadcrumb>  
);

export default Bar;