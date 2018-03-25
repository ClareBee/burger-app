import React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends React.Component {
  state = {
    name: '',
    address: {
      street: '',
      postCode: ''
    },
    email: '',
  }
  render(){
    return(
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        <form action="">
          <input className={classes.Input} type="text" name="name" placeholder='Your Name'/>
          <input className={classes.Input} type="text" name="email" placeholder='Your Email'/>
          <input className={classes.Input} type="text" name="street" placeholder='Your Street'/>
          <input className={classes.Input} type="text" name="postCode" placeholder='Your Postcode'/>
          <Button btnType='Success'>ORDER</Button>



        </form>
      </div>
    );
  }
}
export default ContactData;
