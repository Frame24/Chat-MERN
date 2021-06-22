import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hooks'
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
    let caption = ""
    let description = ""


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const [form, setForm] = useState({
        caption: "",
        description: ""
    })

    const fetchNotes = useCallback(async () => {
        try {
            console.log(id)
            const data = await request(`/api/note/${id}`, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
            setForm(data)
        } catch (e) {
        }
    }, [id, auth, request])

    useEffect(() => {
        if (id) {
            fetchNotes()
        }
    }, [fetchNotes])

    if (loading) {
        return <Loader/>
    }
    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const saveHandler = async () => {
        try {
            let data = ""
            if (id) {
                data = await request(`/api/note/update/${id}`, 'POST', {...form},
                    {
                        Authorization: `Bearer ${auth.token}`
                    })
            } else {
                data = await request('/api/note/create', 'POST', {...form},
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
        <div className="note-big row">
            <div>
                <textarea className="note-header white-text" maxLength="46"
                          placeholder="Введите название заметки"
                          id="caption" name="caption" value={form.caption} onChange={changeHandler}>
                </textarea>
                <textarea className="note-footer white-text #afb42b lime darken-2"
                          placeholder="Введите текст заметки"
                          id="description" name="description" value={form.description} onChange={changeHandler}>
                </textarea>
                <p className="note-date #afb42b lime darken-2">
                    22.06.2021 11:41
                </p>
                <button className="btn grey black-text" onClick={cancelHandler}
                        disabled={loading}>Отмена
                </button>
                <button className="btn #9e9e9e grey lighten-1" onClick={saveHandler}
                        disabled={loading}>Сохранить
                </button>
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
