import * as ActionTypes from './ActionTypes';

export const Departments  = (state = { 
    isLoading: false,
    errMess: null,
    departments:[]}, action) => {
  switch (action.type) {

    case ActionTypes.DEPARTMENTS_LOADING:
      return {...state, isLoading: true};

    case ActionTypes.DEPARTMENTS_FAILED:
      return {...state, isLoading: false, errMess: action.payload};

    case ActionTypes.ADD_DEPARTMENTS:
      return {...state, isLoading: false, departments: action.payload};

    default:
      return state;
  }
};