import TimeAgo from 'react-timeago'
// styles
import {Button, Card, ListGroup} from 'react-bootstrap'
// icons
import {AiOutlineDelete} from 'react-icons/ai'

export const MessageListItem = ({messageId, messageText, senderName, createdAt, currentUser, removeMessage}) => {
    const handleRemoveMessage = (id) => {
        removeMessage(id)
    }
    return (
        <ListGroup.Item
            className={`d-flex ${currentUser ? 'justify-content-end' : ''}`}
        >
            <Card
                style={{
                    width: 'auto',
                    backgroundColor: "inherit",
                    margin: "10px 10px 10px 10px",
                }}
            >
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
                        }}>{senderName}</Card.Text>
                    <Card.Text as={TimeAgo} date={createdAt} className='small'
                               style={{
                                   fontWeight: "100",
                                   color: "#676767",
                               }}/>
                </Card.Header>
                <Card.Body className='justify-content-between align-items-center'>
                    <Card.Text
                        style={{
                            margin: "0px 10px",
                        }}>{messageText}</Card.Text>
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
    )
}
