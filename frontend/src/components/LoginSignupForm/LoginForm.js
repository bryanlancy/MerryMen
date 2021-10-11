import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import * as sessionActions from '../../store/session'

export default function LoginForm({ score, setFormType }) {
    const dispatch = useDispatch()
    const [credential, setCredential] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState([])

    const handleSubmit = e => {
        e.preventDefault()
        setErrors([])
        return dispatch(sessionActions.login({ credential, password, score })).catch(async res => {
            const data = await res.json()
            if (data && data.errors) setErrors(data.errors)
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <ul>
                    {errors.map((error, idx) => (
                        <li key={idx}>{error}</li>
                    ))}
                </ul>
                <div>
                    <label>
                        Username or Email
                    </label>
                    <input type="text" value={credential} onChange={e => setCredential(e.target.value)} required />
                </div>
                <div>
                    <label>
                        Password
                    </label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Log In</button>
            </form>
            <div>Don't have an account? <button onClick={() => setFormType('signup')} >Sign Up</button></div>
        </>
    )
}
