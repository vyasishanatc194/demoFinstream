import * as types from '../actions/actionTypes';

const initialState = {
  userDetails : {},
  loader : false,
  teammatesData: {} ,
  pendingCustomersData:[],
  activeCustomersData:{},
};

const user = (state = initialState, action) => {
    switch (action.type) {
      case types.SET_MAIN:
        return {
          ...state,
          TestValue: action.value,
        };
      case types.UPDATE_USER_DATA:
        return {
          ...state,
          userDetails: action.value,
        };
      case types.SHOW_LOADER:
        return {
          ...state,
          loader : !state.loader,
        };
      case types.GET_TEAMMATES_DATA:
        return {
          ...state,
          teammatesData: action.value,
        };
      case types.GET_PENDING_CUSTOMERS:
        return {
          ...state,
          pendingCustomersData: action.value,
        };
      case types.GET_ACTIVE_CUSTOMERS:
        return {
          ...state,
          activeCustomersData: action.value,
        };
      default:
        return state;
    }
  };
  
  export default user;
  