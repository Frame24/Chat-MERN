import TimeAgo from 'react-timeago'
// styles
import {Card, ListGroup} from 'react-bootstrap'
// icons
import {NavLink} from "react-router-dom";
import React from "react";

export const ChatListItem = ({chatId, lastMessageText, lastMessageSenderName, lastMessageCreatedAt, chatName}) => {

    return (<NavLink to= {`/chat/${chatId}`}>
            <ListGroup.Item>
                <Card
                    style={{
                        width: 'auto',
                        backgroundColor: "inherit",
                        margin: "10px 10px 10px 10px",
                        color: "white",

                    }}
                >
                    <Card.Text
                        style={{
                            margin: "0px 10px",
                            fontWeight: "bold",
                            fontSize: "20pt",
                        }}>{chatName ? `${chatName} (${chatId})` : ""}</Card.Text>
                    <Card.Header className='justify-content-between align-items-center'
                                 style={{
                                     display: "inline-flex",
                                     width: "auto,"
                                 }}>
                        <Card.Text
                            style={{
                                margin: "0px 10px",
                                fontWeight: "bold",
                                color: "#999999",
                            }}>{lastMessageSenderName}</Card.Text>
                        <Card.Text as={TimeAgo} date={lastMessageCreatedAt} className='small'
                                   style={{
                                       fontWeight: "100",
                                       color: "#676767",
                                   }}/>
                    </Card.Header>
                    <Card.Body className='justify-content-between align-items-center'>
                        <Card.Text
                            style={{
                                margin: "0px 10px",
                                fontWeight: "100",
                                color: "#676767",
                            }}>{lastMessageText}</Card.Text>
                        {/*{currentUser && (
                        <Button
                            variant='none'
                            className='text-warning'
                            onClick={() => handleRemoveMessage(messageId)}
                        >
                            <AiOutlineDelete/>
                        </Button>
                    )}*/}
                    </Card.Body>
                </Card>
            </ListGroup.Item>
        </NavLink>
    )
}
