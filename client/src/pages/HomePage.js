import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {AuthContext} from "../contexts/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {Link, useHistory} from "react-router-dom";
import {Loader} from "../components/Loader";
import {Button, Form} from 'react-bootstrap'

export const HomePage = () => {


    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [notes, setNotes] = useState([])
    const message = useMessage()
    const history = useHistory();
    const [username, setUsername] = useState([])
    const [roomId, setRoomId] = useState('free')
    const linkRef = useRef(null)

    const handleChangeName = (e) => {
        setUsername(e.target.value)
    }

    const handleChangeRoom = (e) => {
        setRoomId(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        linkRef.current.click()
    }

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const fetchUsername = useCallback(async () => {
        try {
            const data = await request('/api/user/' + auth.userId, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
            setUsername(data)
        } catch (e) {
        }
    }, [auth, request])

    useEffect(() => {
        console.log("fetching email")
        fetchUsername()
        console.log(username)
    }, [fetchUsername])

    if (loading) {
        return <Loader/>
    }

    return (
        <div></div>
    )
}
