import React, {useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../contexts/AuthContext";

export const Navbar = () => {

    const auth = useContext(AuthContext)
    const history = useHistory()
    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }

    const moveToMainPageHandler = () => {
        history.push("/");
    }

    return (
        <nav>
            <div className="nav-wrapper #757575 grey darken-1">
                <span className="brand-logo marginl10" style={{cursor: "pointer"}}
                      onClick={moveToMainPageHandler}>Чат</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать новый чат</NavLink></li>
                    <li><NavLink to="/join">Войти в новый чат</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}