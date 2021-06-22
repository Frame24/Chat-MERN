import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hooks'
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../contexts/AuthContext";

/*class Qwe extends React.Component{
    render() {
        return (
        <div>
            queen
        </div>)
    }
}*/

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
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

    /*useEffect(()=>{
        window.M.updateTextFields()
        message("123123321")
    },[])*/

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


    return (
        <div className="row">
            {/*<Qwe/>*/}
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
                </div>
            </div>
        </div>
    )
}

