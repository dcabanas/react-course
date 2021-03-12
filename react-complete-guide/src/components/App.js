import { Component } from 'react'
// CSS MODULES
import classes from './App.module.css'
import Cockpit from './Cockpit/Cockpit'
//import Radium, {StyleRoot} from 'radium'
//import Person from './Persons/Person/Person'
import Persons from './Persons/Persons'
//import ErrorBoundary from './ErrorBoundary/ErrorBoundary'
import withClass from '../hoc/withClass'
import Auxiliary from '../hoc/Auxiliary'
import AuthContext from '../context/auth-context'

class App extends Component {
   // OLD SYNTAX OF INITIALIZE STATE
   constructor(props) {
      super(props)
      console.log('[App.js] constructor')
      this.state = {
         persons: [
            { id: 1, name: 'Max', age: 28 },
            { id: 2, name: 'Manu', age: 29 },
            { id: 3, name: 'Stephanie', age: 26 },
         ],
         initialPersons: [
            { id: 1, name: 'Max', age: 28 },
            { id: 2, name: 'Manu', age: 29 },
            { id: 3, name: 'Stephanie', age: 26 },
         ],
         otherState: 'some other value',
         //changeCounter: 0,
         authenticated: false,
         showPersons: false,
      }
   }

   //RARELY USED
   static getDerivedStateFromProps = (props, state) => {
      console.log('[App.js] getDerivedStateFromProps', props)
      return state
   }

   //DEPRECATED
   //componentWillMount = () => console.log('[App.js] componentWillMount')

   //MOST COMONLY USED. CAN BE USED TO FETCH DATA
   componentDidMount = () => console.log('[App.js] componentDidMount')

   //SOMETIMES USED FOR PERFORMANCE IMPROVEMENTS
   shouldComponentUpdate = (nextProps, nextState) => {
      console.log('[App.js] shouldComponentUpdate')
      //return false
      return true
   }

   componentDidUpdate = () => console.log('[App.js] componentDidUpdate')

   // MODERN SYNTAX OF INITIALIZE STATE
   /*
  state = {
    persons: [
      {id: 1, name: 'Max', age: 28},
      {id: 2, name: 'Manu', age: 29},
      {id: 3, name: 'Stephanie', age: 26}
    ],
    initialPersons : [
      {id: 1, name: 'Max', age: 28},
      {id: 2, name: 'Manu', age: 29},
      {id: 3, name: 'Stephanie', age: 26}
    ],
    otherState: 'some other value',
    showPersons: false
  }*/

   deletePersonHandler = id => {
      let persons = [...this.state.persons]
      persons = persons.filter(p => p.id !== id)

      if (persons.length === 0) {
         persons = [...this.state.initialPersons]
         this.setState({
            showPersons: false,
            persons: persons,
         })
      } else
         this.setState({
            persons: persons,
         })
   }

   togglePersonHandler = () => {
      this.setState({
         showPersons: !this.state.showPersons,
      })
   }

   // TWO-WAY BINDING EXAMPLE
   nameChangedHandler = (event, id) => {
      const personIndex = this.state.persons.findIndex(p => p.id === id)

      const person = {
         ...this.state.persons[personIndex],
      }

      person.name = event.target.value

      const persons = [...this.state.persons]
      persons[personIndex] = person

      this.setState({
         persons: persons,
      })

      //EXAMPLE OF ASYNCHROUS STATE UPDATE
      /*
      this.setState((prevState, props) =>
         {
            persons: persons,
            changeCounter: prevState.changeCounter++
         } 
      )
      */
   }

   loginHandler = () => this.setState({ authenticated: true })

   render() {
      console.log('[App.js] render')
      let persons = null

      if (this.state.showPersons) {
         persons = (
            <div>
               <Persons
                  persons={this.state.persons}
                  clicked={this.deletePersonHandler}
                  changed={this.nameChangedHandler}
               ></Persons>
            </div>
         )
      }

      let provVal = {
         authenticated: this.state.authenticated,
         login: this.loginHandler,
      }

      return (
         <Auxiliary>
            {/*NEEDS TO WRAP ALL THE COMPONENTS THAT NEED THE CONTEXT*/}
            <AuthContext.Provider value={provVal}>
               <Cockpit
                  appTitle={this.props.appTitle}
                  showPersons={this.state.showPersons}
                  personsLength={this.state.persons.length}
                  toggled={this.togglePersonHandler}
               />
               {persons}
            </AuthContext.Provider>
         </Auxiliary>
      )
   }
}

//export default Radium(App)
export default withClass(App, classes.App)
