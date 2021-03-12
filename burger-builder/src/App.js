import React, { Component, Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Logout from './containers/Auth/Logout/Logout'
import { connect } from 'react-redux'
import * as actionCreators from './store/actions/index'

const AsyncCheckout = React.lazy(() => './containers/Checkout/Checkout')
const AsyncOrders = React.lazy(() => './containers/Orders/Orders')
const AsyncAuth = React.lazy(() => './containers/Auth/Auth')

class App extends Component {
   componentDidMount = () => this.props.onTryAutoSignUp()

   render() {
      let routes = (
         <Switch>
            <Route
               path='/auth'
               render={() => (
                  <Suspense fallback={<div>Loading...</div>}>
                     <AsyncAuth />
                  </Suspense>
               )}
            />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/' />
         </Switch>
      )
      if (this.props.isAuth) {
         routes = (
            <Switch>
               <Route
                  path='/checkout'
                  render={() => (
                     <Suspense fallback={<div>Loading...</div>}>
                        <AsyncCheckout />
                     </Suspense>
                  )}
               />
               <Route
                  path='/orders'
                  render={() => (
                     <Suspense fallback={<div>Loading...</div>}>
                        <AsyncOrders />
                     </Suspense>
                  )}
               />
               <Route path='/logout' component={Logout} />
               <Route path='/' exact component={BurgerBuilder} />
               <Redirect to='/' />
            </Switch>
         )
      }

      return (
         <div>
            <Layout>{routes}</Layout>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   isAuth: state.auth.token !== null,
})

const mapDispatchToProps = dispatch => ({
   onTryAutoSignUp: () => dispatch(actionCreators.authCheckState()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
