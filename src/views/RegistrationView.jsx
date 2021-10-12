import React from "react";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import { authOperations } from "../redux/auth";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 25) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length > 20) {
    errors.password = "Must be 20 characters or less";
  }

  if (!values.repeatPassword) {
    errors.repeatPassword = "Required";
  } else if (values.password !== values.repeatPassword) {
    errors.repeatPassword = "Must be equal to password";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

function RegisterView() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const dispatch = useDispatch();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  };

  const tooglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;

      case "email":
        setEmail(e.target.value);
        break;

      case "password":
        setPassword(e.target.value);
        break;

      case "repeatPassword":
        setRepeatPassword(e.target.value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = useCallback((values, { resetForm }) => {
    setTimeout(() => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(authOperations.registration(values));
      resetForm({ values: "" });
      // setSubmitting(false);
    }, 400);
  });

  return (
    <div style={{ border: "1px solid black" }}>
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
              id="name"
              name="name"
              label="Enter your name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />

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

            <TextField
              fullWidth
              id="repeatPassword"
              name="repeatPassword"
              label="Do you remeber the password you just wrote? Write it here too please."
              type={showPassword ? "text" : "password"}
              value={values.repeatPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.repeatPassword && Boolean(errors.repeatPassword)}
              helperText={touched.repeatPassword && errors.repeatPassword}
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

export default RegisterView;
