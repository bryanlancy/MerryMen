import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import './StockChart.css'
// import { useState, useEffect } from 'react'

const StockChart = ({ lineData }) => {
	// const [lineData, setLineData] = useState([])

	// useEffect(() => {
	// 	const delay = 500
	// 	stockData?.lineData.forEach((point, i) => {
	// 		setLineData([...lineData, point])
	// 		// setTimeout(() => {
	// 		// }, delay * i)
	// 	})

	// 	console.log('LINE DATA', lineData)
	// }, [stockData])

	return (
		<div className="line-chart">
			<ResponsiveContainer width="100%">
				<LineChart data={lineData}>
					<Line type="linear" stroke={'green'} dataKey="High" dot={false} isAnimationActive={false} />
					<Line type="linear" stroke={'red'} dataKey="Low" dot={false} isAnimationActive={false} />
					<Line type="linear" dataKey="Open" dot={false} isAnimationActive={false} />
					<Line type="linear" dataKey="Close" dot={false} isAnimationActive={false} />
					<YAxis />
					<XAxis dataKey="Time" />
					<Tooltip />
				</LineChart>
			</ResponsiveContainer>
			{/* <div className="line-chart__controls">
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
			</div> */}
		</div>
	)
}

export default StockChart
