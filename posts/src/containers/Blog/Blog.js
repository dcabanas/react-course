import React, { Component, Suspense } from 'react'
import './Blog.css'
import Posts from './Posts/Posts'
import { Route, NavLink, Switch, Redirect } from 'react-router-dom'
//import NewPost from './NewPost/NewPost'
import asyncComponent from '../../hoc/asyncComponent'

//THE SPECIAL import() KEYWORD MEANS THAT WHAT
//WE ARE GOING TO IMPORT, WILL ONLY BE IMPORTED
//WHEN THE ARROW FUNCTION IS EXECUTED
const AsyncNewPost = asyncComponent(() => {
   return import('./NewPost/NewPost')
})

//SAME THING AS ABOVE BUT WITH REACT SUSPENSE
//WITHOUT AN EXTRA asyncComponent.js FILE
//....................................................
//const NewPost = React.lazy(() => './NewPost/NewPost')
//....................................................
//THEN, IN THE <Route/> WE CHANGE component={} to render={}
//AND DO THE FOLLOWING:
/*
render={() => (
   <Suspense fallback={<div>Loading...</div>}>
   <NewPost/>
   </Suspense>
)}
*/

class Blog extends Component {
   state = {
      auth: true,
   }
   render() {
      return (
         <div className='Blog'>
            <header>
               <nav>
                  <ul>
                     <li>
                        <NavLink
                           to='/posts'
                           exact
                           activeStyle={{
                              textDecoration: 'underline',
                              fontWeight: 'bold',
                           }}
                        >
                           Posts
                        </NavLink>
                     </li>
                     <li>
                        <NavLink
                           to={{
                              pathname: '/new-post',
                              hash: '#submit',
                              search: '?quick-submit=true',
                           }}
                           activeStyle={{
                              textDecoration: 'underline',
                              fontWeight: 'bold',
                           }}
                        >
                           New Post
                        </NavLink>
                     </li>
                  </ul>
               </nav>
            </header>
            {/*
            FIRST CASE SHOWS BOTH HOME AND HOME 2
            SECOND CASE SHOWS ONLY HOME 2
            <Route path='/' exact render={() => <h1>Home</h1>} />
            <Route path='/' render={() => <h1>Home 2</h1>} />
            */}
            <Switch>
               {this.state.auth ? (
                  <Route path='/new-post' component={AsyncNewPost} />
               ) : null}
               <Route path='/posts' component={Posts} />
               <Route render={() => <h1>Not found</h1>} />
               {/*<Redirect from='/' to='/posts' />*/}
            </Switch>
         </div>
      )
   }
}

export default Blog
