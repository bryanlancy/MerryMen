import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import SignupFormPage from './components/SignupFormPage'
import * as sessionActions from './store/session'
import Navigation from './components/Navigation'
import LineChart from './components/Charts/LineChart'
import WatchlistChart from './components/Charts/WatchlistCharts/WatchlistChart'

function App() {
	const dispatch = useDispatch()
	const [isLoaded, setIsLoaded] = useState(false)
	const sessionUser = useSelector(state => state.session.user)

	//!REPLACE WITH DB WATCHLIST, FIRST IN LIST
	const [watchlist, setWatchlist] = useState(['GME', 'AAPL', 'SPY'])

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
	}, [dispatch])
	if (!sessionUser) {
		return (
			<>
				<Navigation isLoaded={isLoaded} />
				{isLoaded && (
					<Switch>
						<Route path="/signup">
							<SignupFormPage />
						</Route>
						<Redirect to="/" />
					</Switch>
				)}
			</>
		)
	} else {
		return (
			<>
				<Navigation isLoaded={isLoaded} />
				<Switch>
					<Route exact path="/">
						{/* <LineChart symbol="GME" />
						<LineChart symbol="AAPL" /> */}
						<WatchlistChart list={watchlist} />
					</Route>
					<Route path="/stocks/:symbol">
						<LineChart />
					</Route>
				</Switch>
			</>
		)
	}
}

export default App
