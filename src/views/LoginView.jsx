import React from "react";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import { useState, useCallback } from "react";
import { useFormik, Formik } from "formik";
import { useDispatch } from "react-redux";
import { authOperations } from "../redux/auth";

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

function LoginView() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const tooglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = useCallback((values, { resetForm }) => {
    setTimeout(() => {
      dispatch(authOperations.logIn(values));
      resetForm({ values: "" });
    }, 400);
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Enter your email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              id="password"
              name="password"
              label="Type a password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <button type="button" onClick={tooglePassword}>
              {values.showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
            <br />
            <br />

            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              disabled={
                isSubmitting ||
                !(
                  Object.keys(touched).length ===
                    Object.keys(initialValues).length &&
                  Object.keys(errors).length === 0
                )
              }
            >
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginView;
