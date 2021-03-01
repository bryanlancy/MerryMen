import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import SignupFormPage from './components/SignupFormPage'
import * as sessionActions from './store/session'
import Navigation from './components/Navigation'
import StockChart from './components/Charts/StockChart'
import LoginFormPage from './components/LoginFormPage'
import WatchlistChart from './components/Charts/WatchlistCharts/WatchlistChart'
import StockDetailPage from './components/StockDetailPage'

function App() {
	const dispatch = useDispatch()
	const [isLoaded, setIsLoaded] = useState(false)
	const sessionUser = useSelector(state => state.session.user)

	//!REPLACE WITH DB WATCHLIST, FIRST IN LIST
	const [watchlist, setWatchlist] = useState(['GME', 'AAPL', 'EGAN', 'EEX', 'DIET'])

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true))
	}, [dispatch])
	if (!sessionUser) {
		// Not signed in
		return (
			<>
				{isLoaded && (
					<Switch>
						<Route exact path="/">
							<LoginFormPage />
						</Route>
						<Route path="/signup">
							<SignupFormPage />
						</Route>
						<Redirect to="/" />
					</Switch>
				)}
			</>
		)
	} else {
		//Signed In
		return (
			<>
				<Navigation isLoaded={isLoaded} />
				<div className="page__layout">
					<WatchlistChart list={watchlist} />

					<div className="page__content">
						<Switch>
							<Route exact path="/"></Route>
							<Route path="/stocks/:symbol">
								<StockDetailPage />
							</Route>
						</Switch>
					</div>
				</div>
			</>
		)
	}
}

export default App
