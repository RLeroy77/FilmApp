import React, { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  const addToWishlist = (movie) => {
    if (!wishlist.some((item) => item.id === movie.id)) {
      setWishlist((prevWishlist) => [...prevWishlist, movie]); 
    } else {
      alert("Ce film est déjà dans votre wishlist!");
    }
  };

  const removeFromWishlist = (movieId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== movieId)
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  return useContext(WishlistContext);
};
