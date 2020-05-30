import steinStore from './Action'

export const fetchArea = params => ({
  type: 'AREA_FETCH',
  payload: steinStore.read('option_area', params)
})