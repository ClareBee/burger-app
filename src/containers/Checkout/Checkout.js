import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends React.Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      bacon: 1,
      cheese: 1
    }
  }

  render () {
    return (
      <div>
        <CheckoutSummary ingredients={this.state.ingredients}/>
      </div>
    );
  }
}

export default Checkout;
