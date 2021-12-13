import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import {AuthPage} from './pages/AuthPage'
import {ChatRoomPage} from "./pages/ChatRoomPage/ChatRoomPage";
import {CreatePage} from "./pages/CreatePage";
import {JoinPage} from "./pages/JoinPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <HomePage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/join" exact>
                    <JoinPage/>
                </Route>
                <Route path="/chat/:roomId" exact>
                    <ChatRoomPage/>
                </Route>
                <Redirect to="/home"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}