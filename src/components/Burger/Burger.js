import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  //turns object of key-value pairs into an array of ingredients
  let transformedIngredients = Object.keys(props.ingredients)
      .map(ingKey => {
        return [...Array(props.ingredients[ingKey])].map((_, i) => {
          return <BurgerIngredient key={ingKey + i} type={ingKey} />;
        });
      })
      .reduce((arr, el) => {
          return arr.concat(el)
      }, []);
  if (transformedIngredients.length === 0){
    transformedIngredients = <p>Please start adding ingredients!</p>
  }
  return(
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
        {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
//wrapping component with withRouter injects it with router props
export default withRouter(burger);
