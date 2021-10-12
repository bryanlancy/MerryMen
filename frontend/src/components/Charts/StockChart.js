import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import './StockChart.css'
// import { useState, useEffect } from 'react'

const StockChart = ({ lineData, height }) => {
	console.log(lineData)
	if (!lineData) return null
	return (
		<div className="line-chart">
			<ResponsiveContainer width="100%" height={height}>
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
		</div>
	)
}

export default StockChart
