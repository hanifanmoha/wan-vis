import SteinStore from 'stein-js-client'

let url = 'https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4'
const store = new SteinStore(url)

export const fetchPrice = params => ({
  type: 'PRICE_FETCH',
  payload: store.read('list', params)
});