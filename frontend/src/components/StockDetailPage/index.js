import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getLineDataByList } from '../../store/stockData'
import { getStockInfo } from '../../store/stockData'
import StockChart from '../Charts/StockChart'
import StockInfo from './StockInfo'
import './StockDetailPage.css'

export default function StockDetailPage() {
	const { symbol } = useParams()
	const { [symbol]: stockData } = useSelector(state => state.stockData.stocks)
	const dispatch = useDispatch()

	useEffect(async () => {
		await dispatch(getLineDataByList([symbol]))
		await dispatch(getStockInfo(symbol))
	}, [dispatch, symbol])

	return (
		<div className="page__detail">
			<div className="stock-detail__header">
				<h1>{stockData?.info?.name}</h1>
				<h2>${stockData?.lineData[0].Close}</h2>
			</div>

			<StockChart lineData={stockData?.lineData} />
			<StockInfo info={stockData?.info} />
		</div>
	)
}
