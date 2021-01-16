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
      setLoading(false);
    }
    
  }
  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className='input-field col s12'>
          <input id='email' type='email' className='validate' />
          <label htmlFor='email'>Email</label>
        </div>
        <div className='input-field col s12'>
          <input id='password' type='password' className='validate' />
          <label htmlFor='password'>Password</label>
        </div>

        <button
          disabled={loading}
          className='btn waves-effect waves-light'
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
