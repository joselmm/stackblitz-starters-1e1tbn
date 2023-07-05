import React from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const RegisterPage = () => {
  //constant and variables
  const history = useHistory();

  //navigate function
  function navigate(pathname) {
    history.push(pathname);
  }

  //initial credentials
  const initialValues = {
    name: '',
    username: '',
    password: '',
  };

  //Yup schema
  const registerSchema = Yup.object().shape({
    name: Yup.string().required('name is required').matches(/^\S+$/, 'Name should be a single word'),
    username: Yup.string().matches(/^\S+$/, 'Username should be a single word')
      .min(7, 'username must contain at least 7 characters')
      .max(12, 'username must contain less than 12 characters')
      .required('username is required'),
    password: Yup.string()
      .min(8, 'password must contain at least 8 characters')
      .required('password is required'),
  });

  //on Submit

  async function onSubmit(values) {
    try {
      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
      const users = JSON.parse(localStorage.getItem('tasks-users'));

      const test = users.findIndex((e) => e.username === values.username) >= 0;
      //test ? username already exist
      if (test) {
        alert('Username already exist');
        return;
      }
      //test ? new username
      users.push(values);
      localStorage.setItem('tasks-users', JSON.stringify(users));
      alert('You have been registred');
      //go to /login
      navigate('/login');
    } catch (e) {
      console.error(e.message);
    }
  }

  return (
    <div>
      <h1>Register Page</h1>
      <Formik
        validationSchema={registerSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <div>
              <Form>
                <div>
                  <label htmlFor="name">Ingrese su nombre</label>
                  <div>
                    <Field required type="text" id="name" name="name" />
                    <ErrorMessage name="name" component="div" />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor="username">
                      Ingrese un nombre de usuario
                    </label>
                  </div>
                  <Field required type="text" id="username" name="username" />
                  <ErrorMessage name="username" component="div" />
                </div>
                <div>
                  <label htmlFor="password">Ingrese una contraseña</label>
                  <div>
                    <Field
                      required
                      type="password"
                      id="password"
                      name="password"
                    />
                    <ErrorMessage name="password" component="div" />
                  </div>
                </div>
                <button
                  style={{ marginTop: '10px' }}
                  disabled={isSubmitting}
                  type="submit"
                >
                  {isSubmitting ? 'Registrandote...' : 'Registrese'}
                </button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterPage;
