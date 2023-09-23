import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Country, State, City } from "country-state-city";
import { Link } from 'react-router-dom';
import RatingStars from "react-rating-stars-component";

import {
  FaFacebook,
  FaTwitter,
  FaDollarSign,
  FaGraduationCap,
  FaUserTie,
  FaMapMarkerAlt,
  FaLinkedin,
  FaInstagram,
  FaBookmark,
} from "react-icons/fa";


export default function SearchLawyer() {


  // --------------------------------------------------------
  const [allProfileData, setAllProfileData] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(true);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  };

  const getAllProfile = async () => {

    try {
      const response = await axios.get('http://localhost:8080/advanceProfile');
      setAllProfileData(response.data.A_Data);
      console.log(response.data.A_Data);
    } catch (error) {
      console.error(error);
    }

  };

  const handleRefresh = () => {
    setShouldRefresh(!shouldRefresh);
  };

  useEffect(() => {
    if (shouldRefresh) {
      getAllProfile();
      setShouldRefresh(false);
    }
  }, [shouldRefresh]);

  // --------------------------------------------------

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    experience: "",
    rating: "",
    reviews: "",
    price: "",
    country: "",
    state: "",
    city: "",
  });
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [bookmarkedLawyers, setBookmarkedLawyers] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [stateData, setStateData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry(selectedCountry);
      setStateData(states);
    }
  }, [selectedCountry]);

  const updateSuggestions = (query) => {
    const filtered = allProfileData.filter((lawyer) => {
      return (
        lawyer.name.toLowerCase().includes(query.toLowerCase()) &&
        lawyer.title.toLowerCase().includes(query.toLowerCase()) &&
        lawyer.position.toLowerCase().includes(query.toLowerCase())
      );
    });

    setSuggestions(filtered);
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    updateSuggestions(query);
  };
  const handleCountryChange = (value) => {
    console.log(value);
    setSelectedCountry('IN');
  };

  const handleStateChange = (value) => {
    setSelectedState(value);
  };

  const handleCityChange = (value) => {
    setSelectedCity(value);
    setSearchQuery(value);
  };
  const handleBookmarkToggle = (lawyerId) => {
    if (bookmarkedLawyers.includes(lawyerId)) {
      const updatedBookmarks = bookmarkedLawyers.filter(
        (id) => id !== lawyerId
      );
      setBookmarkedLawyers(updatedBookmarks);
    } else {
      const updatedBookmarks = [...bookmarkedLawyers, lawyerId];
      setBookmarkedLawyers(updatedBookmarks);
    }
  };

  // };
  const handleSortChange = (e) => {
    if (e.target.value === sortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortDirection("asc");
    }
    setSortBy(e.target.value);
  };

  const getSortIcon = (criteria) => {
    if (sortBy === criteria) {
      return sortDirection === "asc" ? "↑↓ " : "↓↑";
    }
    return "";
  };

  const filteredLawyers = allProfileData.filter((lawyer) => {
      const queryWords = searchQuery.toLowerCase().split(" ");

      return (
        queryWords.every((word) =>
          Object.values(lawyer).some(
            (value) =>
              typeof value === "string" && value.toLowerCase().includes(word)
          )
        ) &&
        (!filters.experience ||
          lawyer.description?.experience?.year?.$numberInt >=
          filters.experience) &&
        (!filters.rating || lawyer.T_rating >= filters.rating) &&
        (!filters.reviews || lawyer.review?.length >= filters.reviews) &&
        (!filters.selectedCity ||
          !lawyer.city ||
          lawyer.city.toLowerCase() === filters.selectedCity.toLowerCase())
      );
    })
    .sort((a, b) => {
      if (sortBy === "experience") {
        const experienceDiff =
          (b.description?.experience?.year?.$numberInt || 0) -
          (a.description?.experience?.year?.$numberInt || 0);
        return sortDirection === "asc" ? experienceDiff : -experienceDiff;
      } else if (sortBy === "T_rating") {
        const ratingDiff =
          parseFloat(b.T_rating || 0) - parseFloat(a.T_rating || 0);
        // const ratingB = parseFloat(b.T_rating || 0);
        return sortDirection === "asc" ? ratingDiff : -ratingDiff;
      } else if (sortBy === "price") {
        const priceDiff = (b.price || 0) - (a.price || 0);
        return sortDirection === "asc" ? priceDiff : -priceDiff;
      }
      return 0;
    });

  return (
    <div>

      <div className="bg-blue-100` min-h-screen ">
        <div className="bg-blue-900  mb-5  ">
          <div className="flex  justify-center items-center ">
            <div className="mb-4 ">
              <div className="relative p-5 text-white  ">
                <div className="space-y-2  ">
                  <div className=" mt-20 space-x-4 flex flex-row ">


                    <select
                      className=" rounded hover:transform hover:-translate-y-2 transition-transform hover:bg-blue-700  p-2  w-1/3 font-semibold bg-blue-500 text-white"
                      value={selectedState}
                      onChange={(e) => handleStateChange(e.target.value)}
                    >
                      <option value="">Select state</option>
                      {stateData.map((state) => (
                        <option key={state.isoCode} value={state.isoCode}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    {/* </div> */}

                    {/* <div className="mb-4 "> */}

                    <select
                      className=" rounded p-2 w-1/3 hover:transform hover:-translate-y-2 transition-transform hover:bg-blue-700 font-semibold bg-blue-500 text-white "
                      value={selectedCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                    >
                      <option value="">Select city</option>
                      {City.getCitiesOfState(selectedCountry, selectedState).map(
                        (city) => (
                          <option key={city.name} value={city.name}>
                            {city.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex-1 p-8  ">
              <input
                type="text "
                placeholder=" Search here "
                className="p-2 my-5 justify-center items-center border font-semibold rounded-full w-1/2   bg- opacity-40  "
                value={searchQuery}
                onChange={handleSearchChange}
              // onChange={(e) => setSearchQuery(e.target.value)}
              />
              {suggestions.length > 0 && (
                <div className="absolute z-10 bg-white  w-1/2 rounded-md shadow-md">
                  <ul>
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => {
                          setSearchQuery(suggestion.name) || setSuggestions([]);
                        }}
                      >
                        {suggestion.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="mt-20 flex items-center space-x-4 text-white p-4">
              <button
                className={`bg-blue-500 hover:transform hover:-translate-y-2 transition-transform font-semibold text-white px-4 py-2 hover:bg-blue-700  rounded-md ${sortBy === "experience" ? "bg-blue-600" : ""
                  }`}
                onClick={() => {
                  handleSortChange({ target: { value: "experience" } });
                  handleSortDirectionToggle();
                }}
              >
                Sort by Experience {getSortIcon("experience")}
              </button>
              <button
                className={`bg-blue-500 hover:transform hover:-translate-y-2 transition-transform font-semibold text-white px-4 py-2 hover:bg-blue-700  rounded-md ${sortBy === "rating" ? "bg-blue-600" : ""
                  }`}
                onClick={() => {
                  handleSortChange({ target: { value: "T_rating" } });
                  handleSortDirectionToggle();
                }}
              >
                Sort by Ratings {getSortIcon("T_rating")}
              </button>
              <button
                className={`bg-blue-500  hover:transform hover:-translate-y-2 transition-transform font-semibold text-white px-4 hover:bg-blue-700  py-2 rounded-md ${sortBy === "price" ? "bg-blue-600" : ""
                  }`}
                onClick={() => {
                  handleSortChange({ target: { value: "price" } });
                  handleSortDirectionToggle();
                }}
              >
                Sort by Price {getSortIcon("price")}
              </button>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {filteredLawyers.map((lawyer, index) => (
            <div
              key={index}
              className="  bg-white-100 hover:transform hover:-translate-y-2 transition-transform rounded-md shadow-md  hover:shadow-xl cursor-pointer  "
            >
              
              <div className="relative flex justify-center items-center  bg-blue-400">
                {lawyer.photo && (
                  <div className="w-1/2 h-full flex items-center justify-center">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white-800 mt-5 ">
                      <img
                        src={lawyer.photo}
                        alt={`${lawyer.name}'s Photo`}
                        className="w-full  h-full  object-cover rounded-md mb-4"
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="text-center  h-1/2 flex flex-col justify-center">
                <h2 className="text-lg font-serif font-extrabold">
                  {lawyer.name || "No Name"}
                </h2>
                {/* <p className="text-gray-600 font-semibold">{lawyer.title || 'No title'}</p> */}
                {/* <p className="text-gray-600 font-semibold">{lawyer.position || 'No Position'}</p> */}

                <div className="flex items-center justify-center text-gray-600 font-semibold ">
                  <FaUserTie className="mr-2" />
                  {lawyer.title || "No title"}
                </div>
                <div className=" flex items-center justify-center text-gray-600 font-semibold">
                  <FaGraduationCap className="mr-2" />
                  {lawyer.position || "No position"}
                </div>
                {/* <p className="text-gray-600 font-semibold">{lawyer.city || 'No City'}</p> */}
                <div className="flex items-center justify-center text-gray-600 font-semibold">
                  <FaMapMarkerAlt className="mr-2" />
                  {lawyer.city || "No City"}
                </div>
                {/* <p className="text-gray-600 font-semibold">Hourly Rate: ${lawyer.hourlyRate || 'N/A'}</p> */}

                <div className="flex justify-center items-center text-yellow-400">
                  <RatingStars
                    count={5}
                    size={25}
                    value={parseFloat(lawyer.T_rating) || 0}
                    edit={false}
                  />
                </div>
                {/* <p className="text-gray-600 font-semibold ">{lawyer.price || 'No title'}</p> */}
                {/* <div className="flex items-center justify-center text-gray-600 font-semibold">
    <FaDollarSign className="mr-2" />
    {lawyer.price || 'No Price'}
  </div> */}
              </div>
              <div className=" hover:transform hover:-translate-y-2 transition-transform flex justify-center space-x-2 h-2 ">
                {lawyer.socialMedia && lawyer.socialMedia.facebook && (
                  <a
                    href={lawyer.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaFacebook size={24} color="#1877f2" />
                  </a>
                )}
                {lawyer.socialMedia && lawyer.socialMedia.twitter && (
                  <a
                    href={lawyer.socialMedia.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaTwitter size={24} color="#1da1f2" />
                  </a>
                )}
                {lawyer.socialMedia && lawyer.socialMedia.linkedin && (
                  <a
                    href={lawyer.socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedin size={24} color="#2867B2" />
                  </a>
                )}
                {lawyer.socialMedia && lawyer.socialMedia.instagram && (
                  <a
                    href={lawyer.socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaInstagram size={24} color="#E4405F" />
                  </a>
                )}
              </div>

              <div className="mt-1  ">
                <Link to={`/review/${lawyer.ID._id}`}>review</Link>
                <button className="bg-blue-900 hover:bg-blue-600 hover:transform hover:-translate-y-2 transition-transform text-white font-semibold font-serif  px-4 py-2 mb-20 mr-2  rounded-full float-right">
                  Connect
                </button>
                <FaBookmark
                  size={24}
                  color={
                    bookmarkedLawyers.includes(lawyer._id) ? "#1f618d" : "#999"
                  } // Set the color based on bookmark status
                  onClick={() => handleBookmarkToggle(lawyer._id)} // Toggle bookmark status on click
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}