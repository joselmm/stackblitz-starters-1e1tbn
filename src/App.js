import React, { useState, useEffect } from 'react';
import './style.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
//pages
import LoginPage from './pages/auth/LoginPage.jsx';
import RegisterPage from './pages/auth/RegisterPage.jsx';
import HomePage from './pages/home/HomePage.jsx';
import TasksPage from './pages/tasks/TasksPage.jsx';

export default function App() {
  //set logged
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    setLogged(localStorage.getItem('tasks-logged') === 'true');
  }, []);

  //set users
  if (!localStorage.hasOwnProperty('tasks-users')) {
    localStorage.setItem('tasks-users', '[]');
  }

  const login = () => {
    localStorage.setItem('tasks-logged', 'true');
    setLogged(true);
  };

  const logout = () => {
    localStorage.getItem('tasks-logged', 'false');
    setLogged(false);
  };

  return (
    <div>
      <Router>
        <aside>
          <Link to="/">|| Home |</Link>
          <Link to="/tasks">| Tasks |</Link>
          <Link to="/register">| Register |</Link>
          {logged ? (
            <Link to="/logout">| Logout |</Link>
          ) : (
            <Link to="/login">| Login |</Link>
          )}
        </aside>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route
            exact
            path="/tasks"
            render={() => {
              if (!logged) alert('You must login first');
              return logged ? <TasksPage /> : <Redirect to="/login" />;
            }}
          />

          <Route exact path="/register" component={RegisterPage} />
          <Route
            exact
            path="/login"
            render={() => {
              return logged ? (
                <Redirect to="/tasks" />
              ) : (
                <LoginPage login={login} />
              );
            }}
          />
          <Route
            exact
            path="/logout"
            render={() => {
              logout();
              return <Redirect to="/" />;
            }}
          />
        </Switch>
      </Router>
    </div>
  );
}
