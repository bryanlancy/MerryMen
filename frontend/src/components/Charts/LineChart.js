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

	const [state, setState] = useState({})
	const [lineColor, setLineColor] = useState('#fffc9a')
	const [pointColor, setPointColor] = useState('#c4d624')
	const [yLabelOn, setYLabelOn] = useState(true)
	const [yLabelColor, setYLabelColor] = useState('#fafafa')
	const [xLabelOn, setXLabelOn] = useState(false)
	const [xLabelColor, setXLabelColor] = useState('#fafafa')

	const dispatch = useDispatch()
	useEffect(async () => {
		await dispatch(getLineDataBySymbol(symbol))
	}, [dispatch, params])

	useEffect(() => {
		const lineData = stockData?.lineData
		console.log(lineData)
		if (lineData) {
			setState({
				labels: lineData.map(point => {
					const date = new Date(point.x)
					console.log(date.toLocaleString('default', { month: 'short' }))
					return `${date.getMonth() + 1}/${date.getDay()}`
				}),
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
	}, [stockData, params, lineColor, pointColor, yLabelColor])

	return (
		<div className="line-chart">
			<h2>{symbol}</h2>
			<Line
				data={state}
				options={{
					legend: {
						display: false,
					},
					scales: {
						yAxes: [
							{
								ticks: {
									display: yLabelOn,
									fontColor: yLabelColor,
									fontSize: 16,
								},
							},
						],
						xAxes: [
							{
								ticks: {
									display: xLabelOn,
									fontColor: xLabelColor,
									fontSize: 16,
								},
							},
						],
					},
				}}
			/>
			<div className="line-chart__controls">
				<div className="line-chart__controls--line">
					<label>Line Color</label>
					<input value={lineColor} onChange={e => setLineColor(e.target.value)} type="color" />
				</div>
				<div className="line-chart__controls--point">
					<label>Point Color</label>
					<input value={pointColor} onChange={e => setPointColor(e.target.value)} type="color" />
				</div>
				<div className="line-chart__controls--y-label">
					<input checked={yLabelOn} type="checkbox" onChange={() => setYLabelOn(!yLabelOn)} />
					<label>Y-Axis Label Color</label>
					<input value={yLabelColor} onChange={e => setYLabelColor(e.target.value)} type="color" />
				</div>
				<div className="line-chart__controls--x-label">
					<input checked={xLabelOn} type="checkbox" onChange={() => setXLabelOn(!xLabelOn)} />
					<label>X-Axis Label Color</label>
					<input value={xLabelColor} onChange={e => setXLabelColor(e.target.value)} type="color" />
				</div>
			</div>
		</div>
	)
}

export default LineChart

// const lineChart = new Chart((type: 'line'), (data: data))
