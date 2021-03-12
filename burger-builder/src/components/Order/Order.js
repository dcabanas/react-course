import classes from './Order.module.css'

const Order = props => {
	const ingredients = []

	for (let igName in props.ingredients) {
		ingredients.push({name: igName, amount: props.ingredients[igName]})
	}

	const igsStyle = {
		textTransform: 'capitalize',
		display: 'inline-block',
		margin: '0 8px',
		border: '1px solid #ccc',
		padding: '5px',
	}

	const igOutput = ingredients.map((ig, id) => (
		<span style={igsStyle} key={id}>
         {ig.name} ({ig.amount})
      </span>
	))

	return (
		<div className={classes.Order}>
			<p>Ingredients: {igOutput}</p>
			<p>
				Price: <strong>USD {props.price.toFixed(2)}</strong>
			</p>
		</div>
	)
}
export default Order
