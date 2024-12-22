import React, { useState } from 'react'
import PT from 'prop-types'

const initialFormValues = {
  username: '',
  password: '',
};

export default function LoginForm({ login }) {
  const [values, setValues] = useState(initialFormValues)
  const [errorMessage, setErrorMessage] = useState('');
  // ✨ where are my props? Destructure them here

  const onChange = (evt) => {
    const { id, value } = evt.target
    setValues({ ...values, [id]: value })
  };

  const onSubmit = async (evt) => {
    evt.preventDefault()
    // ✨ implement
    try {
      await login(values);
      setValues(initialFormValues);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Login failed. Please try again');
    }
  };

  const isDisabled = () => {
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
    const trimmedUsername = values.username.trim();
    const trimmedPassword = values.password.trim();
    return trimmedUsername.length < 3 || trimmedPassword.length < 8;
  };

  return (
    <form id="loginForm" onSubmit={onSubmit} aria-labelledby="login-form heading">
      <h2 id="login-form-heading">Login</h2>
      <label htmlFor="username">Username</label>
      <input
        maxLength={20}
        value={values.username}
        onChange={onChange}
        placeholder="Enter username"
        id="username"
        aria-describedby="username-error"
      />
      {values.username.trim().length > 0 && values.username.trim().length < 3 && (
        <p id="username-error" className="error-message">
          Username must be at least 3 characters.
        </p>
      )}
      <label htmlFor="password">Password</label>
      <input
        maxLength={20}
        type="password"
        value={values.password}
        onChange={onChange}
        placeholder="Enter password"
        id="password"
        aria-describedby="password-error"
      />
      {values.password.trim().length > 0 && values.password.trim().length < 8 && (<p id="password-error" className="error-message">Password must be at least 8 characters.</p>)}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button disabled={isDisabled()} id="submitCredentials" className={isDisabled() ? 'disabled-button' : 'active-button'} aria-disabled={isDisabled()}>Submit credentials</button>
    </form>
  );
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
}
