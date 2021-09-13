import React, { useState } from "react";

import NoFavorites from "./noFavorites/NoFavorites";
import Favorite from "./favorite/Favorite";
import ClearFavoritesPopup from "./clearFavoritesPopup/ClearFavoritesPopup";

import "./favorites.css";

const Favorites = () => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites"))
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const clearFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify([]));
    setFavorites([]);
    setModalIsOpen(true);
  };

  //Dispaly NoFavorites components in case there are no favorites 
  if (!favorites || favorites.length === 0) return <NoFavorites />;

  return (
    <div className="favorites-container">
      <ClearFavoritesPopup
        modalIsOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        clearFavorites={clearFavorites}
      />
      <button
        className="btn btn-primary clear-favorites"
        onClick={() => setModalIsOpen(true)}
      >
        Clear Favorites
      </button>
      <h1>Favorites</h1>
      <div className="favorites">
        {favorites.map((favorite) => (
          <Favorite
            favorite={favorite}
            favorites={favorites}
            setFavorites={setFavorites}
            key={favorite.key}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
