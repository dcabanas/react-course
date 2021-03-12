import React, { Component } from 'react'
//import { Link } from 'react-router-dom'
import axios from '../../../axios'
import Post from '../../../components/Post/Post'
import './Posts.css'
import { Route } from 'react-router-dom'
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
   state = {
      posts: [],
   }

   transformData = response => {
      const posts = response.data.slice(0, 4)
      const updatedPosts = posts.map(post => {
         return { ...post, author: 'Max' }
      })

      return updatedPosts
   }

   componentDidMount = () => {
      axios
         .get('/posts')
         .then(response => {
            this.setState({ posts: this.transformData(response) })
         })
         .catch(error => {
            console.log(error.message)
            //this.setState({ error: true })
         })
   }

   //postSelectedHandler = id => this.setState({ selectedPostID: id })

   postSelectedHandler = id => {
      this.props.history.push(`/posts/${id}`)
      //this.props.history.push({ pathname: '/posts/' + id })
   }

   render() {
      let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>
      if (!this.state.error) {
         posts = this.state.posts.map(post => (
            //<Link key={post.id} to={`/posts/${post.id}`}>
            <Post
               key={post.id}
               title={post.title}
               author={post.author}
               clicked={() => this.postSelectedHandler(post.id)}
            />
            //</Link>
         ))
      }

      /*const selectedPost = this.state.posts.find(
         post => post.id === this.state.selectedPostID
      )*/

      return (
         <div>
            <section className='Posts'>{posts}</section>
            <Route
               path={`${this.props.match.url}/:id`}
               exact
               component={FullPost}
            />
         </div>
      )
   }
}

export default Posts
