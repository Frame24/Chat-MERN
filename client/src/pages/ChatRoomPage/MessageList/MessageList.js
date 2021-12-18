import {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react'
// styles
import {ListGroup} from 'react-bootstrap'
// components
import {MessageListItem} from './MessageListItem'
import {AuthContext} from "../../../contexts/AuthContext";
import {useHistory, useParams} from "react-router-dom";
import {useHttp} from "../../../hooks/http.hook";
import {useMessage} from "../../../hooks/message.hook";

const listStyles = {
    height: '80vh',
    border: '1px solid rgba(0,0,0,.4)',
    borderRadius: '4px',
    overflow: 'auto'
}

export const MessageList = ({messages, removeMessage, roomId}) => {
    const messagesEndRef = useRef(null)
    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [fetchedMessages, setFetchedMessages] = useState([{}])

    const fetchMessageById = useCallback(async (messageId, fetchedMessages, roomId) => {
        try {
            const data = await request(`/api/chat/${roomId}/message/${messageId}`, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
            setFetchedMessages((prevMes) => [
                ...prevMes,
                data
            ]);
            //fetchedMessages.push(data)
        } catch (e) {
        }
    },[])

   /* useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: 'smooth'
        })
    }, [messages])*/

    //try useMemo
    useMemo(() => {
        messages.forEach(mes=>{
            fetchMessageById(mes, fetchedMessages, roomId)
        })
    }, [messages])

    function RenderMessages(props){
        if(fetchedMessages){
            return (
                <>
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
                    {/*
                    <div key={fetchedMessages[fetchedMessages.length-1]._id}>{[fetchedMessages.length-1].text}</div>
                    */}
                </>
            )
        }
    }

    return (
        <>
            <ListGroup variant='flush' style={listStyles}>
                <RenderMessages/>
                {/*<span ref={messagesEndRef}></span>*/}
            </ListGroup>
        </>
    )
}
