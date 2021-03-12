import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.module.css'

const CheckoutSummary = props => {
	const burgerStyle = {width: '100%', margin: 'auto'}
	return (
		<div className={classes.CheckoutSummary}>
			<h1>We hope it's good</h1>
			<div style={burgerStyle}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button type='Danger' clicked={props.checkoutCancelled}>
				CANCEL
			</Button>
			<Button type='Success' clicked={props.checkoutContinued}>
				CONTINUE
			</Button>
		</div>
	)
}

export default CheckoutSummary
