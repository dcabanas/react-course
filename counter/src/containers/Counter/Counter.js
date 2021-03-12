import React, { Component } from 'react'
import { connect } from 'react-redux'

import CounterControl from '../../components/CounterControl/CounterControl'
import CounterOutput from '../../components/CounterOutput/CounterOutput'
//import * as types from '../../store/actions/actions'
import * as actionCreators from '../../store/actions/index'

class Counter extends Component {
   state = {
      counter: 0,
   }

   counterChangedHandler = (action, value) => {
      switch (action) {
         case 'inc':
            this.setState(prevState => {
               return { counter: prevState.counter + 1 }
            })
            break
         case 'dec':
            this.setState(prevState => {
               return { counter: prevState.counter - 1 }
            })
            break
         case 'add':
            this.setState(prevState => {
               return { counter: prevState.counter + value }
            })
            break
         case 'sub':
            this.setState(prevState => {
               return { counter: prevState.counter - value }
            })
            break
         default:
            break
      }
   }

   render() {
      return (
         <div>
            <CounterOutput value={this.props.ctr} />
            <CounterControl
               label='Increment'
               clicked={this.props.onIncCounter}
            />
            <CounterControl
               label='Decrement'
               clicked={this.props.onDecCounter}
            />
            <CounterControl label='Add 5' clicked={this.props.onAddCounter} />
            <CounterControl
               label='Subtract 5'
               clicked={this.props.onSubCounter}
            />
            <hr />
            <button onClick={() => this.props.onStoreResult(this.props.ctr)}>
               Store Result
            </button>
            <ul>
               {this.props.res.map(result => (
                  <li
                     key={result.id}
                     onClick={() => this.props.onDelResult(result.id)}
                  >
                     {result.value}
                  </li>
               ))}
            </ul>
         </div>
      )
   }
}

//MAPS THE STATE IN THE REDUCER TO PROPS
//SO THE COMPONENT CAN SUBSCRIBE TO ANY CHANGES
//AND USE THE PROPS
const mapStateToProps = state => {
   return {
      ctr: state.ctr.counter,
      res: state.res.results,
   }
}

//METHODS ARE ALSO MAPPED AS ACCESSIBLE AS PROPS
const mapDispatchToProps = dispatch => {
   return {
      onIncCounter: () => dispatch(actionCreators.increment()),
      onDecCounter: () => dispatch(actionCreators.decrement()),
      onAddCounter: () => dispatch(actionCreators.add(5)),
      onSubCounter: () => dispatch(actionCreators.subtract(5)),
      onStoreResult: result => dispatch(actionCreators.storeResult(result)),
      onDelResult: resID => dispatch(actionCreators.deleteResult(resID)),
   }
}

//(null, mapDispatchToProps)
//(mapStateToProps)
export default connect(mapStateToProps, mapDispatchToProps)(Counter)
