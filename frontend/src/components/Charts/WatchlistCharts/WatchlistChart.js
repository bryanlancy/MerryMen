import { useState, useEffect, createRef } from 'react'
import { Line } from 'react-chartjs-2'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getLineDataByList } from '../../../store/stockData'

import './WatchlistChart.css'

const WatchlistChart = ({ list } = []) => {
	const { watchlist } = useSelector(state => state.stockData)
	const dispatch = useDispatch()
	const [listState, setListState] = useState(list)
	const [colors, setColors] = useState({
		pointColor: '#a0a000',
		lineColor: '#a0a000',
		labelColor: '#fffc9a',
		hoverBorderColor: '#f9f7c8',
	})

	useEffect(() => {
		dispatch(getLineDataByList(listState))
	}, [dispatch, listState])

	function changeWatchlist(list) {
		setListState(list)
	}

	return (
		<div className="watchlist">
			<div className="watchlist__select">
				<h2 className="watchlist__select--title">Watchlist</h2>
				<div className="watchlist__select--buttons">
					<select value={listState} onChange={e => changeWatchlist(e.target.value.split(','))}>
						<option value={['GME', 'AAPL', 'EGAN', 'EEX', 'DIET']}>Watchlist 1</option>
						<option value={['SONM', 'FAUS', 'RUN', 'PSMG', 'RILY']}>Watchlist 2</option>
						<option value={['SSPK', 'AER', 'CORR', 'NWGI', 'CHT']}>Watchlist 3</option>
						<option value={['SQM', 'XHS', 'TALO', 'PLL', 'SYLD']}>Watchlist 4</option>
					</select>
					<button>Hide</button>
				</div>
			</div>
			{watchlist.map(stock => (
				<div key={`watchlist-${stock.symbol}`} className="watchlist__chart">
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
	)
	// <Line
	// 	data={{
	// 		labels: new Array(lineData.length).fill(''),
	// 		datasets: [
	// 			{
	// 				label: 'Price  ( $ )',
	// 				fill: false,
	// 				lineTension: 0.5,
	// 				backgroundColor: pointColor,
	// 				borderColor: lineColor,
	// 				borderWidth: 2,
	// 				data: lineData.map(point => point.y),
	// 			},
	// 		],
	// 	}}
	// />
}

export default WatchlistChart
