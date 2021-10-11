import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as sessionActions from '../../store/session'

function SignupFormPage({ setFormType }) {
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [errors, setErrors] = useState([])

	if (sessionUser) return <Redirect to="/" />

	const handleSubmit = e => {
		e.preventDefault()
		if (password === confirmPassword) {
			setErrors([])
			return dispatch(sessionActions.signup({ firstName, lastName, email, username, password })).catch(async res => {
				const data = await res.json()
				if (data && data.errors) setErrors(data.errors)
			})
		}
		return setErrors(['Confirm Password field must be the same as the Password field'])
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
						First Name
					</label>
					<input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
				</div>
				<div>
					<label>
						Last Name
					</label>
					<input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
				</div>
				<div>
					<label>
						Email
					</label>
					<input type="text" value={email} onChange={e => setEmail(e.target.value)} required />
				</div>
				<div>
					<label>
						Username
					</label>
					<input type="text" value={username} onChange={e => setUsername(e.target.value)} required />
				</div>
				<div>
					<label>
						Password
					</label>
					<input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
				</div>
				<div>
					<label>
						Confirm Password
					</label>
					<input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
				</div>
				<button type="submit">Sign Up</button>
			</form>
			<div>Already have an account? <button onClick={() => setFormType('login')} >Log In</button></div>
		</>
	)
}

export default SignupFormPage
