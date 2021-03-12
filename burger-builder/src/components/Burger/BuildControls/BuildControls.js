import BuildControl from './BuildControl/BuildControl'
import classes from './BuildControls.module.css'

const BuildControls = props => {
   const controls = [
      { label: 'Salad', type: 'salad' },
      { label: 'Bacon', type: 'bacon' },
      { label: 'Cheese', type: 'cheese' },
      { label: 'Meat', type: 'meat' },
   ]

   return (
      <div className={classes.BuildControls}>
         <p>
            Burger Price: <strong>{props.price.toFixed(2)}</strong>
         </p>
         {controls.map((ctrl, i) => (
            <BuildControl
               key={i}
               label={ctrl.label}
               added={() => props.igAdd(ctrl.type)}
               removed={() => props.igDel(ctrl.type)}
               disabled={props.disabled[ctrl.type]}
            />
         ))}
         <button
            className={classes.OrderButton}
            disabled={!props.orderStatus}
            onClick={props.ordered}
         >
            {props.authState ? 'ORDER NOW' : 'SIGN UP'}
         </button>
      </div>
   )
}
export default BuildControls
