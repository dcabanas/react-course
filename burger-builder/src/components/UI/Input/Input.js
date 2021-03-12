import classes from './Input.module.css'

const Input = props => {
	let inputElement = null
	const inputClasses = [classes.InputElement]

	if (props.invalid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid)
	}

	switch (props.elementType) {
		case 'input':
			inputElement = (
				<input
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
					onChange={props.changed}
				/>
			)
			break
		case 'textarea':
			inputElement = (
				<textarea
					onChange={props.changed}
					className={inputClasses.join(' ')}
					{...props.elementConfig}
					value={props.value}
				/>
			)
			break
		case 'select':
			inputElement = (
				<select
					onChange={props.changed}
					className={inputClasses.join(' ')}
					value={props.value}
				>
					{props.elementConfig.options.map((option, id) => (
						<option key={id} value={option.value}>
							{option.displayValue}
						</option>
					))}
				</select>
			)
			break
		default:
			break
	}

	return (
		<div className={classes.Input}>
			<label>{props.label}</label>
			{inputElement}
		</div>
	)
}

export default Input
