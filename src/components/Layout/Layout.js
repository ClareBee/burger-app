import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const layout = ( props ) => (
  <Aux>
    <ToolBar />
    <SideDrawer />
    <main className={classes.Content}>
    {/* renders the component we wrap with this layout */}
      {props.children}
    </main>
  </Aux>
);

export default layout;
