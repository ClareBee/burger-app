import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './Layout.css';
import ToolBar from '../Navigation/ToolBar/ToolBar';

const layout = ( props ) => (
  <Aux>
    <ToolBar />
    <main className={classes.Content}>
    {/* renders the component we wrap with this layout */}
      {props.children}
    </main>
  </Aux>
);

export default layout;
