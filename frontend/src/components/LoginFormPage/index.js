import { useEffect, useState } from 'react'

import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import RainDrop from '../RainDrop'
import Scoreboard from './Scoreboard'
import LoginSignupForm from '../LoginSignupForm'



function LoginFormPage() {

	const sessionUser = useSelector(state => state.session.user)

	const [rain, setRain] = useState([])
	const [score, setScore] = useState(0)

	//Let it snow!
	function addRain() {
		return (Math.random() * Date.now()).toFixed(5)
	}

	useEffect(() => {
		setTimeout(() => {
			if (rain.length < 5) {
				setRain([...rain, addRain()])
			} else {
				setRain([...rain.slice(1), addRain()])
			}
		}, 3000)
	}, [rain])

	if (sessionUser) return <Redirect to="/" />
	let scoreboard
	if (score > 0) {
		scoreboard = <Scoreboard score={score} />
	} else scoreboard = <>/</>
	return (
		<div className="page__login">
			<div className="form__picture">
				{scoreboard}
				{rain.map(key => (
					<RainDrop key={key} score={score} setScore={setScore} />
				))}
			</div>
			<div className="form__container">
				<LoginSignupForm score={score} />
			</div>
		</div>
	)
}

export default LoginFormPage
