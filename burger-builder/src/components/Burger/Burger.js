import classes from './Burger.module.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = props => {
	//TRANSFORMS THE AN OBJECT INTO AN ARRAY OF ARRAYS WHERE
	//EACH SUB-ARRAY HAS AS MANY ELEMENTS AS THE VALUE IN
	//EACH KEY/VALUE PAIR IN THE ORIGINAL OBJECT
	let testIgs = Object.entries(props.ingredients)
		.map(e =>
			[...Array(e[1])].map((_, i) => (
				<BurgerIngredient key={e[0] + i} type={e[0]}/>
			))
		)
		.flat(Infinity)

	if (testIgs === undefined || testIgs.length === 0)
		testIgs = <p>Please start adding ingredients!</p>

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type='bread-top'/>
			{testIgs}
			<BurgerIngredient type='bread-bottom'/>
		</div>
	)
}

export default Burger
