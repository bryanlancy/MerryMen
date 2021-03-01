const UPDATE_LIST = 'stock/UPDATE_LIST'
const GET_LINE_DATA = 'stock/GET_LINE_DATA'
const ADD_LINE_DATA = 'stock/ADD_LINE_DATA'

const ADD_INFO = 'stock/ADD_INFO'

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

const addInfo = (symbol, info) => ({
	type: ADD_INFO,
	symbol,
	info,
})

export const getLineDataByList = list => async (dispatch, getState) => {
	// const state = getState()
	const response = await fetch(`/api/charts/${list}`)
	if (response.ok) {
		const stocks = await response.json()

		const newList = stocks.map(stock => {
			const symbol = Object.keys(stock)[0]
			const { [symbol]: lineData } = stock
			dispatch(addLines(symbol, lineData))
			return { symbol, lineData }
		})
	}
}

export const getStockInfo = symbol => async (dispatch, getState) => {
	const state = getState()
	if (!state.stockData.stocks[symbol].hasOwnProperty('info')) {
		const response = await fetch(`/api/info/${symbol}`)
		if (response.ok) {
			const info = await response.json()
			dispatch(addInfo(symbol, info))
		}
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
						...state.stocks[action.symbol],
						lineData: action.lineData,
						time: Date.now(),
					},
				},
			}
		}
		case UPDATE_LIST: {
			return {
				...state,
				watchlist: {
					...state.watchlist,
					...action.list,
				},
			}
		}
		case ADD_INFO:
			return {
				...state,
				stocks: {
					...state.stocks,
					[action.symbol]: {
						...state.stocks[action.symbol],
						info: action.info,
					},
				},
			}
		default:
			return state
	}
}

export default stockReducer
