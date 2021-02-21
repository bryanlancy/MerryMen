const UPDATE_LIST = 'stock/UPDATE_LIST'
const GET_LINE_DATA = 'stock/GET_LINE_DATA'
const ADD_LINE_DATA = 'stock/ADD_LINE_DATA'
const addLines = (symbol, lineData) => ({
	type: ADD_LINE_DATA,
	symbol,
	lineData,
})

const updateList = list => ({
	type: UPDATE_LIST,
	list,
})

const loadLines = (symbol, lineData) => ({
	type: GET_LINE_DATA,
	symbol,
})
export const getLineDataByList = list => async dispatch => {
	const symbols = list.join(',')
	const response = await fetch(`/api/charts/list?symbols=${symbols}`)
	if (response.ok) {
		const stocks = await response.json()
		const newList = stocks.map(stock => {
			const symbol = Object.keys(stock)[0]
			const { [symbol]: lineData } = stock
			dispatch(addLines(symbol, lineData))
			return { symbol, lineData }
		})
		dispatch(updateList(newList))
	}
}
export const getLineDataBySymbol = symbol => async dispatch => {
	const response = await fetch(`/api/charts/${symbol}`)
	if (response.ok) {
		const data = await response.json()
		dispatch(addLines(symbol, data))
	}
}

const initialState = {
	stocks: {},
	watchlist: [],
}

const stockReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_LINE_DATA: {
			return {
				...state,
				stocks: {
					...state.stocks,
					[action.symbol]: {
						lineData: action.lineData,
						time: Date.now(),
					},
				},
			}
		}
		case UPDATE_LIST: {
			return {
				...state,
				watchlist: action.list,
			}
		}
		default:
			return state
	}
}

export default stockReducer
