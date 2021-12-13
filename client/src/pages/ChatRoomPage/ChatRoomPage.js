import {MessageForm} from './MessageForm'
import {MessageList} from './MessageList'
import {UserList} from './UserList'
import {Container} from 'react-bootstrap'
import {useCallback, useContext, useEffect, useRef, useState} from "react";
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
    const linkRef = useRef(null)
    const [messageText, senderName, messageId] = ""

    const sendMessage = useCallback(async (messageText, senderName) => {
        try {
        } catch (e) {
        }
    }, [messageText, senderName])
    const removeMessage = useCallback(async (messageId) => {
        try {
        } catch (e) {
        }
    }, [messageId])

    //Fetching username
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

    //Fetching chat data
    const [chatUsers, setChatUsers] = useState([])
    const [chatHistory, setChatHistory] = useState([])

    const fetchChatData = useCallback(async () => {
        try {
            const data = await request(`/api/chat/${roomId}`, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
            setChatHistory(data.history)
            setChatUsers(data.users)
        } catch (e) {
            console.log(e)
        }
    }, [roomId, auth, request])

    useEffect(() => {
        if (roomId) {
            fetchChatData()
        }
        console.log("Fetching chat data")
        console.log(chatUsers)
        console.log(chatHistory)
    }, [fetchChatData, roomId])


    return (
        <Container>
            <h2 className='text-center'>Room</h2>
            {/*<UserList users={chatUsers}/>*/}
            <MessageList messages={chatHistory} removeMessage={removeMessage}/>
            <MessageForm username={username} sendMessage={sendMessage}/>
        </Container>
    )
}
