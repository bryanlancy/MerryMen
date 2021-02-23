import { useState, useEffect, createRef } from 'react'
import { Line } from 'react-chartjs-2'

import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { getLineDataByList } from '../../../store/stockData'

import './WatchlistChart.css'

const WatchlistChart = ({ list } = []) => {
	const history = useHistory()
	const { watchlist } = useSelector(state => state.stockData)
	const dispatch = useDispatch()
	const [listState, setListState] = useState(list)
	const [hidden, setHidden] = useState(false)
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
						<i class="fas fa-chevron-double-right"></i>
					</button>
					<h2>Watchlists</h2>
				</div>
			</div>
		)
	} else
		return (
			<div className={`watchlist ${hidden ? 'hidden' : ''}`}>
				<div className="watchlist__select">
					<select className="watchlist__select--title" value={listState} onChange={e => changeWatchlist(e.target.value.split(','))}>
						<option value={['GME', 'AAPL', 'EGAN', 'EEX', 'DIET']}>Watchlist 1 </option>
						<option value={['SONM', 'FAUS', 'RUN', 'PSMG', 'RILY']}>Watchlist 2</option>
						<option value={['SSPK', 'AER', 'CORR', 'NWGI', 'CHT']}>Watchlist 3</option>
						<option value={['SQM', 'XHS', 'TALO', 'PLL', 'SYLD']}>Watchlist 4</option>
					</select>
					<div className="watchlist__select--buttons">
						<button className="watchlist__edit">
							<i class="fal fa-money-check-edit"></i>
						</button>
						<button className="watchlist__hide" onClick={toggleHideWatchList}>
							<i class="fas fa-chevron-double-left"></i>
						</button>
					</div>
				</div>
				<div className="watchlist__chart-container">
					{watchlist.map(stock => (
						<div key={`watchlist-${stock.symbol}`} className="watchlist__chart" onClick={() => clickOnChart(stock.symbol)}>
							<div className="watchlist__header">
								<div className="watchlist__price">
									<h3 className={`watchlist__price--current ${stock.lineData[stock.lineData.length - 1].y - stock.lineData[stock.lineData.length - 2].y > 0 ? 'green' : 'red'}`}>${stock.lineData[stock.lineData.length - 1].y}</h3>
									<div className="watchlist__change">
										<p className={`watchlist__change--dollar ${stock.lineData[stock.lineData.length - 1].y - stock.lineData[stock.lineData.length - 1].o > 0 ? 'green' : 'red'}`}>
											{stock.lineData[stock.lineData.length - 1].y - stock.lineData[stock.lineData.length - 1].o < 0 ? '-' : ''}$
											{Math.abs(Math.round((stock.lineData[stock.lineData.length - 1].y - stock.lineData[stock.lineData.length - 1].o) * 100) / 100)}
										</p>
										<p className={`watchlist__change--percents ${stock.lineData[stock.lineData.length - 1].y - stock.lineData[stock.lineData.length - 1].o > 0 ? 'green' : 'red'}`}>
											{Math.round(((stock.lineData[stock.lineData.length - 1].y - stock.lineData[stock.lineData.length - 1].o) / stock.lineData[stock.lineData.length - 1].o) * 10000) / 10000}%
										</p>
									</div>
								</div>
								<h3 className="watchlist__symbol">{stock.symbol}</h3>
								<div className="watchlist__buttons">
									<button className="watchlist__buttons--buy">Buy</button>
									<button className="watchlist__buttons--sell">Sell</button>
								</div>
							</div>
							<Line
								data={{
									labels: new Array(stock.lineData.length).fill(''),
									datasets: [
										{
											label: '$',
											fill: false,
											lineTension: 0.5,
											backgroundColor: colors.pointColor,
											borderColor: colors.lineColor,
											borderWidth: 2,
											labelColor: 'white',
											hoverBorderColor: colors.hoverBorderColor,
											hoverBackgroundColor: colors.hoverBorderColor,
											data: stock.lineData.map(point => point.y),
										},
									],
								}}
								options={{
									legend: {
										display: false,
									},
									scales: {
										yAxes: [
											{
												ticks: {
													fontColor: colors.labelColor,
													fontSize: 16,
												},
											},
										],
									},
								}}
							/>
						</div>
					))}
				</div>
			</div>
		)
}

export default WatchlistChart
