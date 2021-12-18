import {ListGroup} from 'react-bootstrap'
import {ChatListItem} from "./ChatListItem";
import {useContext, useEffect, useRef} from "react";
import {AuthContext} from "../../contexts/AuthContext";

const listStyles = {
    height: '80vh',
    border: '1px solid rgba(0,0,0,.4)',
    borderRadius: '4px',
    overflow: 'auto'
}

export const ChatList = ({fetchedMessages}) => {

    const auth = useContext(AuthContext)

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [fetchedMessages]);

    return (
        <>
            <ListGroup variant='flush' style={listStyles}>
                {/*<div key={newMessage._id}>{newMessage.text}</div>*/}
                {fetchedMessages.map((msg) => (
                    <ChatListItem
                        key={msg._id}
                        messageId ={msg._id}
                        messageText ={msg.text}
                        senderName ={msg.user}
                        createdAt ={msg.date}
                    />
                ))}
                <span ref={messagesEndRef}/>
            </ListGroup>
        </>
    )
}
