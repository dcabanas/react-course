import { useState } from 'react';
// CSS MODULES
import classes from './App.module.css';
import Cockpit from './Cockpit/Cockpit';
//import Radium, {StyleRoot} from 'radium'
//import Person from './Persons/Person/Person'
import Persons from './Persons/Persons';
//import ErrorBoundary from './ErrorBoundary/ErrorBoundary'


const App = props => {
  const [state, setState] = useState({
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
  })

  const deletePersonHandler = id => {
    /*
    const personIndex = state.persons.findIndex(p =>
      p.id === id
    )

    const persons = [...state.persons]
    persons.splice(personIndex, 1)

    setState({
      ...state,
      persons: persons
    })
    */
   let persons = [...state.persons]
   persons = persons.filter(p => p.id !== id)

   if (persons.length === 0) {
    persons = [...state.initialPersons]
    setState({
      ...state,
      showPersons: false,
      persons: persons
    })
   }
   else
    setState({
      ...state,
      persons: persons
    })
  }
  
  const togglePersonHandler = () => {
    setState({
      ...state,
      showPersons: !state.showPersons
    })
  }

  // TWO-WAY BINDING EXAMPLE
  const nameChangedHandler = (event, id) => {
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian'
    const personIndex = state.persons.findIndex(p =>
      p.id === id
    )

    const person = {
      ...state.persons[personIndex]
    }

    person.name = event.target.value

    const persons = [...state.persons]
    persons[personIndex] = person

    setState({
      ...state,
      persons: persons
    })
  }

  /*
  let style = {
    backgroundColor: 'green',
    color: 'white',
    font: 'inherit',
    border: '1px solid blue',
    padding: '8px',
    cursor:'pointer',
    //RADIUM SUDO SELECTOR
    ':hover': {
      backgroundColor: 'lightgreen',
      color: 'black'
    }
  }
  */

  let persons = null

  if (state.showPersons) {
    persons = 
      <div>
        <Persons 
          persons={state.persons}
          clicked={deletePersonHandler}
          changed={nameChangedHandler}
        >
        </Persons>
        {/*{state.persons.map(person => 
          <ErrorBoundary key={person.id}>
            <Person 
              name={person.name}
              age={person.age}
              click={() => deletePersonHandler(person.id)}
              changed={(event) => nameChangedHandler(event, person.id)}
            />
          </ErrorBoundary>
        )}*/}
      </div>

    /*
    style.backgroundColor = 'red'
    //RADIUM
    style[':hover'] = {
      backgroundColor: 'salmon',
      color: 'black'
    }
    */
  }
  

  return (
    <div className={classes.App}>
      <Cockpit 
        appTitle={props.appTitle}
        showPersons={state.showPersons}
        persons={state.persons}
        toggled={togglePersonHandler}
      />
      {persons}
    </div>
  );
}

//export default Radium(App)
export default App