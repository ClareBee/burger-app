import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends React.Component {
  componentWillUpdate(){

  }
  render (){
    const ingredientSummary = Object.keys(this.props.ingredients)
        .map(igKey => {
          return (
          <li key={igKey}>
            <span style={{textTransform: 'capitalize'}}>
              {igKey}
            </span>:{this.props.ingredients[igKey]}
          </li>
        );
      });
    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientSummary}
        </ul>
        <p><strong>Total Price: £{this.props.price}</strong></p>
        <p>Continue to checkout</p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
      </Aux>

    );
  }
}


export default OrderSummary;
