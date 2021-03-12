import React, { Component } from 'react'
import { connect } from 'react-redux'
import Auxiliary from '../Auxiliary/Auxiliary'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component {
   state = {
      showSideDrawer: true,
   }

   sideDrawerClosedHandler = () => this.setState({ showSideDrawer: false })

   sideDrawerToggleHandler = () =>
      this.setState((prevState, _) => {
         return {
            showSideDrawer: !prevState.showSideDrawer,
         }
      })

   render() {
      return (
         <Auxiliary>
            <Toolbar
               authState={this.props.isAuth}
               drawerToggleClicked={this.sideDrawerToggleHandler}
            />
            <SideDrawer
               authState={this.props.isAuth}
               open={this.state.showSideDrawer}
               closed={this.sideDrawerClosedHandler}
            />
            <main className={classes.Content}>{this.props.children}</main>
         </Auxiliary>
      )
   }
}

const mapStateToProps = state => ({
   isAuth: state.auth.token !== null,
})

export default connect(mapStateToProps)(Layout)
