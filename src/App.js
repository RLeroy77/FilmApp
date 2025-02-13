import React from "react";
import { Route, Routes } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";
import { WishlistProvider } from "./context/WishlistContext";
import NavigationBar from "./components/Navbar"; 
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import MoviesApi from "./pages/MoviesApi"; 

const App = () => {
  return (
    <MovieProvider>
      <WishlistProvider>
        <NavigationBar /> 
        <div className="mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/movies" element={<MoviesApi />} />{" "}
          </Routes>
        </div>
      </WishlistProvider>
    </MovieProvider>
  );
};

export default App;
