export const SET_VIEW_FILTER = 'SET_VIEW_FILTER'
export const ADD_FOOD = 'ADD_FOOD'
export const REMOVE_FOOD = 'REMOVE_FOOD'
export const CREATE_USER = 'CREATE_USER'
export const ADD_EXERCISE = 'ADD_EXERCISE'
export const REMOVE_EXERCISE = 'REMOVE_EXERCISE'

export const ViewFilters = {
  VIEW_ALL: 'VIEW_ALL',
  VIEW_EGGS: 'VIEW_EGGS',
}

/* action creators */

/*
export const actionCreators = {
  add_food: food => {
    return {type: ADD_FOOD, food}
  },
  remove_food: id => {
    return {type: REMOVE_FOOD, id};
  },
}
*/


export function createUser(name, initInfo){
  
  return { type: CREATE_USER, name, initInfo }
}
export function addFood(name, category){
  return { type: ADD_FOOD, name, category };
}

export function removeFood(id){
  return { type: REMOVE_FOOD, id };
}

export function addExercise(name, category){
  return {type: ADD_EXERCISE, name, category};
}

export function removeExercise(id){
  return { type: REMOVE_EXERCISE, id };
}

export function setViewFilters(filter) {
  return { type: SET_VIEW_FILTER, filter}
}