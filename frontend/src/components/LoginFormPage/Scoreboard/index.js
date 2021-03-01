import './Scoreboard.css'
export default function Scoreboard({ score }) {
	return (
		<div className="scoreboard-container">
			<h1>
				<u>Scoreboard</u>
			</h1>
			<h2>$ {score}</h2>
		</div>
	)
}
