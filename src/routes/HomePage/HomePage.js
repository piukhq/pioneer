import React from 'react';

const HomePage = ({ api_key, login }) => {
  return (
    <div>
      <h1>Bink web home page</h1>
      { api_key ? (
        'logged in'
      ) : (
        <button onClick={ () => login('bink_web_user_1@bink.com', 'BinkWeb01') }>Login</button>
      ) }
    </div>
  );
}

export default HomePage;
