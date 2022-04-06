import * as ActionTypes from './ActionTypes';

export const StaffsSalary  = (state = { 
    isLoading: false,
    errMess: null,
    staffsSalary:[]}, action) => {
  switch (action.type) {

    case ActionTypes.STAFFSSALARY_LOADING:
      return {...state, isLoading: true};

    case ActionTypes.STAFFSSALARY_FAILED:
      return {...state, isLoading: false, errMess: action.payload};

    case ActionTypes.ADD_STAFFSSALARY:
      return {...state, isLoading: false, staffsSalary: action.payload};

    default:
      return state;
  }
};