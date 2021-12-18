import React, {useCallback, useContext, useEffect, useRef, useState} from 'react'
import {AuthContext} from "../contexts/AuthContext";
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {useHistory} from "react-router-dom";
import {Loader} from "../components/Loader";
import {Container} from 'react-bootstrap'
import {ChatList} from "./ChatList/ChatList";

export const HomePage = () => {


    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [notes, setNotes] = useState([])
    const message = useMessage()
    const history = useHistory();
    const [username, setUsername] = useState([])
    const [roomId, setRoomId] = useState('free')
    const linkRef = useRef(null)

    const isIterable = (value) => {
        return Symbol.iterator in Object(value);
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
        fetchUsername()
    }, [fetchUsername])


    const [chatsIds, setChatsIds] = useState([])
    const fetchUserChats = useCallback(async () => {
        try {
            return await request(`/api/${auth.userId}/chats`, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
        } catch (e) {
        }
    }, [])

    useEffect(() => {
        fetchUserChats().then(r => setChatsIds(r));
        console.log("chatsIds")
        console.log(chatsIds)
    }, [chatsIds])

    const fetchChatsByIds = async (chatsIdsArr) => {
        if (!isIterable(chatsIdsArr))
            return []
        let resArr = [{}]
        for (let chatId of chatsIdsArr) {
            try {
                let data = await request(`/api/chat/${roomId}`, 'GET', null,
                    {
                        Authorization: `Bearer ${auth.token}`
                    });
                resArr.push(data)
            } catch (e) {
            }
        }
        if (resArr.length > 1) {
            resArr.shift()
        }
        return resArr
    }

    const [fetchedChats, setFetchedChats] = useState([])
    useEffect(() => {
        fetchChatsByIds(chatsIds)
            .then(res => {
                setFetchedChats(res)
            })
    }, [chatsIds])

    if (loading) {
        return <Loader/>
    }

    return (
        <Container>
            <h2 className='text-center'>Выберите чат</h2>
            <div>{fetchedChats.length}</div>
            {/*<ChatList fetchedMessages={fetchedChats}/>*/}
        </Container>
    )
}
