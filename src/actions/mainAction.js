import * as types from "./actionTypes";

export const setMainValue = value => ({
    type: types.SET_MAIN,
    value
  });

  
export const updateUserData = value => ({
    type: types.UPDATE_USER_DATA,
    value
  });  
export const updateLoaderStatus = () => ({
  type: types.SHOW_LOADER
    
  });

  export const getTeammatesData = value => ({
    type: types.GET_TEAMMATES_DATA,
    value
  });  

  export const getPendingCustomersData = value => ({
    type: types.GET_PENDING_CUSTOMERS,
    value
  }); 
  
  export const getActiveCustomersData = value => ({
    type: types.GET_ACTIVE_CUSTOMERS,
    value
  });  

  