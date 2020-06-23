import React from 'react';
import { Switch } from 'react-router-dom';

import { Dashboard, SignIn, SignUp } from '../pages';
import Route from './Route';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/signup" component={SignUp} />

      <Route isPrivate path="/dashboard" component={Dashboard} />
    </Switch>
  );
};

export default Routes;
