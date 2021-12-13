// styles
import {Accordion, Badge, Button, Card} from 'react-bootstrap'
// icons
import {RiRadioButtonLine} from 'react-icons/ri'

export const UserList = ({users}) => {
console.log(users)
    return (
        <Accordion className='mt-4'>
            <Card>
                <Card.Header bg='none'>
                    <Accordion.Toggle
                        as={Button}
                        variant='info'
                        eventKey='0'
                        style={{textDecoration: 'none'}}
                    >
                        Active users{' '}
                        <Badge variant='light' className='ml-1'>
                            {users}
                        </Badge>
                    </Accordion.Toggle>
                </Card.Header>
                {/*{users.map(([email]) => (
                    <Accordion.Collapse eventKey='0' key={email}>
                        <Card.Body>
                            <RiRadioButtonLine
                                className={`mb-1 ${
                                    'text-success'
                                }`}
                                size='0.8em'
                            />{' '}
                            {email}
                        </Card.Body>
                    </Accordion.Collapse>
                ))}*/}
            </Card>
        </Accordion>
    )
}