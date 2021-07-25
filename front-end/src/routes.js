import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";

import Main from "./pages/main/index";
import Login from "./pages/login/index";
import Register from "./pages/register/index";
import ChatMenu from "./pages/chatMenu/index";
import ChatRoom from "./pages/chatRoom/index";
import ChatAdd from "./pages/chatAdd/index";
import CreateChat from "./pages/createChat/index";


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/login" component={Login} />
            <Route path="/registrar" component={Register} />
            <Route exact path="/chat" component={ChatMenu} />
            <Route exact path="/chat/:id" component={ChatRoom} />
            <Route path="/chat/add/:id" component={ChatAdd} />
            <Route path="/criarChat" component={CreateChat} />
            
        </Switch>
    </BrowserRouter>
);

export default Routes;


