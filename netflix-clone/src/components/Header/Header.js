// import React from 'react'
// import'./header.css'
// import NetflixLogo from '../../assets/images/Netflix-Logo.png'
// import SearchIcon from '@mui/icons-material/Search';
// import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import AccountBoxIcon from '@mui/icons-material/AccountBox';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// const Header = () => {
//   return (
//     <div className='header_outer_container'>
//       <div className='header-container'>
//           <div className='header-left'>
//             <ul>
//                 <li><img src={NetflixLogo} alt="Netflix Logo"  width='100'/></li>
//                 <li>Netflix</li>
//                 <li>Home</li>
//                 <li>TV Shows</li>
//                 <li>Movies</li>
//                 <li>Latest</li>
//                 <li>My List</li>
//                 <li>Browser By Language</li>
//                 <li>Watch Later</li>

//             </ul>
//           </div>
//           <div className='header_right'>
//              <ul>
//                 <li><SearchIcon /></li>
//                 <li><NotificationsNoneIcon /></li>
//                 <li><AccountBoxIcon /></li>
//                 <li><ArrowDropDownIcon /></li>
//              </ul>
//            </div>
//       </div>
//     </div>
//   )
// }

// export default Header



import React, { useEffect, useState } from "react";
import "./header.css";
import NetflixLogo from "../../assets/images/Netflix-Logo.png";

import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import { Link, useNavigate } from "react-router-dom";
// import axios from "./../../../utils/axios";
import axios from "../../utils/axios";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  // 🎯 Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔍 SEARCH FUNCTION (REAL API)
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 2) {
      try {
        const request = await axios.get(
          `/search/movie?query=${value}`
        );

        // 👉 send results to search page
        navigate("/search", { state: request.data.results });

      } catch (error) {
        console.log("Search error:", error);
      }
    }
  };

  return (
    <div className={`header_outer_container ${isScrolled ? "header_black" : ""}`}>
      <div className="header-container">

        {/* LEFT */}
        <div className="header-left">
          <ul>
            <li>
              <img src={NetflixLogo} alt="Netflix Logo" width="100" />
            </li>

            <li><Link to="/">Home</Link></li>
            <li><Link to="/tv">TV Shows</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/latest">Latest</Link></li>
            <li><Link to="/mylist">My List</Link></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div className="header_right">
          <ul>

            {/* SEARCH */}
            <li onClick={() => setShowSearch(!showSearch)}>
              <SearchIcon />
            </li>

            {showSearch && (
              <input
                className="search_input"
                type="text"
                placeholder="Search movies..."
                value={searchTerm}
                onChange={handleSearch}
              />
            )}

            <li>
              <NotificationsNoneIcon />
            </li>

            {/* PROFILE */}
            <li
              className="profile_menu"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <AccountBoxIcon />
              <ArrowDropDownIcon />

              {showDropdown && (
                <div className="dropdown">
                  <p>Profile</p>
                  <p>Settings</p>
                  <p>Logout</p>
                </div>
              )}
            </li>

          </ul>
        </div>

      </div>
    </div>
  );
};

export default Header;