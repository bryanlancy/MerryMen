import { useState } from 'react'
import './RainDrop.css'

function makeSnow() {
	const options = {}
	const rarity = (function () {
		const chance = Math.random() * 100
		if (chance > 95) {
			return 'Rare'
		} else if (chance > 75) {
			return 'Uncommon'
		} else return 'Common'
	})()
	const perspective = (function () {
		const chance = Math.random() * 100
		if (chance > 66) {
			return 'Far'
		} else if (chance > 33) {
			return 'Middle'
		} else return 'Close'
	})()

	function getPos() {
		return (Math.random() * (98 - 2) + 2).toFixed(1)
	}

	function getColor() {
		switch (rarity) {
			case 'Rare':
				return 'blue'
			case 'Uncommon':
				return 'red'
			default:
				return '#c4d624'
		}
	}
	function getScore() {
		switch (rarity) {
			case 'Rare':
				return 25
			case 'Uncommon':
				return 5
			default:
				return 1
		}
	}
	function getIcon() {
		const icons = [
			'fa-euro-sign',
			'fa-coin',
			'fa-dollar-sign',
			'fa-hryvnia',
			'fa-lira-sign',
			'fa-money-bill',
			'fa-money-bill-wave',
			'fa-pound-sign',
			'fa-ruble-sign',
			'fa-rupee-sign',
			'fa-sack-dollar',
			'fa-shekel-sign',
			'fa-tenge',
			'fa-usd-circle',
			'fa-usd-square',
			'fa-won-sign',
			'fa-yen-sign',
			'fa-badge-dollar',
			'fa-lightbulb-dollar',
			'fa-cat-space',
			'fa-alicorn',
		]
		const rand = Math.floor(Math.random() * icons.length)
		return icons[rand]
	}

	function getZ() {
		switch (perspective) {
			case 'Far':
				return 0
			case 'Middle':
				return 2
			default:
				return 4
		}
	}
	function getSize() {
		switch (rarity) {
			case 'Rare':
				break
			case 'Uncommon':
				break
			default:
				break
		}
		if (Math.random() * 10 > 9) return (Math.random() * (48 - 32) + 32).toFixed(1)
		return (Math.random() * (32 - 16) + 16).toFixed(1)
	}
	function getBlur() {
		let min, max
		switch (perspective) {
			case 'Far':
				min = 4
				max = 6
				break
			case 'Middle':
				min = 2
				max = 4
				break
			default:
				min = 0
				max = 2
				break
		}
		return (Math.random() * (max - min) + min).toFixed(1)
	}
	function getSpeed() {
		let min, max
		switch (perspective) {
			case 'Far':
				min = 12
				max = 14
				break
			case 'Middle':
				min = 10
				max = 12
				break
			default:
				min = 8
				max = 10
				break
		}
		return (Math.random() * (max - min) + min).toFixed(1)
	}

	options.icon = getIcon()
	options.score = getScore()
	options.pos = getPos()
	options.color = getColor()
	options.blur = getBlur()
	options.size = getSize()
	options.speed = getSpeed()
	options.z = getZ()

	return options
}

export default function RainDrop({ score, setScore }) {
	const [options, setOptions] = useState(makeSnow())
	const [caught, setCaught] = useState(false)

	function catchSnow() {
		if (!caught) {
			console.log('You caught me!')
			setCaught(!caught)
			setScore(score + options.score)
		}
	}

	return (
		<i
			className={`rain fa ${options.icon}`}
			onClick={catchSnow}
			style={{
				left: `${options.pos}%`,
				filter: `blur(${options.blur}px)`,
				fontSize: `${options.size}px`,
				color: `${options.color}`,
				zIndex: options.z,
				animation: !caught
					? `raindrop ${options.speed}s linear 0s forwards, glow 1.5s ease-in-out 0s infinite, spin 3s linear 0s infinite`
					: `raindrop ${options.speed}s linear 0s forwards, glow 1.5s ease-in-out 0s infinite, spin 3s linear 0s infinite, melt .5s linear 0s forwards`,
			}}
		></i>
	)
}
