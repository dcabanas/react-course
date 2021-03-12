import classes from './Cockpit.module.css'
import React, { useEffect, useRef, useContext } from 'react'
import AuthContext from '../../context/auth-context'

const Cockpit = props => {
   const toggleBtnRef = useRef(null)
   //const authContext = useContext(AuthContext)

   //MOST USED AND IT IS LIKE THE
   //componentDidMount, componentDidUpdate and componentWillUnmount
   //COMBINED
   useEffect(() => {
      console.log('[Cockpit.js] useEffect')
      //HTTP request
      setTimeout(() => {
         alert('Saved data to cloud!')
      }, 1000)
      toggleBtnRef.current.click()
      return () => console.log('[Cockpit.js] cleanup work in useEffect')
   }, [])
   let assignedClasses = []
   let btnClass = ''
   if (props.showPersons) {
      btnClass = classes.red
   }
   if (props.personsLength <= 2) {
      assignedClasses.push(classes.red)
   }
   if (props.personsLength <= 1) {
      assignedClasses.push(classes.bold)
   }

   return (
      <div className={classes.Cockpit}>
         <h1>{props.appTitle}</h1>
         <p className={assignedClasses.join(' ')}>pepi</p>
         <button
            ref={toggleBtnRef}
            className={btnClass}
            onClick={props.toggled}
         >
            Toggle Persons
         </button>
         <AuthContext.Consumer>
            {context => <button onClick={context.login}>Log In</button>}
         </AuthContext.Consumer>
      </div>
   )
}

export default React.memo(Cockpit)
