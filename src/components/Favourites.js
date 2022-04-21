import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

function Favourites() {
  let genreids = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };
  const [currGenre, setCurrGenre] = useState("All Genres");
  const [favourites, setFavourites] = useState([]);
  const [genres, setGenre] = useState([]);
  const [rating, setRating] = useState(0);
  const [popularity, setPopularity] = useState(0);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState(5);
  const [curPage, setCurPage] = useState(1);

  //for local storage
  useEffect(() => {
    let oldFav = localStorage.getItem("imdb");
    oldFav = JSON.parse(oldFav) || [];
    setFavourites([...oldFav]);
  }, []);

  //for selecting genre
  useEffect(() => {
    let temp = favourites.map((movie) => genreids[movie.genre_ids[0]]);
    temp = new Set(temp);
    setGenre(["All Genres", ...temp]);
  }, [favourites]);

  const removeMovies = (movie) => {
    let filteredMovies = favourites.filter((m) => m.id !== movie.id);
    setFavourites(filteredMovies);
    localStorage.setItem("imdb", JSON.stringify(filteredMovies));
  };

  let filteredMovies = [];

  filteredMovies =
    currGenre === "All Genres"
      ? favourites
      : favourites.filter(
          (movie) => genreids[movie.genre_ids[0]] === currGenre
        );

  //Sorting by rating
  if (rating === 1) {
    filteredMovies = filteredMovies.sort((objA, objB) => {
      return objA.vote_average - objB.vote_average;
    });
  } else if (rating === -1) {
    filteredMovies = filteredMovies.sort((objA, objB) => {
      return objB.vote_average - objA.vote_average;
    });
  }

  //Sorting by popularity
  if (popularity === 1) {
    filteredMovies = filteredMovies.sort((objA, objB) => {
      return objA.popularity - objB.popularity;
    });
  } else if (popularity === -1) {
    filteredMovies = filteredMovies.sort((objA, objB) => {
      return objB.popularity - objA.popularity;
    });
  }

  //Searching
  filteredMovies = filteredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  let maxPage = Math.ceil(filteredMovies.length / rows);
  let si = (curPage - 1) * rows;
  let ei = Number(si) + Number(rows);

  filteredMovies = filteredMovies.slice(si, ei);

  const previousPageHandler = () => {
    if (curPage > 1) {
      setCurPage(curPage - 1);
    }
  };
  const nextPageHandler = () => {
     if (curPage < maxPage) {
        setCurPage(curPage + 1);
     }
  };

  return (
    <>
      <div className=" flex justify-center mt-4 p-3 flex-wrap">
        {genres.map((genre) => {
          return (
            <button
              className={`${
                currGenre === genre
                  ? " bg-cyan-500"
                  : " bg-slate-500 hover:bg-cyan-500"
              } p-2 text-lg font-bold rounded-xl text-white m-2`}
              onClick={() => setCurrGenre(genre)}
            >
              {genre}
            </button>
          );
        })}
      </div>
      <div className=" text-center">
        <input
          type="text"
          placeholder="Search"
          className=" border-2 text-center p-2 m-2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>
        <input
          type="number"
          placeholder="rows"
          className=" border-2 text-center p-2 m-2"
          value={rows}
          onChange={(e) => setRows(e.target.value)}
        ></input>
      </div>
      <div className="flex flex-col m-4">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 min-w-full">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex">
                        <img
                          src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                          alt="something"
                          className="mr-2 cursor-pointer"
                          onClick={() => {
                            setPopularity(0);
                            setRating(-1);
                          }}
                        />
                        Rating
                        <img
                          src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                          alt="something"
                          onClick={() => {
                            setPopularity(0);
                            setRating(1);
                          }}
                          className="ml-2 mr-2"
                        />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <div className="flex">
                        <img
                          src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-up-arrows-those-icons-lineal-those-icons-3.png"
                          alt="something"
                          onClick={() => {
                            setRating(0);
                            setPopularity(-1);
                          }}
                          className="mr-2"
                        />
                        Popularity
                        <img
                          src="https://img.icons8.com/external-those-icons-lineal-those-icons/24/000000/external-down-arrows-those-icons-lineal-those-icons-4.png"
                          className="ml-2 mr-2"
                          alt="something"
                          onClick={() => {
                            setRating(0);
                            setPopularity(1);
                          }}
                        />
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Genre
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredMovies.map((movie) => (
                    <tr key={movie.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 md:h-[100px] md:w-[180px]">
                            <img
                              className="hidden md:block md:h-[100px] md:w-[180px]"
                              src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm  text-gray-900 font-bold">
                              {movie.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {movie.vote_average}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {movie.popularity}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {genreids[movie.genre_ids[0]]}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center">
                        <button
                          href="#"
                          className="text-red-600 hover:text-red-900"
                          onClick={() => removeMovies(movie)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        page={curPage}
        onPrevious={previousPageHandler}
        onNext={nextPageHandler}
      />
    </>
  );
}

export default Favourites;
