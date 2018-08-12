import * as actionTypes from '../actions/actionTypes.js';
import { updateObject} from '../utility.js';

// GLOBAL CONSTANTS IN CAPITALS
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  bacon: 0.7,
  meat: 1.3
};

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice:  state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building: true,
        }
        return updateObject(state, updatedState);
    case actionTypes.REMOVE_INGREDIENT:
      const updatedIng= {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
      const updatedIngs = updateObject(state.ingredients, updatedIng);
      const updatedSt= {
        ingredients: updatedIngs,
        totalPrice:  state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building: true,
        }
        return updateObject(state, updatedSt);
    case actionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: {
          salad: action.ingredients.salad,
          meat: action.ingredients.meat,
          bacon: action.ingredients.bacon,
          cheese: action.ingredients.cheese
        },
        totalPrice: 4,
        error: false,
        building: false,
      });
    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return updateObject(state, {
        error: true
      });
    default:
      return state;
  }
};

export default reducer;
