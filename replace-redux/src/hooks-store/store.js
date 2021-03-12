import { useState, useEffect } from 'react'

let globalState = {}
let listeners = []
let actions = {}

export const useStore = (shouldListen = true) => {
   const [_, setGlobalState] = useState(globalState)

   const dispatch = (actionId, payload) => {
      const newState = actions[actionId](globalState, payload)
      globalState = { ...globalState, ...newState }

      for (const listener of listeners) {
         listener(globalState)
      }
   }

   useEffect(() => {
      if (shouldListen) {
         listeners.push(setGlobalState)
      }
      return () => {
         if (shouldListen) {
            listeners = listeners.filter(li => li !== setGlobalState)
         }
      }
   }, [setGlobalState, shouldListen])

   return [globalState, dispatch]
}

export const initStore = (userActions, initState) => {
   if (initState) {
      globalState = { ...globalState, ...initState }
   }

   actions = { ...actions, ...userActions }
}
