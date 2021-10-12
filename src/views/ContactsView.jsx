import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useCallback } from "react";
import { Formik } from "formik";
import { contactsOperations } from "../redux/contacts";
import ContactsList from "../components/ContactList";
import Filter from "../components/Filter";
import { contactsSelectors } from "../redux/contacts";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (
    !/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/i.test(
      values.name
    )
  ) {
    errors.name = "Invalid name";
  } else if (values.name.length > 25) {
    errors.name = "Must be 24 characters or less";
  }

  if (!values.number) {
    errors.number = "Required";
  } else if (
    !/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/i.test(
      values.number
    )
  ) {
    errors.number = "Invalid email address";
  }

  return errors;
};

function ContactsView() {
  const initialValues = {
    name: "",
    number: "",
  };

  const dispatch = useDispatch();
  const items = useSelector(contactsSelectors.getContacts);

  useEffect(() => {
    dispatch(contactsOperations.fetchAllContacts());
  }, [dispatch]);

  const handleSubmit = useCallback((values, { resetForm }) => {
    if (
      items.filter(
        ({ name }) => name.toLowerCase() === values.name.toLowerCase()
      ).length > 0
    ) {
      resetForm({ values: "" });
      return alert("You already got this contact in your list!");
    }
    dispatch(contactsOperations.addContact(values));
    resetForm({ values: "" });
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
          <form
            onSubmit={handleSubmit}
            style={{
              border: "1px solid black",
              padding: "5px 15px",
              marginBottom: "15px",
            }}
          >
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Enter a name of your contact"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              id="number"
              name="number"
              label="Type a number"
              type="text"
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.number && Boolean(errors.number)}
              helperText={touched.number && errors.number}
            />
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
              Add a contact
            </Button>
          </form>
        )}
      </Formik>

      <Filter />
      <ContactsList />
    </div>
  );
}

export default ContactsView;
