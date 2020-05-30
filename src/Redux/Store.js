import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

import PriceStore from './PriceStore'
import AreaStore from './AreaStore'
import SizeStore from './SizeStore'

const Store = createStore(
  combineReducers({
    priceStore : PriceStore,
    areaStore : AreaStore,
    sizeStore: SizeStore,
  }),
  applyMiddleware(promise, logger)
);

export default Store