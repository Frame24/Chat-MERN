import React, {useCallback, useContext} from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import {AuthContext} from "../contexts/AuthContext";
import {useHttp} from "../hooks/http.hook";

export const Navbar = () => {

    const auth = useContext(AuthContext)
    const history = useHistory()
    const {loading, request, error, clearError} = useHttp()

    const logoutHandler = (event) => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }

    const moveToMainPageHandler = () => {
        history.push("/");
    }

    const changeNameToVK = async (event) => {
        event.preventDefault()
        if (auth.isVKUser){
            await request(`/api/user/${auth.userId}/updateVKUsername`, 'POST', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
        }
        window.location.reload();
    }

    function renderChangeNameToVK() {
        console.log(auth)
        if (auth.isVKUser)
            return (<li><a href="/" onClick={changeNameToVK}>Загрузить имя из вк</a></li>)
        return null;
    }

    return (
        <nav>
            <div className="nav-wrapper #757575 grey darken-1">
                <span className="brand-logo marginl10" style={{cursor: "pointer"}}
                      onClick={moveToMainPageHandler}>Чат</span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create">Создать новый чат</NavLink></li>
                    <li><NavLink to="/join">Войти в новый чат</NavLink></li>
                    {renderChangeNameToVK()}
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}