import React, { useState } from 'react'

import SignupForm from './SignupForm.js'
import LoginForm from './LoginForm.js'

import './LoginForm.css'

export default function LoginSignupForm({ score }) {
    const [formType, setFormType] = useState('login')

    let form
    switch (formType) {
        case 'login':
            form = <LoginForm score={score} setFormType={setFormType} />
            break;
        case 'signup':
            form = <SignupForm score={score} setFormType={setFormType} />
            break;
        default:
            form = <LoginForm score={score} setFormType={setFormType} />
            break;
    }

    return form

}
