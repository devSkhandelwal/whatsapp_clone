import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import {auth, provider} from "../firebase"
import { useStaeValue } from '../StateProvider'
import { actionTypes } from '../Reducer'

const Login = () => {

    const [state,dispatch] = useStaeValue()

    const signIn = () => {
        auth.signInWithPopup(provider).then(res =>{
            dispatch({
                type: actionTypes.SET_USER,
                user: res.user
            })
        }).catch((err)=>alert(err.message))
    }

    return (
        <div className="login">
            <div className="login__container">
                <div className="login__text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
