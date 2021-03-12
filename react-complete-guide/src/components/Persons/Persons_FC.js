import Person from './Person/Person_FC'

const Persons = props => {
    console.log('[Persons.js] rendering...')
    return (
        props.persons.map(person => 
            <Person 
                key={person.id}
                name={person.name}
                age={person.age}
                click={() => props.clicked(person.id)}
                changed={(event) => props.changed(event, person.id)}
            /> 
        )
    )
}

export default Persons