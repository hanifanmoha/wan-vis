import Size from "../Model/Size"

const initialState = {
  available: false,
  loading: false,
  list: [],
};

const SizeStore = (state = initialState, action) => {
  switch (action.type) {
    case 'SIZE_RESET':
      return initialState
    case 'SIZE_FETCH_PENDING':
      return {
        ...state,
        loading: true
      };
    case 'SIZE_FETCH_FULFILLED':
      let fetchedSize = action.payload.map(json => new Size(json))
      return {
        ...state,
        available: true,
        loading: false,
        list: fetchedSize,
      };
    case 'SIZE_FETCH_REJECTED':
      return {
        ...state,
        loading: false
      };
    default: {
      return state;
    }
  }
}

export default SizeStore