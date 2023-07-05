import React from 'react';
import React from 'react';
import { useHistory /* useLocation */ } from 'react-router-dom';

const HomePage = () => {
  //constant and variables 
  const history = useHistory();
  //const location = useLocation();

  //navigate function
  function navigate(options) {
    history.push(options);
  }

  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => navigate('/tasks')}>See my tasks</button>
    </div>
  );
};

export default HomePage;
