import {useParams} from 'react-router-dom'
// hooks
//import {useChat, useLocalStorage} from 'hooks'
// components
import {MessageForm} from './MessageForm'
import {MessageList} from './MessageList'
import {UserList} from './UserList'
// styles
import {Container} from 'react-bootstrap'
import {useContext} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useChat} from "../../hooks/chat.hook";

export function ChatRoomPage() {

    const auth = useContext(AuthContext)
    const {roomId} = useParams()
    const [username] = "user1"
    const {users, messages, sendMessage, removeMessage} = useChat(roomId, auth.userId)

    return (
        <Container>
            <h2 className='text-center'>Room: {roomId === 'job' ? 'Job' : 'Free'}</h2>
            <UserList users={users}/>
            <MessageList messages={messages} removeMessage={removeMessage}/>
            <MessageForm username={username} sendMessage={sendMessage}/>
        </Container>
    )
}
