import axios from 'axios'
import React, { Component } from 'react'
//import axios from 'axios'

import './FullPost.css'

class FullPost extends Component {
   //EXAMPLE OF FETCHING DATA ON UPDATE LYFECICLE
   //WITHOUT CREATING INFINITE LOOP
   /*
   state = {
      loadedPost: null,
   }

   componentDidUpdate = () => {
      if (this.props.post !== undefined) {
         if (
            !this.state.loadedPost ||
            (this.state.loadedPost &&
               this.state.loadedPost.id !== this.props.id)
         ) {
            const id = this.props.post.id
            axios
               .get(`/posts/${id}`)
               .then(response => this.setState({ loadedPost: response.data }))
         }
      }
   }
   */

   state = {
      loadedPost: null,
   }

   loadData = () => {
      const id = this.props.match.params.id
      if (id) {
         if (
            !this.state.loadedPost ||
            (this.state.loadedPost && this.state.loadedPost.id !== +id)
         ) {
            axios
               .get(`/posts/${id}`)
               .then(response => this.setState({ loadedPost: response.data }))
         }
      }
   }

   componentDidMount = () => {
      this.loadData()
   }

   componentDidUpdate = () => {
      this.loadData()
   }

   delPostHandler = () => {
      const id = this.props.match.params.id
      axios.delete(`/posts/${id}`)
      //.then(response => console.log(response))
   }

   render() {
      let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>
      if (this.state.loadedPost) {
         post = (
            <div className='FullPost'>
               <h1>{this.state.loadedPost.title}</h1>
               <p>{this.state.loadedPost.body}</p>
               <div className='Edit'>
                  <button onClick={this.delPostHandler} className='Delete'>
                     Delete
                  </button>
               </div>
            </div>
         )
      }
      return post
   }
}

export default FullPost
