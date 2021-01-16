import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated or if auth is not
// yet loaded
export default function PrivateRoute({ children, ...rest }) {
  const auth = useSelector((state) => state.firebase.auth);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !isEmpty(auth) ? (
          children
        ) : isLoaded(auth) ? (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: location },
            }}
          />
        ) : (
          <></>
        )
      }
    />
  );
}
