import React from 'react';
import { useFirebase } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

export default function SignOut() {
  const firebase = useFirebase();
  firebase.logout();
  return <Redirect to='/' />;
}
