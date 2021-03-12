import React from 'react'

//WE INITIALIZE THE CONTEXT WITH ANYTHING WE WANT
//THIS DEFAULT VALUE FOR CONTEXT IS ONLY USED
//WHEN NOTHING IS PASSED TO THE VALUE PROP
//IN THE PROVIDER
const authContext = React.createContext({
   authenticated: false,
   login: () => {},
})

export default authContext
