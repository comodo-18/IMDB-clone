import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

import { Oval } from "react-loader-spinner";

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hover, setHover] = useState("");
  const [favourites, setFavourites] = useState([]);
  const previousPageHandler = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };
  const nextPageHandler = () => {
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    let oldFav=localStorage.getItem("imdb");
    oldFav=JSON.parse(oldFav) || [];
    setFavourites([...oldFav])
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${props.api}&page=${pageNumber}`
      )
      .then((res) => {
        setMovies(res.data.results);
      });
  }, [pageNumber,props.api]);

  const addNewMovies = (movie) => {
    let newMovie = [...favourites, movie];
    setFavourites([...newMovie]);
    localStorage.setItem('imdb',JSON.stringify(newMovie))
  };

  const removeMovies = (movie) => {
   let filteredMovies= favourites.filter((m) => m.id !== movie.id);
   setFavourites(filteredMovies)
   localStorage.setItem('imdb',JSON.stringify(filteredMovies))
  };

  return (
    <>
      <div className=" mb-8">
        <div className=" m-8 text-center font-bold text-2xl">Trending</div>
        {movies.length === 0 ? (
          <div className=" flex justify-center">
            <Oval height="100" width="100" color="grey" ariaLabel="loading" />
          </div>
        ) : (
          <div className=" flex flex-wrap justify-center">
            {movies.map((movie) => {
              return (
                <div
                  className={`bg-[url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})] h-[20vh] w-[100px] md:h-[25vh] md:w-[250px] bg-center bg-cover flex items-end justify-center rounded-xl m-4 hover:scale-105 ease-out duration-300 relative`}
                  onMouseEnter={() => {
                    setHover(movie.id);
                  }}
                  onMouseLeave={() => {
                    setHover("");
                  }}
                  key={movie.id}
                >
                  {hover === movie.id && (
                    <>
                      (
                      {!favourites.find((m) => m.id === movie.id) ? (
                        <div
                          className="absolute top-2 right-2 text-xl p-2 bg-slate-800 rounded-xl cursor-pointer"
                          onClick={() => addNewMovies(movie)}
                        >
                          🤍
                        </div>
                      ) : (
                        <div
                          className="absolute top-2 right-2 text-xl p-2 bg-slate-800 rounded-xl cursor-pointer"
                          onClick={() => removeMovies(movie)}
                        >
                          ❤️
                        </div>
                      )}
                      )
                    </>
                  )}

                  <div className=" w-full bg-black text-white text-xl text-center rounded-b-xl py-2">
                    {movie.original_title}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <Pagination
        page={pageNumber}
        onNext={nextPageHandler}
        onPrevious={previousPageHandler}
      />
    </>
  );
}

export default Movies;
