import {ListGroup} from 'react-bootstrap'

const listStyles = {
    height: '80vh',
    border: '1px solid rgba(0,0,0,.4)',
    borderRadius: '4px',
    overflow: 'auto'
}

export const MessageList = ({fetchedMessages, removeMessage, roomId}) => {
    return (
        <>
            <ListGroup variant='flush' style={listStyles}>
                {/*<div key={newMessage._id}>{newMessage.text}</div>*/}
                {fetchedMessages.map((msg) => (
                    <div key={msg._id}>{msg.text}</div>
                    /*<MessageListItem
                        key={msg.messageId}
                        messageId ={}
                        messageText ={}
                        senderName ={}
                        createdAt ={}
                        currentUser ={}
                        removeMessage={removeMessage}
                    />*/
                ))}
                {/*<span ref={messagesEndRef}></span>*/}
            </ListGroup>
        </>
    )
}
