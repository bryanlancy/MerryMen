export default function StockInfo({ info }) {
	const notFound = <i className="fas fa-minus"></i>
	if (!info) {
		return (
			<div>
				<h1>No info</h1>
			</div>
		)
	}
	const date = new Date(info?.listdate)
	const formattedDate = <>{`${date.getMonth() + 1}/${date.getDate() + 1}/${date.getFullYear()}`}</>

	return (
		<div className="stock-detail-info__container">
			<h1>About</h1>
			<hr />

			<div className="stock-detail-info__description">
				<p>{info?.description}</p>
			</div>
			<div className="stock-detail-info__details">
				<div className="item1">
					<b>CEO</b>
					<p>{info?.ceo ? info.ceo : notFound}</p>
				</div>
				<div className="item2">
					<b>Employees</b>
					<p>{info?.employees ? info.employees : notFound}</p>
				</div>
				<div className="item3">
					<b>Headquarters</b>
					<p>{info?.hq_address ? info.hq_address : notFound}</p>
				</div>
				<div className="item4">
					<b>List Date</b>
					<p>{info?.listdate ? formattedDate : notFound}</p>
				</div>

				<div className="item5">
					<b>Market Cap</b>
					<p>{info?.marketcap ? info.marketcap : notFound}</p>
				</div>
				<div className="item6">
					<b>PE Ratio</b>
					<p>{info?.priceToEarningsRatio ? info.priceToEarningsRatio : notFound}</p>
				</div>
				<div className="item7">
					<b>Dividend Yield</b>
					<p>{info?.dividendYield ? info.dividendYield : notFound}</p>
				</div>
				<div className="item8">
					<b>Sales Per Share</b>
					<p>{info?.salesPerShare ? info.salesPerShare : notFound}</p>
				</div>
			</div>
		</div>
	)
}
