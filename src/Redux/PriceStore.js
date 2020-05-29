import Price from "../Model/Price"

const initialState = {
  loading: false,
  offset: 0,
  isLoadMore: true,
  list: [],
  current: null,
  activeSort: -1,
  sortType: 1,
};

const PriceStore = (state = initialState, action) => {
  switch (action.type) {
    case 'PRICE_RESET':
      return initialState
    case 'PRICE_SORT':
      return {
        ...state,
        activeSort: action.payload.activeSort,
        sortType: action.payload.sortType,
        list: state.list.sort((a, b) =>{
          let f1 = a.rowData()[action.payload.activeSort]
          let f2 = b.rowData()[action.payload.activeSort]
          return f1 < f2? action.payload.sortType : -action.payload.sortType
        })
      }
    case 'PRICE_FETCH_PENDING':
      return {
        ...state,
        loading: true
      };
    case 'PRICE_FETCH_FULFILLED':
      let fetchedList = action.payload.map(json => new Price(json))
      let newList = [
        ...state.list,
        ...fetchedList
      ]
      if(state.activeSort >= 0) {
        newList = newList.sort((a, b) =>{
          let f1 = a.rowData()[state.activeSort]
          let f2 = b.rowData()[state.activeSort]
          return f1 < f2? state.sortType : -state.sortType
        })
      }
      return {
        ...state,
        loading: false,
        list: newList,
        isLoadMore: fetchedList.length >= Price.rowLimit,
        offset: newList.length
      };
    case 'PRICE_FETCH_REJECTED':
      return {
        ...state,
        loading: false
      };
    default: {
      return state;
    }
  }
}

export default PriceStore