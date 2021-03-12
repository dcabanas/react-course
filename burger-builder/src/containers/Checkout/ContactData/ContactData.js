import { Component } from 'react'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import { cloneDeep } from 'lodash'
import { connect } from 'react-redux'
import * as actionCreators from '../../../store/actions/index'
import { checkValidity } from '../../../shared/utility'

class ContactData extends Component {
   initForm = () => {
      return {
         name: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Your Name',
            },
            value: '',
            validation: {
               required: true,
            },
            valid: false,
            touched: false,
         },
         street: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Street',
            },
            value: '',
            validation: {
               required: true,
            },
            valid: false,
            touched: false,
         },
         zipCode: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'ZIP Code',
            },
            value: '',
            validation: {
               required: true,
               minLength: 5,
               maxLength: 5,
               isNumeric: true,
            },
            valid: false,
            touched: false,
         },
         country: {
            elementType: 'input',
            elementConfig: {
               type: 'text',
               placeholder: 'Country',
            },
            value: '',
            validation: {
               required: true,
            },
            valid: false,
            touched: false,
         },
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Your E-Mail',
            },
            value: '',
            validation: {
               required: true,
               isEmail: true,
            },
            valid: false,
            touched: false,
         },
         deliveryMethod: {
            elementType: 'select',
            elementConfig: {
               options: [
                  { value: 'fastest', displayValue: 'Fastest' },
                  { value: 'cheapest', displayValue: 'Cheapest' },
               ],
            },
            value: 'fastest',
            validation: {},
            valid: true,
         },
      }
   }

   state = {
      orderForm: this.initForm(),
      formIsValid: false,
      //loading: false,
   }

   orderHandler = event => {
      //WHEN INSIDE A FORM THE DEFAULT BEHAVIOUR
      //OF A CLICK IS TO SEND A REQUEST AND RELOAD
      //THE PAGE
      event.preventDefault()

      //this.setState({loading: true})
      const formData = {}
      Object.keys(this.state.orderForm).forEach(
         formID => (formData[formID] = this.state.orderForm[formID].value)
      )
      const order = {
         ingredients: this.props.igs,
         price: this.props.price,
         orderData: formData,
         userID: this.props.usrID,
      }
      this.props.onOrderBurger(order, this.props.tkn)
      /*
		axios
			.post('orders.json', order)
			.then(response => {
				this.setState({loading: false})
				this.props.history.replace('/')
				//console.log(response)
			})
			.catch(error => {
				this.setState({loading: false})
				//console.log(error.message)
			})
		 */
   }

   inputChangedHandler = (event, id) => {
      //WHEN HE HAVE NESTED OBJECTS AND NEED TO
      //CHANGE THE STATE IMMUTABLY
      const updatedOrderForm = cloneDeep(this.state.orderForm)
      updatedOrderForm[id].value = event.target.value
      updatedOrderForm[id].valid = checkValidity(
         updatedOrderForm[id].validation,
         updatedOrderForm[id].value
      )
      updatedOrderForm[id].touched = true

      let formIsValid = true
      Object.keys(updatedOrderForm).forEach(
         inputID =>
            (formIsValid = updatedOrderForm[inputID].valid && formIsValid)
      )

      this.setState({
         orderForm: updatedOrderForm,
         formIsValid: formIsValid,
      })
   }

   render() {
      const formElementsArray = []
      for (let key in this.state.orderForm) {
         formElementsArray.push({
            id: key,
            config: this.state.orderForm[key],
         })
      }

      let form = (
         <form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement => (
               <Input
                  touched={formElement.config.touched}
                  invalid={!formElement.config.value}
                  shouldValidate={formElement.config.validation}
                  changed={event =>
                     this.inputChangedHandler(event, formElement.id)
                  }
                  key={formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
               />
            ))}
            <Button type='Success' disabled={!this.state.formIsValid}>
               ORDER
            </Button>
         </form>
      )
      if (this.props.lndg) {
         form = <Spinner />
      }
      return (
         <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
         </div>
      )
   }
}

const mapStateToProps = state => ({
   igs: state.burgBld.ingredients,
   price: state.burgBld.totalPrice,
   lndg: state.ords.loading,
   tkn: state.auth.token,
   usrID: state.auth.userID,
})

const mapDispatchToProps = dispatch => ({
   onOrderBurger: (orderData, token) =>
      dispatch(actionCreators.purchase(orderData, token)),
})

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(ContactData, axios))
