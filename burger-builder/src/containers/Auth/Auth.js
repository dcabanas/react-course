import React, { Component } from 'react'
import { connect } from 'react-redux'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner'
import classes from './Auth.module.css'
import { cloneDeep } from 'lodash'
import * as actionCreators from '../../store/actions/index'
import { Redirect } from 'react-router-dom'
import { checkValidity } from '../../shared/utility'

class Auth extends Component {
   state = {
      controls: {
         email: {
            elementType: 'input',
            elementConfig: {
               type: 'email',
               placeholder: 'Your email',
            },
            value: '',
            validation: {
               required: true,
               isEmail: true,
            },
            valid: false,
            touched: false,
         },
         password: {
            elementType: 'input',
            elementConfig: {
               type: 'password',
               placeholder: 'Password',
            },
            value: '',
            validation: {
               required: true,
               minLength: 6,
            },
            valid: false,
            touched: false,
         },
      },
      isSignUp: true,
   }

   componentDidMount = () => {
      if (!this.props.bldng && this.props.authRedirectPath !== '/') {
         this.props.onSetAuthRedirectPath()
      }
   }

   inputChangedHandler = (event, controlName) => {
      const updatedControls = cloneDeep(this.state.controls)
      updatedControls[controlName].value = event.target.value
      updatedControls[controlName].valid = checkValidity(
         updatedControls[controlName].validation,
         updatedControls[controlName].value
      )
      updatedControls[controlName].touched = true

      this.setState({
         controls: updatedControls,
      })
   }

   submitHandler = event => {
      event.preventDefault()
      const email = this.state.controls.email.value
      const password = this.state.controls.password.value
      const authMode = this.state.isSignUp
      this.props.onAuth(email, password, authMode)
   }

   switchAuthModeHandler = () => {
      this.setState(prevState => ({
         isSignUp: !prevState.isSignUp,
      }))
   }

   render() {
      const formElementsArray = []
      for (let key in this.state.controls) {
         formElementsArray.push({
            id: key,
            config: this.state.controls[key],
         })
      }

      let form = formElementsArray.map(formElement => (
         <Input
            touched={formElement.config.touched}
            invalid={!formElement.config.value}
            shouldValidate={formElement.config.validation}
            changed={event => this.inputChangedHandler(event, formElement.id)}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
         />
      ))

      if (this.props.lndg) {
         form = <Spinner />
      }

      let errorMessage = null
      if (this.props.err) {
         errorMessage = <p>{this.props.err.message}</p>
      }

      let authRedirect = null
      if (this.props.isAuth) {
         authRedirect = <Redirect to={this.props.authRedirectPath} />
      }

      return (
         <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            <form onSubmit={event => this.submitHandler(event)}>
               {form}
               <Button type='Success'>SUBMIT</Button>
            </form>
            <Button type='Danger' clicked={this.switchAuthModeHandler}>
               SWITCH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </Button>
         </div>
      )
   }
}

const mapStateToProps = state => ({
   lndg: state.auth.loading,
   err: state.auth.error,
   isAuth: state.auth.token !== null,
   bldng: state.burgBld.building,
   authRedirectPath: state.auth.authRedirectPath,
})

const mapDispatchToProps = dispatch => ({
   onAuth: (email, password, isSignUp) =>
      dispatch(actionCreators.auth(email, password, isSignUp)),
   onSetAuthRedirectPath: () =>
      dispatch(actionCreators.setAuthRedirectPath('/')),
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
