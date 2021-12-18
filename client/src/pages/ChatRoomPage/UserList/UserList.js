// styles
import {Accordion, Card, useAccordionButton} from 'react-bootstrap'
// icons
import {useCallback, useContext} from "react";
import {AuthContext} from "../../../contexts/AuthContext";
import {useHttp} from "../../../hooks/http.hook";


export const UserList = ({users}) => {

    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()

    /*const usersArr = Object.entries(users)
    console.log(usersArr)*/

    const fetchUsername = useCallback(async (userId) => {
        try {
            return await request('/api/user/' + userId, 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
        } catch (e) {
        }
    }, [auth, request])

        return (
            <Accordion className='mt-4'>
                <Card>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>Hello! I'm the body</Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

            /*<Accordion className='mt-4'>
                <Card>
                    <Card.Header bg='none'>
                        <Accordion.Toggle
                            as={Button}
                            variant='info'
                            eventKey='0'
                            style={{ textDecoration: 'none' }}
                        >
                            Active users{' '}
                            <Badge variant='light' className='ml-1'>
                                4
                            </Badge>
                        </Accordion.Toggle>
                    </Card.Header>
                    {/!*{usersArr.map(([userId, obj]) => (
                        <Accordion.Collapse eventKey='0' key={userId}>
                            <Card.Body>
                                <RiRadioButtonLine
                                    className={`mb-1 ${
                                        obj.online ? 'text-success' : 'text-secondary'
                                    }`}
                                    size='0.8em'
                                />{' '}
                                {obj.username}
                            </Card.Body>
                        </Accordion.Collapse>
                    ))}*!/}
                </Card>
            </Accordion>*/
        )
    }