import React from 'react'

import "./noFavorites.css";

//This component will be displayed if the user has no favorites cities
const NoFavorites = () => {
    return (
      <div className="no-favorites">
        <h1>No Favorites Yet</h1>
      </div>
    );
}

export default NoFavorites
