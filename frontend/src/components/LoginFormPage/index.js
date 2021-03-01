import { useEffect, useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import RainDrop from '../RainDrop'
import Scoreboard from './Scoreboard'
import './LoginForm.css'

function LoginFormPage() {
	const dispatch = useDispatch()
	const sessionUser = useSelector(state => state.session.user)
	const [credential, setCredential] = useState('')
	const [password, setPassword] = useState('')
	const [errors, setErrors] = useState([])
	const [rain, setRain] = useState([])
	const [score, setScore] = useState(0)

	const handleSubmit = e => {
		e.preventDefault()
		setErrors([])
		return dispatch(sessionActions.login({ credential, password, score })).catch(async res => {
			const data = await res.json()
			if (data && data.errors) setErrors(data.errors)
		})
	}

	//Let it snow!
	function addRain() {
		return (Math.random() * Date.now()).toFixed(5)
	}

	useEffect(() => {
		setTimeout(() => {
			if (rain.length < 20) {
				setRain([...rain, addRain()])
			} else {
				setRain([...rain.slice(1), addRain()])
			}
		}, 750)
	}, [rain])

	if (sessionUser) return <Redirect to="/" />
	let scoreboard
	if (score > 0) {
		scoreboard = <Scoreboard score={score} />
	} else scoreboard = <>/</>
	return (
		<div className="page__login">
			<div className="login-form__picture">
				{scoreboard}
				{rain.map(key => (
					<RainDrop key={key} score={score} setScore={setScore} />
				))}
			</div>
			<div className="login-form__container">
				<form onSubmit={handleSubmit}>
					<ul>
						{errors.map((error, idx) => (
							<li key={idx}>{error}</li>
						))}
					</ul>
					<label>
						Username or Email
						<input type="text" value={credential} onChange={e => setCredential(e.target.value)} required />
					</label>
					<label>
						Password
						<input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
					</label>
					<button type="submit">Log In</button>
				</form>
			</div>
		</div>
	)
}

export default LoginFormPage
