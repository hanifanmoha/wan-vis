import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

import PriceStore from './PriceStore'

const Store = createStore(
  combineReducers({
    priceStore : PriceStore
  }),
  applyMiddleware(promise, logger)
);

export default Store