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

    const fetchEmail = useCallback(async () => {
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
        fetchEmail()
        console.log(username)
    }, [fetchEmail])

    if (loading) {
        return <Loader/>
    }

    return (
        <Form
            className='mt-5'
            style={{maxWidth: '320px', margin: '0 auto'}}
            onSubmit={handleSubmit}
        >
            <Form.Group>
                <Form.Label>Name:</Form.Label>
                <Form.Control value={username} onChange={handleChangeName}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Room:</Form.Label>
                <Form.Control as='select' value={roomId} onChange={handleChangeRoom}>
                    <option value='free'>Free</option>
                    <option value='job' disabled>
                        Job
                    </option>
                </Form.Control>
            </Form.Group>
            {username && (
                <Button variant='success' as={Link} to={`/chat`} ref={linkRef}>
                    Chat
                </Button>
            )}
        </Form>
    )
}
