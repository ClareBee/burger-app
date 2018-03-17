import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
  state = {
    showSideDrawer: true
  }
  sideDrawerClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    })
  }
  render(){
    return(
      <Aux>
        <ToolBar />
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={classes.Content}>
        {/* renders the component we wrap with this layout */}
          {this.props.children}
        </main>
      </Aux>
    );
  }
}
export default Layout;
