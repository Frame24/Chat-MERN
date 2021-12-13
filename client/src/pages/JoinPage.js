import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from "../hooks/message.hook";
import {useHistory, useParams} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
import PropTypes from 'prop-types'
import {Loader} from "../components/Loader";

export const JoinPage = () => {

    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const history = useHistory();
    const {id} = useParams()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const [form, setForm] = useState({
        chatId: "",
        password: ""
    })

    if (loading) {
        return <Loader/>
    }
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const joinHandler = async () => {
        try {
            let data = await request('/api/chat/join', 'POST', {...form},
                {
                    Authorization: `Bearer ${auth.token}`
                })
            message(data.message)
            history.push("/");
        } catch (e) {
        }
    }

    const cancelHandler = () => {
        history.push("/");
    }


    return (
        <div className="row">
            {/*<Qwe/>*/}
            <div className="col s6 offset-s3">
                <h1 className="white-text">Вход в чат</h1>
                <div className="card #757575 grey darken-1">
                    <div className="card-content white-text">
                        <div>
                            <div className="input-field">
                                <input className="yellow-input" placeholder="Введите id чата"
                                       id="chatId" type="text" name="chatId"
                                       value={form.chatId} onChange={changeHandler}/>
                                <label htmlFor="chatName">Id чата</label>
                            </div>
                            <div className="input-field">
                                <input className="yellow-input" placeholder="Введите пароль"
                                       id="password" type="password" name="password"
                                       value={form.password} onChange={changeHandler}/>
                                <label htmlFor="password">Пароль</label>
                            </div>
                            <button className="btn grey black-text" onClick={cancelHandler}
                                    disabled={loading}>Отмена
                            </button>
                            <button className="btn #9e9e9e grey lighten-1" onClick={joinHandler}
                                    disabled={loading}>Войти
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
