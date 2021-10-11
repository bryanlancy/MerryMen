import React, { useEffect, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ProfileButton from './ProfileButton'

import './Navigation.css'

function Navigation({ isLoaded }) {
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user)
	const [search, setSearch] = useState('')

	useEffect(() => { }, [search])

	function updateSearch(e) {
		setSearch(e.target.value.toUpperCase())
	}
	function handleKey(e) {
		if (e.code === 'Enter' || e.code === 'NumpadEnter') {
			history.push(`/stocks/${search}`)
			setSearch('')
		}
	}

	return (
		<div className="navbar">
			<NavLink className="navbar__link--home" exact to="/">
				<i className="fad fa-bullseye-arrow navbar__icon--main"></i>
				MerryMen
			</NavLink>

			<div className="navbar__search">
				<input type="text" placeholder="Stock Search" value={search} onChange={updateSearch} onKeyPress={handleKey} />
				<i className="far fa-search-dollar"></i>
			</div>

			<div className="navbar__session">{isLoaded && <ProfileButton user={sessionUser} />}</div>
		</div>
	)
}
export default Navigation
