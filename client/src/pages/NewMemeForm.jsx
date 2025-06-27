import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const NewMemeForm = () => {
  const navigate = useNavigate();

  const schema = Yup.object({
    title: Yup.string().required('Title is required'),
    image_url: Yup.string().url('Must be a valid URL').required('Image URL is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    fetch('http://localhost:5000/memes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // ✅ include session cookie
      body: JSON.stringify(values), // ❌ no user_id
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit meme");
        return res.json();
      })
      .then(() => {
        alert('Meme submitted!');
        resetForm();
        navigate('/memes');
      })
      .catch((err) => {
        console.error(err);
        alert('You must be logged in to submit a meme.');
      });
  };

  return (
    <div>
      <h2>Submit a New Meme</h2>
      <Formik
        initialValues={{ title: '', image_url: '' }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <label>Title:</label>
          <Field name="title" />
          <ErrorMessage name="title" component="div" />

          <label>Image URL:</label>
          <Field name="image_url" />
          <ErrorMessage name="image_url" component="div" />

          <button type="submit">Submit Meme</button>
        </Form>
      </Formik>
    </div>
  );
};

export default NewMemeForm;
