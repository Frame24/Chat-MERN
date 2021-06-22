import React, {useCallback, useContext, useEffect, useState} from 'react'
import {AuthContext} from "../contexts/AuthContext";
import {useHttp} from "../hooks/http.hooks";
import {useMessage} from "../hooks/message.hook";
import {useHistory} from "react-router-dom";
import {Loader} from "../components/Loader";
import {Notes} from "../components/Notes";


export const NotePage = () => {

    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const [notes, setNotes] = useState([])
    const message = useMessage()
    const history = useHistory();

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const fetchNotes = useCallback(async () => {
        try {
            const data = await request('/api/note/', 'GET', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
            setNotes(data)
        } catch (e) {
        }
    }, [auth, request])

    useEffect(()=>{
        fetchNotes()
    },[fetchNotes])

    if(loading){
        return <Loader/>
    }

    return (
        <div className="row">
            {!loading && <Notes notes={notes}/>}
        </div>
    )
}
