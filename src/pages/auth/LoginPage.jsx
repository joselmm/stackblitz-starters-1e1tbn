import React from 'react';
import { useHistory /* useLocation */ } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
const LoginPage = ({ login }) => {
  //constant and variables
  const history = useHistory();
  //const location = useLocation();

  //navigate function
  function navigate(options) {
    history.push(options);
  }

  //initial credentials
  const initialValues = {
    username: '',
    password: '',
  };

  //Yup schema
  const registerSchema = Yup.object().shape({
    username: Yup.string().required('username is required'),
    password: Yup.string().required('password is required'),
  });

  //on Submit

  async function onSubmit(values) {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    const users = JSON.parse(localStorage.getItem('tasks-users'));
    let alertMessage = "You haven't registered yet.";
    // unregistered

    if (
      users.some(
        (e) => e.username === values.username && e.password === values.password
      )
    ) {
      //test username and password are correct
      login();
      navigate({
        pathname: '/tasks',
      });

      return;
    } else if (
      users.some(
        (e) => e.username === values.username && e.password != values.password
      )
    ) {
      alertMessage = 'Incorrect password.';
      alert(alertMessage);
      return;
    } else {
      alert(alertMessage);
    }
  }
  return (
    <div>
      <h1>Login Page</h1>
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
                  {isSubmitting ? 'Ingresando...' : 'Ingresar'}
                </button>
                <div>
                  <button
                    style={{ marginTop: '10px' }}
                    onClick={() => navigate('/register')}
                  >
                    Registrate
                  </button>
                </div>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginPage;
