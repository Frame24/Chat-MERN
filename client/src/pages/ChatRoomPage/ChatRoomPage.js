import {MessageForm} from './MessageForm'
import {MessageList} from './MessageList'
import {Container} from 'react-bootstrap'
import React, {useCallback, useContext, useEffect, useRef, useState} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useHttp} from "../../hooks/http.hook";
import {useMessage} from "../../hooks/message.hook";
import {useHistory, useParams} from "react-router-dom";

export function ChatRoomPage() {

    const auth = useContext(AuthContext)
    const {roomId} = useParams()
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const history = useHistory();
    const [username, setUsername] = useState([])
    const [newMessage, setNewMessage] = useState({})
    const linkRef = useRef(null)
    const [messageText, senderName, messageId] = ""
    const [fetchedMessages, setFetchedMessages] = useState([])

    const isIterable = (value) => {
        return Symbol.iterator in Object(value);
    }

    const sendMessage = useCallback(async (messageText) => {
        try {
            let data = await request(`/api/chat/${roomId}/message`, 'POST', {
                    newMessage: messageText,
                },
                {
                    Authorization: `Bearer ${auth.token}`
                })
            await fetchUserById(data.user)
                .then(r=>data.user = r)
            setFetchedMessages((prevMes) => [
                ...prevMes, data
            ]);
        } catch (e) {
        }
    }, [messageText, senderName])

    const removeMessage = useCallback(async (messageId) => {
        try {
        } catch (e) {
        }
    }, [messageId])

    //Fetching username
    const fetchUserById = useCallback(async (userId) => {
        try {
            return await request('/api/user/' + userId, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
        } catch (e) {
        }
    }, [auth, request])

    useEffect(() => {
        fetchUserById(auth.userId)
            .then(r => setUsername(r))
    }, [])

    //Fetching chat data
    const [chatUsers, setChatUsers] = useState()
    const [chatHistory, setChatHistory] = useState()
    const [chatName, setChatName] = useState("Room")
    const fetchChatData = useCallback(async () => {
        try {
            const data = await request(`/api/chat/${roomId}`, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
            setChatUsers(data.users);
            setChatHistory(data.history);
            setChatName(data.name);
        } catch (e) {
        }
    }, [roomId, auth, request])

    useEffect(() => {
        if (roomId) {
            fetchChatData()
        }
    }, [])

    //Messages

    const fetchMessageById = async (messageId) => {
        try {
            let data = await request(`/api/chat/${roomId}/message/${messageId}`, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                });
            await fetchUserById(data.user)
                .then(r=>data.user = r)
            return data
        } catch (e) {
        }
    }

    const fetchMessagesByIds = async (messageIdArr) => {
        if(!isIterable(messageIdArr))
            return []
        let resArr = [{}]
        for (let messageId of messageIdArr) {
            let data = ""
            try {
                 await fetchMessageById(messageId)
                     .then(res=>{
                         data = res
                     })
                resArr.push(data)
            } catch (e) {
            }
        }
        if(resArr.length>0){
            resArr.shift()
        }
        return resArr
    }

    useEffect(() => {
        fetchMessagesByIds(chatHistory)
            .then(res => {
                setFetchedMessages(res)
            })
    }, [chatHistory])

    return (
        <Container>
            <h2 className='text-center'>{chatName}</h2>
            {/*<UserList users={chatUsers}/>*/}
            <MessageList fetchedMessages={fetchedMessages} removeMessage={removeMessage} currentUser={username}/>
            <MessageForm username={username} sendMessage={sendMessage}
                         autoinput={"Сообщение №" + fetchedMessages.length}/>
        </Container>
    )
}
