import React, { useRef, useState } from "react";
import { useFirebase } from "react-redux-firebase";

const SignUp = ({history}) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const firebase = useFirebase();

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');

    if(passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setLoading(true);
      await firebase.createUser({
        email: event.target.email.value,
        password: event.target.password.value
      })
      history.push('/signin')
    } catch {
      setError('Failed to create an account');
    }
    setLoading(false);
  }
  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className='card-panel red darken-4'>{error}</div>}
        <div class='input-field col s12'>
          <input id='email' ref={emailRef} type='email' className='validate' required/>
          <label for='email'>Email</label>
        </div>
        <div class='input-field col s12'>
          <input id='password' ref={passwordRef} type='password' className='validate' required/>
          <label for='password'>Password</label>
        </div>
        <div class='input-field col s12'>
          <input id='passwordConfirm' ref={passwordConfirmRef} type='password' className='validate' required/>
          <label for='passwordConfirm'>Password</label>
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

export default SignUp;
