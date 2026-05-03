






// import React, { useEffect, useState } from 'react';
// import "./row.css";
// // IMPORTANT: Point this to your local axios.js file
// // If it's in the same folder, use "./axios"
// // If it's in a utils folder, use "../../../utils/axios"
// import axios from "./../../../utils/axios"; 

// const Row = ({ title, fetchUrl, isLargeRow }) => {
//     const [movies, setMovie] = useState([]);
//     const base_url = "https://image.tmdb.org/t/p/original";

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 // Because we use the custom axios instance, 
//                 // this automatically calls https://api.themoviedb.org/3 + fetchUrl
//                 const request = await axios.get(fetchUrl);
//                 setMovie(request.data.results);
//                 return request;
//             } catch (error) {
//                 console.error("Row.js Fetch Error:", error);
//             }
//         }
//         fetchData();
//     }, [fetchUrl]);

//     return (
//         <div className="row">
//             <h2>{title}</h2>
//             <div className="row__posters">
//                 {movies?.map((movie) => (
//                     ((isLargeRow && movie.poster_path) ||
//                     (!isLargeRow && movie.backdrop_path)) && (
//                         <img
//                             key={movie.id}
//                             className={`row__poster ${isLargeRow && "row__posterLarge"}`}
//                             src={`${base_url}${
//                                 isLargeRow ? movie.poster_path : movie.backdrop_path
//                             }`}
//                             alt={movie.name || movie.title}
//                         />
//                     )
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Row;



import React, { useEffect, useState, useRef } from "react";
import "./row.css";
import axios from "./../../../utils/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Row = ({ title, fetchUrl, isLargeRow }) => {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    const rowRef = useRef();

    const base_url = "https://image.tmdb.org/t/p/original";

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
            } catch (error) {
                console.error("Row.js Fetch Error:", error);
            }
        }
        fetchData();
    }, [fetchUrl]);

    // 🎬 Trailer logic (Netflix style click)
    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(movie?.name || movie?.title || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };

    // ⬅️➡️ Scroll buttons
    const scroll = (direction) => {
        if (direction === "left") {
            rowRef.current.scrollLeft -= 500;
        } else {
            rowRef.current.scrollLeft += 500;
        }
    };

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__wrapper">
                {/* LEFT ARROW */}
                <button
                    className="row__arrow left"
                    onClick={() => scroll("left")}
                >
                    ◀
                </button>

                {/* MOVIES */}
                <div className="row__posters" ref={rowRef}>
                    {movies?.map((movie) => (
                        ((isLargeRow && movie.poster_path) ||
                            (!isLargeRow && movie.backdrop_path)) && (
                            <img
                                key={movie.id}
                                onClick={() => handleClick(movie)}
                                className={`row__poster ${
                                    isLargeRow && "row__posterLarge"
                                }`}
                                src={`${base_url}${
                                    isLargeRow
                                        ? movie.poster_path
                                        : movie.backdrop_path
                                }`}
                                alt={movie.name || movie.title}
                            />
                        )
                    ))}
                </div>

                {/* RIGHT ARROW */}
                <button
                    className="row__arrow right"
                    onClick={() => scroll("right")}
                >
                    ▶
                </button>
            </div>

            {/* 🎬 TRAILER PLAYER */}
            {trailerUrl && (
                <div className="row__trailer">
                    <YouTube videoId={trailerUrl} opts={opts} />
                </div>
            )}
        </div>
    );
};

export default Row;