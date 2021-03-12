import classes from './Modal.module.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'
import React from 'react'

const Modal = props => {
	const modalStyle = {
		transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
		opacity: props.show ? '1' : '0',
	}

	return (
		<Auxiliary>
			<Backdrop show={props.show} clicked={props.modalClosed}/>
			<div style={modalStyle} className={classes.Modal}>
				{props.children}
			</div>
		</Auxiliary>
	)
}

export default React.memo(Modal)
