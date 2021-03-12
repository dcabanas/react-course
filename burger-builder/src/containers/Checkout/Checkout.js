import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'

class Checkout extends Component {
   /*
	componentWillMount = () => {
	   const ingredients = Object.fromEntries(
		  new URLSearchParams(this.props.location.search)
	   )
	   Object.entries(ingredients).forEach(e => {
		  ingredients[e[0]] = +e[1]
	   })
	   const { price } = ingredients
	   delete ingredients.price
	   this.setState({ ingredients: ingredients, totalPrice: price })
	}
	*/

   checkoutCancelledHandler = () => {
      this.props.history.goBack()
   }

   checkoutContinuedHandler = () => {
      this.props.history.replace('/checkout/contact-data')
   }

   render() {
      let summary = <Redirect to='/' />
      if (this.props.igs) {
         const purchasedRedirect = this.props.prchd ? <Redirect to='/' /> : null
         summary = (
            <div>
               {purchasedRedirect}
               <CheckoutSummary
                  ingredients={this.props.igs}
                  checkoutCancelled={this.checkoutCancelledHandler}
                  checkoutContinued={this.checkoutContinuedHandler}
               />
               <Route
                  path={`${this.props.match.path}/contact-data`}
                  component={ContactData}
               />
            </div>
         )
      }
      return (
         <div>
            {summary}
            {/*
					<Route
					path={`${this.props.match.path}/contact-data`}
					component={ContactData}
					render={props => (
					   <ContactData
						  ingredients={this.props.igs}
						  price={this.props.price}
						  {...props}
					   />
					)}
					/>
				*/}
         </div>
      )
   }
}

const mapStateToPros = state => ({
   igs: state.burgBld.ingredients,
   prchd: state.ords.purchased,
})

export default connect(mapStateToPros)(Checkout)
