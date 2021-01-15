import React, { useState } from 'react';
import { useFirebase } from 'react-redux-firebase';

const SignIn = ({ history }) => {
  const [loading, setLoading] = useState(false);
  const firebase = useFirebase();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      await firebase.login({
        email: event.target.email.value,
        password: event.target.password.value
      })
      history.push('/home')
    } catch(error) {
      console.log(error);
    }
    setLoading(false);
  }
  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div class='input-field col s12'>
          <input id='email' type='email' className='validate' />
          <label for='email'>Email</label>
        </div>
        <div class='input-field col s12'>
          <input id='password' type='password' className='validate' />
          <label for='password'>Password</label>
        </div>

        <button
          disabled={loading}
          class='btn waves-effect waves-light'
          type='submit'
          name='action'
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default SignIn;
