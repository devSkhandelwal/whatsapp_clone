import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import db from '../firebase'
import './Chat.css'
import {useStaeValue} from '../StateProvider';
import firebase from 'firebase'


export const Chat = () => {

    const [input,setInput] = useState('')
    const {roomId} = useParams()
    const [roomName,setRoomName] = useState();
    const [messages,setMessages] = useState([])

   

    const [{user},dispatch] = useStaeValue()

    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message:input,
            name: user.displayName,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('')
    }

    useEffect(()=>{
        if(roomId){
            db.collection('rooms').doc(roomId).onSnapshot(snapshot=>(
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId)
                        .collection('messages')
                        .orderBy('timestamp','asc')
                        .onSnapshot((snapshot)=>(
                            setMessages(snapshot.docs.map((doc)=>(
                                doc.data()
                            )))
                        ))
            
        }
    },[roomId])

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p> </p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>

            </div>
            <div className="chat__body">
                {
                    messages.map(message => (
                        <p key={Math.random()} className={`chat__message ${message.name === user.displayName && "chat__reciever" }`}>
                    
                            <span className="chat__name">{message.name}</span>
                            {message.message}

                            <span className="chat__timestamp">
                               {
                                   new Date(message.timestamp).toUTCString().toString()
                               }
                            </span>
                        </p>
                    ))
                }
                
            </div>
            <div className="chat__footer">
                <InsertEmoticon/>
                <form onSubmit={sendMessage}>
                    <input
                        placeholder="type message"
                        type="text"
                        value={input}
                        onChange = {(e) => setInput(e.target.value)}
                    />
                    <button type="submit"></button>
                </form>
                <Mic/>
            </div>
        </div>
    )
}
