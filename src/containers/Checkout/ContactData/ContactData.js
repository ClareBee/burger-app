import React from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import classes from './ContactData.css';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
      },
      postCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Postcode'
        },
        value: '',
        validation: {
          required: true,
          minLength: 7,
          maxLength: 7,
        },
        valid: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'medium', displayValue: 'Medium'},
            {value: 'cheapest', displayValue: 'Cheapest'},
          ]
        },
        value: '',
      }
    },
    loading: false,
  }

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({
      loading: true
    });
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm){
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
    };
    const order = {
      ingredients: this.props.ingredients,
      //price should be on server side to prevent manipulation!
      price: this.props.price,
      orderData: formData,
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

  checkValidity(value, rules){
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    //clones - for immutable
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);
    this.setState({
      orderForm: updatedOrderForm
    })
  }

  render(){
    const formElementsArray = [];
    for(let key in this.state.orderForm){
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }
    let form = null;
    if(this.state.loading) {
      form = <Spinner />
    } else {
      form = (
        <form action="">
          {formElementsArray.map(formElement => (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
          ))}
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
