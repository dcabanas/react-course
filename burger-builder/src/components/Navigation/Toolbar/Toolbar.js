import classes from './Toolbar.module.css'
import Logo from '../../../components/Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const Toolbar = props => (
   <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />
      <div className={classes.Logo}>
         <Logo />
      </div>
      <nav className={classes.DesktopOnly}>
         <NavigationItems isAuthenticated={props.authState} />
      </nav>
   </header>
)

export default Toolbar
