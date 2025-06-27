import React from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 import navigate
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function Register() {
  const navigate = useNavigate(); // 👈 use hook

  const schema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password too short").required("Password is required")
  });

  const handleSubmit = (values, { resetForm }) => {
    fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          console.log("Registered:", data);
          resetForm();
          navigate('/memes'); // 👈 redirect after successful registration
        }
      })
      .catch(err => {
        console.error("Register error:", err);
        alert("Registration failed");
      });
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik
        initialValues={{ username: '', email: '', password: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>Username:</label>
          <Field name="username" />
          <ErrorMessage name="username" component="div" className="error" />

          <label>Email:</label>
          <Field name="email" />
          <ErrorMessage name="email" component="div" className="error" />

          <label>Password:</label>
          <Field type="password" name="password" />
          <ErrorMessage name="password" component="div" className="error" />

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Register;
