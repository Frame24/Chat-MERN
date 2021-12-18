import {ListGroup} from 'react-bootstrap'
import {MessageListItem} from "./MessageListItem";
import {useEffect, useRef} from "react";

const listStyles = {
    height: '80vh',
    border: '1px solid rgba(0,0,0,.4)',
    borderRadius: '4px',
    overflow: 'auto'
}

export const MessageList = ({fetchedMessages, removeMessage, roomId}) => {

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
                    <MessageListItem
                        key={msg._id}
                        messageId ={msg._id}
                        messageText ={msg.text}
                        senderName ={msg.user}
                        createdAt ={msg.date}
                        currentUser ={msg.user}
                        removeMessage={removeMessage}
                    />
                ))}
                <span ref={messagesEndRef}/>
            </ListGroup>
        </>
    )
}
