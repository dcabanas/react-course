import React, { Component } from 'react'
import classes from './Person.module.css'
import Auxiliary from '../../../hoc/Auxiliary'
import withClass from '../../../hoc/withClass'
import PropTypes from 'prop-types'
import AuthContext from '../../../context/auth-context'
//import styled from 'styled-components'
//import Radium from 'radium'

class Person extends Component {
   //componentDidMount = () => this.inputElement.focus()
   constructor(props) {
      super(props)
      this.inputElementRef = React.createRef()
   }

   //THIS GIVES A NEW PROPERTY CALLED this.context
   //static contextType = AuthContext

   componentDidMount = () => this.inputElementRef.current.focus()

   render() {
      console.log('[Person.js] rendering...')
      return (
         <Auxiliary>
            <AuthContext.Consumer>
               {context =>
                  context.authenticated ? (
                     <p>Authenticated!</p>
                  ) : (
                     <p>Please log in</p>
                  )
               }
            </AuthContext.Consumer>
            <p onClick={this.props.click}>
               I'm {this.props.name} and I am {this.props.age} years old!
            </p>
            <p>{this.props.children}</p>
            <input
               //ref={inputEl => (this.inputElement = inputEl)}
               ref={this.inputElementRef}
               type='text'
               onChange={this.props.changed}
               value={this.props.name}
            />
         </Auxiliary>
      )
   }
}

Person.propTypes = {
   click: PropTypes.func,
   name: PropTypes.string,
   age: PropTypes.number,
   changed: PropTypes.func,
}

//export default Radium(Person)
export default withClass(Person, classes.Person)
