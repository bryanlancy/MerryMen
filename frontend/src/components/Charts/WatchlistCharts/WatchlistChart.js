import { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getLineDataByList } from '../../../store/stockData'
import StockChart from '../StockChart'

import './WatchlistChart.css'

const WatchlistChart = ({ watchlists }) => {

	const history = useHistory()
	const dispatch = useDispatch()
	const { watchlist, stocks } = useSelector(state => state.stockData)
	const [hidden, setHidden] = useState(true)
	const [listState, setListState] = useState(0)

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
					{watchlists[listState].stocks.map(symbol => {
						const { [symbol]: stock } = stocks;
						if (stock) {
							const { lineData: data } = stock
							const upSinceLast = data[data.length - 1].Close - data[data.length - 2].Close > 0
							const upCurrent = data[data.length - 1].Close - data[data.length - 1].Open > 0
							const diffCurrent = data[data.length - 1].Close - data[data.length - 1].Open

							return (
								<div key={`watchlist-${symbol}`} className="watchlist__chart" onClick={() => clickOnChart(symbol)}>
									<div className="watchlist__header">
										<div className="watchlist__price">
											<h3 className={`watchlist__price--current ${upSinceLast ? 'green' : 'red'}`}>
												${data[data.length - 1].Close}
											</h3>
											<div className="watchlist__change">
												<p className={`watchlist__change--dollar ${upCurrent ? 'green' : 'red'}`}>
													{upCurrent ? '' : '-'}
													${Math.abs(Math.round((diffCurrent) * 100) / 100)}
												</p>
												<p className={`watchlist__change--percents ${upCurrent ? 'green' : 'red'}`}>
													{Math.round(((diffCurrent) / data[data.length - 1].Open) * 10000) / 10000}%
												</p>
											</div>
										</div>
										<h3 className="watchlist__symbol">{symbol}</h3>
										<div className="watchlist__buttons">
											<button className="watchlist__buttons--buy">Buy</button>
											<button className="watchlist__buttons--sell">Sell</button>
										</div>
									</div>
									<div className="chart">
										<StockChart lineData={data} height={100} />
									</div>
								</div>
							)
						}
					})}
				</div>
			</div>
		)
}

export default WatchlistChart
