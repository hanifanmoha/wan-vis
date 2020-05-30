import Area from "../Model/Area"

const initialState = {
  available: false,
  loading: false,
  list: [],
};

const AreaStore = (state = initialState, action) => {
  switch (action.type) {
    case 'AREA_RESET':
      return initialState
    case 'AREA_FETCH_PENDING':
      return {
        ...state,
        loading: true
      };
    case 'AREA_FETCH_FULFILLED':
      let fetchedArea = action.payload.map(json => new Area(json))
      return {
        ...state,
        available: true,
        loading: false,
        list: fetchedArea,
      };
    case 'AREA_FETCH_REJECTED':
      return {
        ...state,
        loading: false
      };
    default: {
      return state;
    }
  }
}

export default AreaStore