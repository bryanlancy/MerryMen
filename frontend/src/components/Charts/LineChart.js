import { useState, useEffect, createRef } from 'react'
import { Line } from 'react-chartjs-2'

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getLineDataBySymbol } from '../../store/stockData'
import './LineChart.css'

const LineChart = ({ symbol }) => {
	const params = useParams()
	symbol = symbol ? symbol : params.symbol
	const { [symbol]: stockData } = useSelector(state => state.stockData.stocks)
	const dispatch = useDispatch()
	const [state, setState] = useState({})
	console.log(params)
	useEffect(() => {
		dispatch(getLineDataBySymbol(symbol))
	}, [dispatch])

	useEffect(() => {
		const lineData = stockData?.lineData
		const lineColor = '#0ff0ff99'
		const pointColor = lineColor
		if (lineData) {
			setState({
				labels: new Array(lineData.length).fill(''),
				datasets: [
					{
						label: 'Price  ( $ )',
						fill: false,
						lineTension: 0.5,
						backgroundColor: pointColor,
						borderColor: lineColor,
						borderWidth: 2,
						data: lineData.map(point => point.y),
					},
				],
			})
		}
	}, [stockData])

	return (
		<div className="line-chart">
			<h2>{symbol}</h2>
			<Line data={state} />
		</div>
	)
}

export default LineChart

// const lineChart = new Chart((type: 'line'), (data: data))
