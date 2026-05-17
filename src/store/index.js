import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux"
import { thunk } from "redux-thunk"
import { createLogger } from "redux-logger"
import clientReducer from "./reducers/clientReducer"
import productReducer from "./reducers/productReducer"
import shoppingCartReducer from "./reducers/shoppingCartReducer"
const logger = createLogger()

const rootReducer = combineReducers({
  client: clientReducer,
  product: productReducer,
  shoppingCart: shoppingCartReducer,
})

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("cartState")
    if (!serializedState) return undefined
    return { shoppingCart: JSON.parse(serializedState) }
  } catch {
    return undefined
  }
}

// localStorage'a state kaydet
const saveState = (state) => {
  try {
    localStorage.setItem("cartState", JSON.stringify(state.shoppingCart))
  } catch {
    console.error("Could not save state")
  }
}

const preloadedState = loadState()

const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger))

// Her state değişiminde localStorage'a kaydet
store.subscribe(() => {
  saveState(store.getState())
})

export default store