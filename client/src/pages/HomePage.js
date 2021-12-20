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
    const linkRef = useRef(null)

    const isIterable = (value) => {
        return Symbol.iterator in Object(value);
    }

    // Выводит ошибки, сязанные с запросами на сервер
    /*useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])*/

    //Fetching username
    const fetchUserById = async (userId) => {
        try {
            return await request('/api/user/' + userId, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
        } catch (e) {
        }
    }

    useEffect(() => {
        fetchUserById(auth.userId)
            .then(r => setUsername(r))
    }, [auth])


    const [chatsIds, setChatsIds] = useState([])
    const fetchUserChats = useCallback(async () => {
        try {
            return await request(`/api/user/${auth.userId}/chats`, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
        } catch (e) {
        }
    }, [])

    useEffect(() => {
        fetchUserChats()
            .then(r => setChatsIds(r));
    }, [])

    const fetchChatsByIds = async (chatsIdsArr) => {
        if (!isIterable(chatsIdsArr))
            return []
        let resArr = [{}]
        for (let chatId of chatsIdsArr) {
            try {
                let data = await request(`/api/chat/${chatId}`, 'GET', null,
                    {
                        Authorization: `Bearer ${auth.token}`
                    });
                if (data.history.length > 0) {
                    data.lastMessage = await request(`/api/chat/${chatId}/message/${data.history[data.history.length - 1]}`, 'GET', null,
                        {
                            Authorization: `Bearer ${auth.token}`
                        });
                    await fetchUserById(data.lastMessage.user)
                        .then(r => data.lastMessage.user = r)
                }
                else{
                    console.log(chatId)
                    data.lastMessage = {
                        text: "На данный момент, в чате нет сообщений",
                    }
                }
                resArr.push(data)
            } catch (e) {
            }
        }
        if (resArr.length > 0) {
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

/*    if (loading) {
        return <Loader/>
    }*/

    return (
        <Container>
            <h2 className='text-center'>Выберите чат</h2>
            {/*<div>{fetchedChats.map(ch=>{
                return (<div>{ch._id}</div>)
            })}</div>*/}
            <ChatList fetchedChats={fetchedChats}/>
        </Container>
    )
}
