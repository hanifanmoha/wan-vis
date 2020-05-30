import steinStore from './Action'

export const fetchSize = params => ({
  type: 'SIZE_FETCH',
  payload: steinStore.read('option_size', params)
})