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
	const [listState, setListState] = useState(['GME', 'AAPL', 'EGAN', 'EEX', 'DIET'])
	const [hidden, setHidden] = useState(true)
	const [colors, setColors] = useState({
		pointColor: '#a0a000',
		lineColor: '#fffc9a99',
		labelColor: '#fffc9a',
		hoverBorderColor: '#f9f7c8',
	})

	useEffect(() => {
		dispatch(getLineDataByList(listState))
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
						<option value={['GME', 'AAPL', 'EGAN', 'EEX', 'DIET']}>Watchlist 1 </option>
						<option value={['SONM', 'FAUS', 'RUN', 'PSMG', 'RILY']}>Watchlist 2</option>
						<option value={['SSPK', 'AER', 'CORR', 'NWGI', 'CHT']}>Watchlist 3</option>
						<option value={['SQM', 'XHS', 'TALO', 'PLL', 'SYLD']}>Watchlist 4</option>
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
					{/* {watchlist.map(stock => (
						<div key={`watchlist-${stock.symbol}`} className="watchlist__chart" onClick={() => clickOnChart(stock.symbol)}>
							<div className="watchlist__header">
								<div className="watchlist__price">
									<h3
										className={`watchlist__price--current ${
											stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].y - stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 2].y > 0 ? 'green' : 'red'
										}`}
									>
										${stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].y}
									</h3>
									<div className="watchlist__change">
										<p
											className={`watchlist__change--dollar ${
												stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].y - stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].o > 0 ? 'green' : 'red'
											}`}
										>
											{stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].y - stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].o < 0 ? '-' : ''}$
											{Math.abs(Math.round((stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].y - stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].o) * 100) / 100)}
										</p>
										<p
											className={`watchlist__change--percents ${
												stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].y - stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].o > 0 ? 'green' : 'red'
											}`}
										>
											{Math.round(
												((stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].y - stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].o) /
													stocks[stock.symbol].lineData[stocks[stock.symbol].lineData.length - 1].o) *
													10000
											) / 10000}
											%
										</p>
									</div>
								</div>
								<h3 className="watchlist__symbol">{stock.symbol}</h3>
								<div className="watchlist__buttons">
									<button className="watchlist__buttons--buy">Buy</button>
									<button className="watchlist__buttons--sell">Sell</button>
								</div>
							</div>
							<ResponsiveContainer width="100%">
								<LineChart data={stocks[stock.symbol].lineData}>
									<Line type="linear" stroke={'green'} dataKey="High" dot={false} isAnimationActive={false} />
									<Line type="linear" stroke={'red'} dataKey="Low" dot={false} isAnimationActive={false} />
									<Line type="linear" dataKey="Open" dot={false} isAnimationActive={false} />
									<Line type="linear" dataKey="Close" dot={false} isAnimationActive={false} />
									<YAxis />
									<XAxis dataKey="Time" />
									<Tooltip />
								</LineChart>
							</ResponsiveContainer>
						</div>
					))} */}
				</div>
			</div>
		)
}

export default WatchlistChart
