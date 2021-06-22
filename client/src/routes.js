import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { NotePage } from './pages/NotePage'
import { CreatePage } from './pages/CreatePage'
import { AuthPage } from './pages/AuthPage'
import { DetailPage } from './pages/DetailPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/notes" exact>
                    <NotePage/>
                </Route>
                <Route path="/create/:id" exact>
                    <CreatePage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Redirect to="/notes"/>
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}