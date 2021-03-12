import { Component } from 'react'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionCreators from '../../store/actions/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
   /*
	state = {
		orders: [],
		loading: true,
	}
	 */

   componentDidMount = () => {
      this.props.onFetchOrders(this.props.tkn, this.props.usrID)
      /*
		axios
			.get('orders.json')
			.then(res => {
				const fetchedOrders = [...this.state.orders]
				Object.keys(res.data).forEach(key =>
					fetchedOrders.push({
						id: key,
						...res.data[key],
					})
				)
				this.setState({loading: false, orders: fetchedOrders})
			})
			.catch(error => {
				this.setState({loading: false})
			})
		 */
   }

   render() {
      let orders = <Spinner />
      if (!this.props.lndg) {
         orders = this.props.ords.map(order => (
            <Order
               key={order.id}
               ingredients={order.ingredients}
               price={order.price}
            />
         ))
      }
      return <div>{orders}</div>
   }
}

const mapStateToProps = state => ({
   ords: state.ords.orders,
   lndg: state.ords.loading,
   tkn: state.auth.token,
   usrID: state.auth.userID,
})

const mapDispatchToProps = dispatch => ({
   onFetchOrders: (token, userId) =>
      dispatch(actionCreators.fetchOrders(token, userId)),
})

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(withErrorHandler(Orders, axios))
