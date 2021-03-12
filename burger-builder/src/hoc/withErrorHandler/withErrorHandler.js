import Modal from '../../components/UI/Modal/Modal'
import Auxiliary from '../Auxiliary/Auxiliary'
import React, {Component} from 'react'

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props)
			this.state = {
				error: '',
			}
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({error: ''})
				return req
			})
			this.resInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({
						error: error.message,
					})
				}
			)
		}

		//PREVENTS MEMORY LEAKS
		componentWillUnmount = () => {
			axios.interceptors.request.eject(this.reqInterceptor)
			axios.interceptors.response.eject(this.resInterceptor)
		}

		errorConfirmedHandler = () => this.setState({error: ''})

		render() {
			let errorMessage = this.state.error
			if (!errorMessage) {
				errorMessage = null
			}

			return (
				<Auxiliary>
					<Modal
						show={errorMessage}
						modalClosed={this.errorConfirmedHandler}
					>
						{errorMessage}
					</Modal>
					<WrappedComponent {...this.props} />
				</Auxiliary>
			)
		}
	}
}
export default withErrorHandler
