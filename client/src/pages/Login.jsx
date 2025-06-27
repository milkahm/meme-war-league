import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Login() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null); // State for login error
  const [loading, setLoading] = useState(false); // State for loading

  const schema = Yup.object({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setLoading(true); // Set loading state to true
    fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setLoginError(data.error); // Set error message
        } else {
          console.log('Logged in:', data);
          localStorage.setItem('user_id', data.id); // Store user ID in local storage
          navigate('/memes'); // Redirect to /memes after login
        }
      })
      .catch((err) => {
        console.error('Login failed', err);
        setLoginError('An error occurred during login.'); // Set generic error message
      })
      .finally(() => {
        setSubmitting(false);
        setLoading(false); // Reset loading state
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {loginError && <div style={{ color: 'red' }}>{loginError}</div>} {/* Display error message */}
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <label>Username:</label>
            <Field name="username" />
            <ErrorMessage name="username" component="div" style={{ color: 'red' }} />

            <label>Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />

            <button type="submit" disabled={isSubmitting || loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
