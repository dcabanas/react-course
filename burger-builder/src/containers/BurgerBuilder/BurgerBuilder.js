import React, { Component } from 'react'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Burger from '../../components/Burger/Burger'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actionCreators from '../../store/actions/index'

export class BurgerBuilder extends Component {
   state = {
      ordered: false,
      //loading: false,
      //error: false,
   }

   componentDidMount = () => {
      this.props.onInitIgs()
      /*
		axios
		   .get('ingredients.json')
		   .then(res => {
			  this.setState({
				 ingredients: res.data,
			  })
		   })
		   .catch(error => {
			  this.setState({ error: true })
		   })
		   */
   }

   /*
	addIngredientHandler = type => {
	   const ingredients = { ...this.state.ingredients }
	   ingredients[type]++

	   this.setState((prevState, _) => {
		  return {
			 ingredients: ingredients,
			 totalPrice: prevState.totalPrice + this.INGREDIENT_PRICES[type],
		  }
	   })
	}

	removeIngredientHandler = type => {
	   const ingredients = { ...this.state.ingredients }
	   ingredients[type]--

	   this.setState((prevState, _) => {
		  return {
			 ingredients: ingredients,
			 totalPrice: prevState.totalPrice - this.INGREDIENT_PRICES[type],
		  }
	   })
	}
	*/

   orderHandler = () => {
      if (this.props.isAuth) {
         this.setState({ ordered: true })
      } else {
         this.props.onSetAuthRedirectPath('/checkout')
         this.props.history.replace('/auth')
      }
   }

   orderCancelHandler = () => this.setState({ ordered: false })

   /*
	orderContinueHandler = () => {
	   this.setState({ loading: true })
	   const order = {
		  ingredients: this.state.ingredients,
		  price: this.state.totalPrice,
		  customer: {
			 name: 'Pepi Pepadas',
			 address: {
				street: 'Teststreet 1',
				zipcode: '41351',
				country: 'Pepilandia',
			 },
			 email: 'test@test.com',
		  },
		  deliveryMethod: 'fastest',
	   }
	   axios
		  .post('orders.json', order)
		  .then(response => {
			 this.setState({ loading: false, ordered: false })
			 //console.log(response)
		  })
		  .catch(error => {
			 this.setState({ loading: false, ordered: false })
			 //console.log(error.message)
		  })
	   //alert('You continue!')
	}
	*/

   /*
	orderContinueHandler = () => {
	   const queryParams =
		  '?' +
		  new URLSearchParams(this.state.ingredients) +
		  '&' +
		  'price=' +
		  this.props.price

	   this.props.history.push({
		  pathname: '/checkout',
		  search: queryParams,
	   })
	}
	*/

   orderContinueHandler = () => {
      this.props.history.push('/checkout')
      this.props.onInitPurchase()
   }

   render() {
      const disabledInfo = {
         ...this.props.igs,
      }

      Object.keys(disabledInfo).forEach(
         key => (disabledInfo[key] = disabledInfo[key] === 0)
      )

      const orderStatus = Object.values(disabledInfo).some(v => v === false)

      let orderSummary = null

      let burger = this.props.err ? (
         <p>Ingredients can't be loaded</p>
      ) : (
         <Spinner />
      )

      if (this.props.igs) {
         burger = [
            <Burger ingredients={this.props.igs} />,
            <BuildControls
               authState={this.props.isAuth}
               igAdd={this.props.onIgAdded}
               igDel={this.props.onIgRemoved}
               disabled={disabledInfo}
               price={this.props.price}
               orderStatus={orderStatus}
               ordered={this.orderHandler}
            />,
         ]
         orderSummary = (
            <OrderSummary
               ingredients={this.props.igs}
               cancelled={this.orderCancelHandler}
               continued={this.orderContinueHandler}
               price={this.props.price}
            />
         )
      }

      /*
		if (this.state.loading) {
			orderSummary = <Spinner/>
		}
		*/

      return (
         <Auxiliary>
            <Modal
               show={this.state.ordered}
               modalClosed={this.orderCancelHandler}
            >
               {orderSummary}
            </Modal>
            {burger}
         </Auxiliary>
      )
   }
}

const mapStateToProps = state => ({
   igs: state.burgBld.ingredients,
   price: state.burgBld.totalPrice,
   err: state.burgBld.error,
   isAuth: state.auth.token !== null,
})

const mapDispatchToProps = dispatch => ({
   onIgAdded: name => dispatch(actionCreators.addIngredient(name)),
   onIgRemoved: name => dispatch(actionCreators.removeIngredient(name)),
   onInitIgs: () => dispatch(actionCreators.initIngredients()),
   onInitPurchase: () => dispatch(actionCreators.purchaseInit()),
   onSetAuthRedirectPath: path =>
      dispatch(actionCreators.setAuthRedirectPath(path)),
})

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios))
