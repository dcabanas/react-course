import classes from './Button.module.css'

const Button = props => {
	const btnStyle = [classes.Button, classes[props.type]].join(' ')

	return (
		<button
			disabled={props.disabled}
			className={btnStyle}
			onClick={props.clicked}
		>
			{props.children}
		</button>
	)
}
export default Button
