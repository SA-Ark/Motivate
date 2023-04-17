export const SET_VALUES = 'SET_VALUES';


export const actionSetValues = (values) => ({
    type: SET_VALUES,
    payload: values,
  });



  const initialState = {

    searchTerm: null,
  };

 export default function searchReducer(state = initialState, action) {
    switch (action.type) {
      case 'SET_VALUES':
        return { ...state, 
            searchTerm: action.payload.searchTerm };
      default:
        return state;
    }
  }
