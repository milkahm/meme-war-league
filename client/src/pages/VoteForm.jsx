// VoteForm.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const VoteForm = ({ onSubmit }) => {
  const location = useLocation();
  const { battleId, options } = location.state || {};

  const validationSchema = Yup.object().shape({
    chosen_meme_id: Yup.number().required("Choose a meme to vote for")
  });

  return (
    <Formik
      initialValues={{ chosen_meme_id: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        if (typeof onSubmit === 'function') {
          onSubmit({
            ...values,
            chosen_meme_id: parseInt(values.chosen_meme_id),
            battle_id: battleId
          })
            .then(() => resetForm())
            .catch((error) => {
              console.error("Vote submission failed:", error);
              alert("Failed to submit vote. Please try again.");
            });
        } else {
          console.error('onSubmit is not a function');
        }
      }}
    >
      {() => (
        <Form>
          <div>
            <label>Choose Meme:</label>
            <Field as="select" name="chosen_meme_id">
              <option value="">-- Select Meme --</option>
              {options.map((entry) => (
                <option key={entry.meme_id} value={entry.meme_id}>
                  {entry.title}
                </option>
              ))}
            </Field>
            <ErrorMessage name="chosen_meme_id" component="div" className="error" />
          </div>
          <button type="submit">Submit Vote</button>
        </Form>
      )}
    </Formik>
  );
};

export default VoteForm;
