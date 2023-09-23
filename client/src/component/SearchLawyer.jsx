import React, { useState, useEffect } from "react";
import { Country, State, City } from "country-state-city";
import "./pageLoader.css";
import bgOverlay from "../assets/overlay.jpg";
import RatingStars from "react-rating-stars-component";
import Mainprofile from "./Mainprofile";
import axios from "axios";
import ReactPaginate from "react-paginate";
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

function SearchLawyer() {
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
  const [suggestions, setSuggestions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("IN");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [stateData, setStateData] = useState([]);
  /*-------------------------------------------------------------------------------*/
  const [allProfileData, setAllProfileData] = useState([]);
  const [shouldRefresh, setShouldRefresh] = useState(true);

  const axiosConfig = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const [openProfile, setOpenProfile] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const getAllProfile = async () => {
    try {
      const response = await axios.get("http://localhost:8080/advanceProfile");
      setAllProfileData(response.data.A_Data);
      console.log("All data:", response.data.A_Data);
    } catch (error) {
      console.error(error);
    }
  };
  const [isLoading, setIsLoading] = useState(false);
  const getOneProfile = async (id) => {
    console.log("gettingData, ID:", id);
    setModalOpen(true);
    try {
      setIsLoading(true);
      const response = await axios.get(
        `http://localhost:8080/getProfile/${id}`,
        axiosConfig
      );
      console.log("data recieved:", response);
      setOpenProfile(response.data);
      console.log("props data ", openProfile);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
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

  /*-------------------------------------------------------------------------------*/
  useEffect(() => {
    if (selectedCountry) {
      const states = State.getStatesOfCountry("IN");
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
    setSelectedCountry("IN");
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

  const filteredLawyers = allProfileData
    .filter((lawyer) => {
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

  const itemsPerPage = 8;

  // Create state to track the current page
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the start and end indices for the current page
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the lawyers for the current page
  const currentLawyers = filteredLawyers.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  return (
    <div className="bg-blue-50 min-h-screen  ">
      <div
        className=" mb-5 py-10 flex flex-col justify-center"
        style={{ backgroundImage: `url(${bgOverlay})` }}
      >
        <div className="flex py-5 flex-col items-center justify-center  ">
          <div className="flex justify-start w-[70%] font-thin font-Oxygen text-white">
            <p className="px-5 text-3xl">
              Let's get{" "}
              <span className=" font-semibold italic">Started...</span>
            </p>
          </div>
          <input
            type="text "
            placeholder=" Search here "
            className="p-2 mt-3 justify-center items-center border font-semibold rounded-full w-[70%]  "
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
          <div className="flex justify-between items-center w-[70%]">
            <div className="">
              <div className="text-white  ">
                <div className="space-y-2  ">
                  <div className=" space-x-1 flex flex-row ">
                    {/* </div> */}

                    {/* <div className="flex-row "> */}

                    <select
                      className="rounded-md py-2 w-[110px] font-semibold text-black"
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
                      className=" rounded-md py-2 w-[110px] font-semibold text-black "
                      value={selectedCity}
                      onChange={(e) => handleCityChange(e.target.value)}
                    >
                      <option value="">Select city</option>
                      {City.getCitiesOfState(
                        selectedCountry,
                        selectedState
                      ).map((city) => (
                        <option key={city.name} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-white p-4">
              <p>Sort:</p>
              <button
                className={`font-semibold text-black px-4 py-2 bg-white rounded-full ${
                  sortBy === "experience" ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => {
                  handleSortChange({ target: { value: "experience" } });
                  handleSortDirectionToggle();
                }}
              >
                Experience {getSortIcon("experience")}
              </button>
              <button
                className={`font-semibold text-black px-4 py-2 bg-white rounded-full ${
                  sortBy === "experience" ? "bg-blue-600 text-white" : ""
                }`}
                onClick={() => {
                  handleSortChange({ target: { value: "T_rating" } });
                  handleSortDirectionToggle();
                }}
              >
                Ratings {getSortIcon("T_rating")}
              </button>
              <button
                className={`font-semibold text-black px-4 py-2 bg-white rounded-full ${
                  sortBy === "experience" ? "bg-blue-600 text-white" : ""
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
      </div>
      {filteredLawyers.length == 0 && (
        <div className="w-full h-screen flex justify-center items-center">
          <div class="lds-grid">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      )}
      <div className=" grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {currentLawyers.map((lawyer, index) => (
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
              <button
                onClick={() => {
                  getOneProfile(lawyer.ID._id);
                }}
                className="bg-blue-900 hover:bg-blue-600 hover:transform hover:-translate-y-2 transition-transform text-white font-semibold font-serif  px-4 py-2 mb-20 mr-2  rounded-full float-right"
              >
                Connect
              </button>
              <FaBookmark
                size={24}
                color={
                  bookmarkedLawyers.includes(lawyer.ID._id) ? "#1f618d" : "#999"
                } // Set the color based on bookmark status
                onClick={() => handleBookmarkToggle(lawyer.ID._id)} // Toggle bookmark status on click
              />
            </div>
          </div>
        ))}
      </div>
      {filteredLawyers.length != 0 && (
        <div className="flex justify-center">
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={Math.ceil(filteredLawyers.length / itemsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName="pagination flex justify-center items-center mt-4"
            pageClassName="cursor-pointer mx-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-700"
            breakClassName="mx-2 p-2"
            previousClassName="mx-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-700"
            nextClassName="mx-2 p-2 rounded-full bg-blue-500 text-white hover:bg-blue-700"
            activeClassName="bg-blue-700"
          />
        </div>
      )}
      {modalOpen &&
        (!isLoading ? (
          // <div className="">
          //   <div
          //     className="fixed inset-0 w-full h-full bg-black bg-opacity-60"
          //     onClick={() => setModalOpen(false)}
          //   ></div>
          //   <div className="items-center min-h-screen px-4 py-8">
          //     <Mainprofile data={openProfile} />
          //   </div>
          // </div>
          <div className="fixed inset-0 z-10 flex justify-center items-center ">
            <div
              className="fixed inset-0 w-full h-full bg-black opacity-40"
              onClick={() => setModalOpen(false)}
            ></div>
            <div className="relative  justify-center items-center lg:w-3/4 h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] p-4 rounded-md overflow-auto">
              <Mainprofile data={openProfile} />
            </div>
          </div>
        ) : (
          <div className="fixed inset-0 z-20 overflow-y-auto">
            <div className="w-full h-screen flex justify-center items-center bg-black bg-opacity-60">
              <div class="lds-grid">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SearchLawyer;

{
  /* /*
<div
            key={index}
            className=" p-4 bg-white rounded-md shadow-md  hover:shadow-xl cursor-pointer  "
          >
            <div className="relative flex justify-center items-center ">
              {lawyer.photo && (
                <div className="w-1/2 h-full flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-blue-900  ">
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
              <h2 className="text-lg font-bold">{lawyer.name || "No Name"}</h2>
              <p className="text-gray-600 font-semibold">
                {lawyer.title || "No title"}
              </p>
              <p className="text-gray-600 font-semibold">
                {lawyer.position || "No Position"}
              </p>
              <p className="text-gray-600 font-semibold">
                {lawyer.city || "No City"}
              </p>
              <p className="text-gray-600 font-semibold">
                Hourly Rate: ${lawyer.hourlyRate || "N/A"}
              </p>
              <div className="flex justify-center items-center text-yellow-400">
                <RatingStars
                  count={5}
                  size={24}
                  value={parseFloat(lawyer.T_rating) || 0}
                  edit={false}
                />
              </div>
              <p className="text-gray-600 font-semibold ">
                {lawyer.price || "No title"}
              </p>
            </div>
            <div className=" mt-2 ">
              <button className="bg-blue-900 hover:bg-blue-600 text-white px-4 py-2  rounded-full float-right">
                Connect
              </button>
            </div>
          </div>
              */
}
