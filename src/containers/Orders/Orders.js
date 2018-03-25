import React from 'react';
import Order from '../../components/Order/Order';

class Orders extends React.Component {
  render(){
    return (
      <div>
        <Order/>
        <Order />
      </div>
    );
  }
}
export default Order;
