import React from "react";
import Logo from "../logo.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="pl-8 my-4 flex space-x-8 items-center border-black border">
        <img
          src={Logo}
          alt="movie-logo"
          className="h-14 w-[40px] md:w-[60px]"
        />
        <Link to='/' className=" text-blue-500 font-bold text-xl md:text-3xl">
          Movies
        </Link>
        <Link to='/favourites' className=" text-blue-500 font-bold text-xl md:text-3xl">
          Favourites
        </Link>
      </div>
    </>
  );
}

export default Navbar;
