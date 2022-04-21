import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';

function Banner(props) {
  const [banner,setBanner]=useState({})
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${props.api}`
      )
      .then((res) => {
        setBanner(res.data.results[4]);
      });
  }, [props.api]);
  return (
    <>
    <div className={`bg-[url(https://image.tmdb.org/t/p/original${banner.backdrop_path})] h-[40vh] md:h-[60vh] bg-center bg-cover flex items-end justify-center `}>
    <div className=' p-6 text-xl md:text-4xl text-white bg-gray-900 bg-opacity-50 w-full text-center' >{banner.original_title}</div>
    
    </div>
    </>

  )
}

export default Banner