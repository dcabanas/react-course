import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'

const OrderSummary = props => {
	//SAME AS <span style={{textTransform: 'capitalize'}}>
	//const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1)
	const igStyle = {textTransform: 'capitalize'}

	const igSummary = Object.entries(props.ingredients).map((e, i) => (
		<li key={i}>
			<span style={igStyle}>{e[0]}</span> : {e[1]}
		</li>
	))

	return (
		<Auxiliary>
			<h3>Your Order</h3>
			<p>Ingredients:</p>
			<ul>{igSummary}</ul>
			<p>
				<strong>Total price: {props.price.toFixed(2)}</strong>
			</p>
			<p>Continue to Checkout?</p>
			<Button type='Danger' clicked={props.cancelled}>
				CANCEL
			</Button>
			<Button type='Success' clicked={props.continued}>
				CONTINUE
			</Button>
		</Auxiliary>
	)
}

export default OrderSummary
