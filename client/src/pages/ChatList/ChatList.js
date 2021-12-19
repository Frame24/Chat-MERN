import {ListGroup} from 'react-bootstrap'
import {ChatListItem} from "./ChatListItem";
import {useContext, useEffect, useRef} from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useHttp} from "../../hooks/http.hook";

const listStyles = {
    height: '80vh',
    border: '1px solid rgba(0,0,0,.4)',
    borderRadius: '4px',
    overflow: 'auto'
}

export const ChatList = ({fetchedChats}) => {

    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const chatsLastMessageDict = {}
    const messagesEndRef = useRef(null)

    const scrollToRefSpan = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToRefSpan()
    }, [fetchedChats]);

    return (
        <>
            <ListGroup variant='flush' style={listStyles}>
                <span ref={messagesEndRef}/>
                {fetchedChats.map((chat) => (
                    <ChatListItem
                        key={chat._id}
                        chatId={chat._id}
                        lastMessageText={chat.lastMessage ? chat.lastMessage.text : ""}
                        lastMessageSenderName={chat.lastMessage ? chat.lastMessage.user : ""}
                        lastMessageCreatedAt={chat.lastMessage ? chat.lastMessage.date : "2000-12-18T16:55:08.832+00:00"}
                        chatName={chat.name}
                    />
                ))}
            </ListGroup>
        </>
    )
}
