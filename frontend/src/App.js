import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import * as sessionActions from './store/session'

import Navigation from './components/Navigation'
import LoginFormPage from './components/LoginFormPage'
import WatchlistChart from './components/Charts/WatchlistCharts/WatchlistChart'
import StockDetailPage from './components/StockDetailPage'

function App() {
	const dispatch = useDispatch()
	const [isLoaded, setIsLoaded] = useState(false)
	const sessionUser = useSelector(state => state.session.user)

	//move to redux
	const watchlists = [
		{
			name: "Watchlist 1",
			stocks: ['GME', 'AAPL', 'EGAN', 'EEX', 'DIET'],
		},
		{
			name: "Watchlist 2",
			stocks: ['SONM', 'FAUS', 'RUN', 'PSMG', 'RILY'],
		},
		{
			name: "Watchlist 3",
			stocks: ['SSPK', 'AER', 'CORR', 'NWGI', 'CHT'],
		},
		{
			name: "Watchlist 4",
			stocks: ['SQM', 'XHS', 'TALO', 'PLL', 'SYLD']
		}
	]
	//move to redux
	const [watchlist, setWatchlist] = useState(watchlists)

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
					<WatchlistChart watchlists={watchlists} />

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
