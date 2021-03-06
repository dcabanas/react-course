import classes from './Person.module.css'
//import styled from 'styled-components'
//import Radium from 'radium'

/*
const StyledDiv = styled.div`
    width: 60%;
    margin: 16px auto;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;

    @media (min-width: 500px) {
        width: 450px
    }
`*/

const Person = props => {
    /*
    const rnd = Math.random()

    if (rnd < 0.1)
        throw new Error('Something went wrong')
    */
    //<div className="Person" style={style}>
    console.log('[Person.js] rendering...')
    return (
        <div className={classes.Person}>
            <p onClick={props.click}>I'm {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            <input type='text' onChange={props.changed} value={props.name}/>
        </div>
    )
}
    
//export default Radium(Person)
export default Person
