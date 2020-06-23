import React from 'react';
import {
  Route as BaseRoute,
  RouteProps as BaseRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks';

interface RouteProps extends BaseRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { signed } = useAuth();

  return (
    <BaseRoute
      {...rest}
      render={({ location }) => {
        if (isPrivate === signed) return <Component />;

        if (isPrivate && !signed)
          return <Redirect to={{ pathname: '/', state: { from: location } }} />;

        return (
          <Redirect
            to={{ pathname: '/dashboard', state: { from: location } }}
          />
        );
      }}
    />
  );
};

export default Route;
