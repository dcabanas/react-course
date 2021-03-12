import Person from './Person/Person'
import React, { Component } from 'react'

class Persons extends Component {
   //EMPTY STATE JUST FOR LIFECYLE DEMO
   state = {}
   //SINCE THERE IS NO STATE, THIS HOOK IS NOT RECOMMENDED
   static getDerivedStateFromProps = (props, state) => {
      console.log('[Persons.js] getDerivedStateFromProps', props)
      return state
   }

   //DEPRECATED
   //componentWillReceiveProps = props =>
   //    console.log('[Persons.js] componentWillReceiveProps', props)

   //MUST ALWAYS RETUNR TRUE OF FALSE BASED ON CONDITION
   shouldComponentUpdate = (nextProps, nextState) => {
      console.log('[Persons.js] shouldComponentUpdate')
      //this pointer comparison only works because
      //the update on persons is done immutably in App.js
      return nextProps.persons !== this.props.persons
      //return true
   }

   getSnapshotBeforeUpdate = (prevProps, prevState) => {
      console.log('[Persons.js] getSnapshotBeforeUpdate')
      return { message: 'Snapshot!' }
   }

   //DEPRECATED
   //componentWillUpdate = () =>

   //MOST COMONLY USED. RUNS AFTER UPDATES (PROPS OR/AND) STATE
   //ARE DONE FOR ANY NESTED CHILDS (IF ANY). USED TO FECTH DATA
   componentDidUpdate = (prevProps, prevState, snapshot) => {
      console.log('[Persons.js] componentDidUpdate')
      console.log(snapshot)
   }

   //USED TO CLEAN UP EVENT LISTENERS WHEN COMPONENT
   //IS REMOVED FROM THE DOM
   componentWillUnmount = () => console.log('[Persons.js] componentWillUnmount')

   render() {
      console.log('[Persons.js] rendering...')
      return this.props.persons.map(person => (
         <Person
            key={person.id}
            name={person.name}
            age={person.age}
            click={() => this.props.clicked(person.id)}
            changed={event => this.props.changed(event, person.id)}
         />
      ))
   }
}

export default Persons
