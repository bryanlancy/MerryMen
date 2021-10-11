import { useState, useEffect, createRef } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getLineDataByList } from '../../../store/stockData'
import StockChart from '../StockChart'

import './WatchlistChart.css'

const WatchlistChart = ({ list } = '') => {
	const history = useHistory()
	const { watchlist, stocks } = useSelector(state => state.stockData)

	const dispatch = useDispatch()

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

	const [listState, setListState] = useState(0)

	const [hidden, setHidden] = useState(true)
	const [colors, setColors] = useState({
		pointColor: '#a0a000',
		lineColor: '#fffc9a99',
		labelColor: '#fffc9a',
		hoverBorderColor: '#f9f7c8',
	})

	useEffect(() => {
		dispatch(getLineDataByList(watchlists[listState].stocks))
	}, [dispatch, listState])

	function toggleHideWatchList() {
		setHidden(!hidden)
	}

	function changeWatchlist(list) {
		setListState(list)
	}
	function clickOnChart(symbol) {
		history.push(`/stocks/${symbol}`)
	}

	if (hidden) {
		return (
			<div className={`watchlist-mini ${!hidden ? 'hidden' : ''}`}>
				<div className="watchlist__unhide" onClick={toggleHideWatchList}>
					<button className="watchlist__hide">
						<i className="fas fa-chevron-double-right"></i>
					</button>
					<h2>Watchlists</h2>
				</div>
			</div>
		)
	} else
		return (
			<div className={`watchlist ${hidden ? 'hidden' : ''}`}>
				<div className="watchlist__select">
					<select className="watchlist__select--title" value={listState} onChange={e => changeWatchlist(e.target.value)}>
						{watchlists.map((watchlist, i) => (
							<option key={watchlist.name} value={i}>{watchlist.name}</option>
						))}
					</select>
					<div className="watchlist__select--buttons">
						<button className="watchlist__edit">
							<i className="fal fa-money-check-edit"></i>
						</button>
						<button className="watchlist__hide" onClick={toggleHideWatchList}>
							<i className="fas fa-chevron-double-left"></i>
						</button>
					</div>
				</div>
				<div className="watchlist__chart-container">
					{watchlists[listState].stocks.map(stock => {
						if (stocks[stock]) return <StockChart key={`watchlist-chart-${stock}`} lineData={stocks[stock].lineData} />
					})}
				</div>
			</div>
		)
}

export default WatchlistChart
