import React from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import classes from './ContactData.css';

class ContactData extends React.Component {
  state = {
    name: '',
    address: {
      street: '',
      postCode: ''
    },
    email: '',
    loading: false,
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      //price should be on server side to prevent manipulation!
      price: this.props.price,
      customer: {
        name: "Clare Bee",
        address: {
          street: '21 Jump Street',
          zipCode: '12345',
          country: "USA"
        },
        email: 'Test@Test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({
          loading: false,
        });
        this.props.history.push('/');
      })
      .catch(error =>
        this.setState({
          loading: false,
        })
      );
  }

  render(){
    let form = null;
    if(this.state.loading) {
      form = <Spinner />
    } else {
      form = (
        <form action="">
          <input className={classes.Input} type="text" name="name" placeholder='Your Name'/>
          <input className={classes.Input} type="text" name="email" placeholder='Your Email'/>
          <input className={classes.Input} type="text" name="street" placeholder='Your Street'/>
          <input className={classes.Input} type="text" name="postCode" placeholder='Your Postcode'/>
          <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
        </form>
      );
    }
    return(
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}
export default ContactData;
