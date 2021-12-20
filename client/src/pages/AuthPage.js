import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const {token, userId} = useParams()
    const message = useMessage()
    const history = useHistory();
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {
        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {
        }
    }

    if(token && userId){
        auth.login(token,userId,true)
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1 className="white-text">Заметки</h1>
                <div className="card #757575 grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input className="yellow-input" placeholder="Введите email"
                                       id="email" type="email" name="email"
                                       value={form.email} onChange={changeHandler}/>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input className="yellow-input" placeholder="Введите пароль"
                                       id="password" type="password" name="password"
                                       value={form.password} onChange={changeHandler}/>
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn marginr10 #9e9e9e grey lighten-1" onClick={loginHandler}
                                disabled={loading}>Войти
                        </button>
                        <button className="btn marginr10 grey black-text" onClick={registerHandler}
                                disabled={loading}>Регистрация
                        </button>
                    </div>
                    <div className="card-action">
                        <a href="https://oauth.vk.com/authorize?client_id=8031075&display=page&redirect_uri=http://localhost:5000/api/auth/login/vk&scope=email&response_type=code">Войти через VK</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

