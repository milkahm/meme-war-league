// VoteForm.jsx
import React from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const VoteForm = ({ onSubmit, userId }) => {
  const location = useLocation();
  const { battleId, options } = location.state || {}; // Access the state passed from BattleCard

  const validationSchema = Yup.object().shape({
    user_id: Yup.number().required("User  ID is required"),
    chosen_meme_id: Yup.number().required("Choose a meme to vote for")
  });

  return (
    <Formik
      initialValues={{ user_id: userId || "", chosen_meme_id: "" }} // Populate user_id if available
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        if (typeof onSubmit === 'function') {
          onSubmit({ ...values, battle_id: battleId }) // Call the onSubmit function
            .then(() => {
              resetForm(); // Reset the form after successful submission
            })
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
            <label>User ID:</label>
            <Field name="user_id" type="number" />
            <ErrorMessage name="user_id" component="div" className="error" />
          </div>

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
