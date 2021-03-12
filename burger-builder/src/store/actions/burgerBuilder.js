import * as types from './types'

export const addIngredient = name => ({
   type: types.ADD_INGREDIENT,
   igName: name,
})

export const removeIngredient = name => ({
   type: types.REMOVE_INGREDIENT,
   igName: name,
})

export const setIngredients = igs => ({
   type: types.SET_INGREDIENTS,
   ingredients: igs,
})

export const fetchIngredientsFailed = () => ({
   type: types.FETCH_INGREDIENTS_FAILED,
})

//ASYNC CODE
export const initIngredients = () => ({
   type: types.INIT_INGREDIENTS,
})
