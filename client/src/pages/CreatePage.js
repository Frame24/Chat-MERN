import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from "../hooks/message.hook";
import {useHistory, useParams} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
import PropTypes from 'prop-types'
import {Loader} from "../components/Loader";

export const CreatePage = () => {

    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const history = useHistory();
    const {id} = useParams()

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const [chatForm, setChatForm] = useState({
        chatName: "",
        password: ""
    })

/*    const fetchNotes = useCallback(async () => {
        try {
            console.log(id)
            const data = await request(`/api/note/${id}`, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
            setChatForm(data)
        } catch (e) {
        }
    }, [id, auth, request])

    useEffect(() => {
        if (id) {
            fetchNotes()
        }
    }, [fetchNotes])*/

    if (loading) {
        return <Loader/>
    }
    const changeHandler = event => {
        setChatForm({...chatForm, [event.target.name]: event.target.value})
    }

    const saveHandler = async () => {
        try {
            let data = ""
            if (id) {
                data = await request(`/api/chat/update/${id}`, 'POST', {...chatForm},
                    {
                        Authorization: `Bearer ${auth.token}`
                    })
            } else {
                data = await request('/api/chat/create', 'POST', {...chatForm},
                    {
                        Authorization: `Bearer ${auth.token}`
                    })
            }
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
                <h1 className="white-text">Создание чата</h1>
                <div className="card #757575 grey darken-1">
                    <div className="card-content white-text">
                        <div>
                            <div className="input-field">
                                <input className="yellow-input" placeholder="Введите название чата"
                                       id="chatName" type="text" name="chatName"
                                       value={chatForm.chatName} onChange={changeHandler}/>
                                <label htmlFor="chatName">Название чата</label>
                            </div>
                            <div className="input-field">
                                <input className="yellow-input" placeholder="Введите пароль"
                                       id="password" type="password" name="password"
                                       value={chatForm.password} onChange={changeHandler}/>
                                <label htmlFor="password">Пароль</label>
                            </div>
                            <button className="btn grey black-text" onClick={cancelHandler}
                                    disabled={loading}>Отмена
                            </button>
                            <button className="btn #9e9e9e grey lighten-1" onClick={saveHandler}
                                    disabled={loading}>Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

CreatePage.defaultProps = {
    id: "",
}

CreatePage.propTypes = {
    id: PropTypes.string,
}
