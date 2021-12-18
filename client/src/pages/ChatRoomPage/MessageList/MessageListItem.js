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
                bg={`${currentUser ? 'primary' : 'secondary'}`}
                text='light'
                style={{width: '55%'}}
            >
                <Card.Header className='d-flex justify-content-between align-items-center'>
                    <Card.Text as={TimeAgo} date={createdAt} className='small'/>
                    <Card.Text>{senderName}</Card.Text>
                </Card.Header>
                <Card.Body className='d-flex justify-content-between align-items-center'>
                    <Card.Text>{messageText}</Card.Text>
                    {currentUser && (
                        <Button
                            variant='none'
                            className='text-warning'
                            onClick={() => handleRemoveMessage(messageId)}
                        >
                            <AiOutlineDelete/>
                        </Button>
                    )}
                </Card.Body>
            </Card>
        </ListGroup.Item>
    )
}
