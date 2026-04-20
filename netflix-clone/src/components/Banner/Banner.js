import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios'; // Assuming you are using axios based on line 10
import requests from '../../utils/requests';
import "./banner.css";

const Banner = () => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        (async () => {
            try {
                const request = await axios.get(requests.fetchNetflixOriginals);
                console.log(request);
                
                // Selects one random movie from the results array
                setMovie(
                    request.data.results[
                        Math.floor(Math.random() * request.data.results.length)
                    ]
                );
            } catch (error) {
                console.log("error", error);
            }
        })();
    }, []);

    function truncate(str,n){
        return str?.length > n ? str.substr(0, n - 1) + "...": str;
    }

    return (
        <header 
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
                backgroundPosition: "center",
                
            }}
        >
            <div className="banner__contents">
                {/* Title */}
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                {/* Buttons */}
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>

                {/* Description */}
                <h1 className="banner__description">
                   {truncate(movie?.overview,150 )}
                </h1>
            </div>

            <div className="banner--fadeBottom" />
        </header>
    );
};

export default Banner;