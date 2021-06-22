import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hooks'
import {useMessage} from "../hooks/message.hook";
import {useHistory} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext";
import dateFormat from 'dateformat'

export const Notes = ({notes}) => {

    const auth = useContext(AuthContext)
    const {loading, request, error, clearError} = useHttp()
    const message = useMessage()
    const history = useHistory();

    const deleteHandler = async event => {
        try {
            const data = await request(`/api/note/delete/${event.target.id}`, 'DELETE', null,
                {
                    Authorization: `Bearer ${auth.token}`
                })
            message(data.message)
            history.push('/')
        } catch (e) {
        }
    }

    const openDescriptionHandler = param => e => {
        history.push(`/create/${param}`)
    }

    return (
        <>
            {notes.map((note) => {
                let tempCap = note.caption
                if(note.caption.length>20)
                    tempCap = note.caption.substr(0,18) + "..."
                let tempDesc = note.description
                if(note.description.length>250)
                    tempDesc = note.description.substr(0,250) + " . . ."
                let id = note._id
                return (
                    <div className="col s3 note" style={{cursor:"pointer"}} id={id} onClick={openDescriptionHandler(note._id)}>
                        <p className="note-header">{tempCap} <span id={note._id} className="cross" onClick={deleteHandler}/></p>
                        <p className="note-footer #afb42b lime darken-2">
                            {tempDesc}
                            <p className="note-date">
                                {dateFormat(note.date,"dd.mm.yyyy HH:MM")}
                            </p>
                        </p>
                    </div>
                )
            })}
        </>

    )
}