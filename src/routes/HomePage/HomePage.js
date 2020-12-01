import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = ({ api_key, login }) => {
  return (
    <div>
      <h1>Bink web home page</h1>
      { api_key ? (
        <Link to='/payment-cards'>View my payment cards</Link>
      ) : (
        <button onClick={ () => login('bink_web_user_1@bink.com', 'BinkWeb01') }>Login</button>
      ) }
    </div>
  );
}

export default HomePage;
