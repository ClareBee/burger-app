import React from 'react';
import {connect} from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {
  componentDidMount(){
    this.props.onFetchOrders();
  }
  render(){
    let orders = <Spinner />
    if (!this.props.loading){
      orders =
        this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price} />
      ))
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
