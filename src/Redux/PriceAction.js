import steinStore from './Action'

export const fetchPrice = params => ({
  type: 'PRICE_FETCH',
  payload: steinStore.read('list', params)
})

export const postPrice = body => steinStore.append('list', body)