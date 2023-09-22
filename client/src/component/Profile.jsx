import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { uploadcloudnary } from "./upload";
import { ToastContainer, toast } from "react-toastify";
import { Country, State, City } from "country-state-city";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Mainprofile from "./Mainprofile";
import "./pageLoader.css"
export default function Profile() {
    const USER_TYPE = {
        PUBLIC: "Public User",
        USER: "User",
        MEDIATER: "Mediater",
        ADMIN: "Admin",
        SUPER_ADMIN: "Super Admin",
    };

    const [stateData, setStateData] = useState([]);
    useEffect(() => {

        const states = State.getStatesOfCountry("IN");
        setStateData(states);

    }, []);



    const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);
    const name = useSelector((state) => state.userData.name);
    const email = useSelector((state) => state.userData.email);
    const id = useSelector((state) => state.userData.id);
    const notify1 = (info) => toast.success(info);
    const notify2 = (info) => toast.error(info);
    const navigate = useNavigate();

    const initialData = {
        ID: id,
        uid: "",
        phone_no: "",
        title: "",
        position: "",
        description: {
            experience: {
                year: "",
                winning: "",
                total_case: "",
            },
            about: [],
            achievements: [],
        },
        avilable: true,
        tag: [],
        address: "",
        city: "",
        state: "",
        T_rating: "0",
        point_complete: "25",
    };

    const [userData, setUserData] = useState(initialData);
    const [show, setShow] = useState(false);
    const {
        uid,
        position,
        phone_no,
        year,
        title,
        winning,
        total_case,
        about,
        achievements,
        tag,
        address,
        city,
        state,
    } = userData;
    const [newProfile, setNewProfile] = useState([]);

    const onValueChange = (e) => {
        const { name, value } = e.target;

        if (name === "year" || name === "winning" || name === "total_case") {
            // Update the experience fields within the description object
            setUserData({
                ...userData,
                description: {
                    ...userData.description,
                    experience: {
                        ...userData.description.experience,
                        [name]: value,
                    },
                },
            });
        } else if (name === "about" || name === "achievements") {
            setUserData({
                ...userData,
                description: {
                    ...userData.description,
                    [name]: [value], // Assuming 'about' and 'achievements' are single string inputs
                },
            });
        } else {
            setUserData({ ...userData, [name]: value });
        }
    };

    const domains = {
        "": ["Select Position"],
        "Court Case": [
            "Civil Litigation",
            "Criminal Defense",
            "Family Law",
            "Employment Law",
            "Personal Injury Law",
        ],
        "Legal Advisory": [
            "Business and Corporate",
            "Intellectual Property",
            "Immigration Law",
            "Healthcare Law",
            "Environment Law",
        ],
        "Taxes": [
            "Taxes Planning",
            "Tax Compliance",
            "IRS Representation",
            "Estate Tax Planning",
            "International Taxation",
        ],
        "Document Writing": [
            "Contracts and Agreements",
            "Wills and Estate Property",
            "Intellectual Property",
            "Real Estate Documents",
            "Business Documents",
        ],
    };


    const [ImageChange, setImageChange] = useState("");

    const handleImageSubmit = async (e) => {
        e.preventDefault();

        try {
            let arr = [];
            for (let i = 0; i < ImageChange.length; i++) {
                console.log(
                    "ImageChange[i] " + i + " " + JSON.stringify(ImageChange[i])
                );
                const data = await uploadcloudnary(ImageChange[i]);
                arr.push(data);
            }

            // Pass the links array to handleChangeProfilePic
            handleChangeProfilePic(arr);
        } catch (err) {
            console.log(err);
        }
    };

    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${ localStorage.getItem("token")}`,
    }
  };

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(JSON.stringify("sunmitdata: ", userData));
        const response = await axios.post(
            "http://localhost:8080/updateProfile",
            userData,
            axiosConfig
        );

        //   console.log(response.data.message);

        if (response.status === 201) {
            notify1("Profile updated successfully");
            refresh();
            // notify1('Please Login Again For changing UI..');
            localStorage.clear();
            navigate("/signin");
        } else {
            notify2("Profile update failed");
        }
    } catch (error) {
        console.error(error);
    }
};

const handleChangeProfilePic = async (arr) => {
    try {
        //   console.log(arr);
        const response = await axios.post(
            "http://localhost:8080/updateProfilePic",
            { url: arr[0].url },
            axiosConfig
        );
        //   console.log(response.data);
        setNewProfile(response.data);
        notify1(response.data.message);
        refresh();
    } catch (error) {
        notify2("An error occurred while updating the profile");
    }
};

const getProfileData = async (id) => {
    console.log("gettingData");
    try {
        const response = await axios.get(
            `http://localhost:8080/getProfile/${id}`,
            axiosConfig
        );
        console.log("fetch data: ", response);
        setNewProfile(response.data);
    } catch (error) {
        console.log(error);
    }
};

const refresh = () => {
    console.log("refresh");
    getProfileData(id);
};
useEffect(() => {
    console.log("useEffect");
    refresh();
}, [setNewProfile]);

const [Profile, setProfile] = useState(false);
const Pchange = () => {
    setProfile(true);
};


return (
    <div className="">
        {/* **************************************************************************************************************** */}


        {CURRENT_USER_TYPE !== USER_TYPE.USER ? (
            <div>
                {console.log("calling main: ", newProfile.updatedUser)}
                {!newProfile.updatedUser && <div className="w-full h-screen flex justify-center items-center bg-white"><div className="loader bg-transparent"></div></div>}
                {newProfile.updatedUser && (

                    <Mainprofile data={newProfile.updatedUser} />
                )}
            </div>
        ) : (
            <>
                <div className="flex flex-col md:flex-row m-6 ">
                    <div className=" m-auto border-2  border-rose-500 text-center ">
                        <div className="max-w-xs p-6 m-auto  rounded-md shadow-md bg-gray-100 dark:text-black">
                            <img
                                className="object-cover mb-1 object-center w-full rounded-md h-72 dark:bg-gray-500"
                                src={
                                    newProfile.userData && newProfile.userData.photo
                                        ? newProfile.userData.photo
                                        : "https://media.istockphoto.com/id/1399788030/photo/portrait-of-young-confident-indian-woman-pose-on-background.jpg?s=612x612&w=0&k=20&c=aQw5YhGl99hL1O77thwpQTmqVE7bc8rCX9H0gTeoX_k="
                                }
                                alt=""
                            />
                            <div>
                                <button
                                    onClick={Pchange}
                                    className="p-1 hover:bg-slate-400 text-center border-2 w-[100%] bg-slate-300 "
                                >
                                    Change profile pic
                                </button>
                            </div>
                            {Profile && (
                                <>
                                    <div className="border-2 ">
                                        <input
                                            type="file"
                                            className="m-auto w-[85%]  rounded-md p-1"
                                            multiple
                                            onChange={(e) => {
                                                setImageChange(e.target.files);
                                            }}
                                        />
                                        <button
                                            onClick={(e) => {
                                                handleImageSubmit(e);
                                            }}
                                            className="p-1 text-center border-2 w-[100%] bg-slate-300 hover:bg-slate-400 "
                                        >
                                            Upload
                                        </button>
                                    </div>
                                </>
                            )}

                            <div className="mt-4 mb-2">
                                <span className="block text-gray-900 text-lg font-medium ">
                                    Current role :{" "}
                                    <span className="text-base text-gray-700">
                                        {CURRENT_USER_TYPE}
                                    </span>
                                </span>
                                <span className="text-lg text-gray-900 font-semibold ">
                                    {" "}
                                    Name :{" "}
                                    <span className="text-base text-gray-700">{name}</span>
                                </span>
                                <span className="block text-gray-900 text-lg font-medium ">
                                    Email :{" "}
                                    <span className="text-base text-gray-700">{email}</span>
                                </span>
                                <span className="block text-gray-900 text-lg font-medium ">
                                    ID : <span className="text-base text-gray-700">{id}</span>
                                </span>
                            </div>
                            <div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShow(!show);
                                    }}
                                    className="p-1 hover:bg-slate-400 text-center border-2 w-[100%] bg-slate-300 "
                                >
                                    {!show ? "Add" : "cancel"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {show && CURRENT_USER_TYPE === USER_TYPE.USER ? (
                        <>
                            <section className="p-2   bg-gray-200 border-2 border-rose-500 text-gray-700 ">
                                <form
                                    novalidate=""
                                    action=""
                                    className="container flex flex-col mx-auto w-[100%] space-y-12"
                                >
                                    <fieldset className="grid grid-cols-4 w-[100%]  gap-6 p-2 rounded-md shadow-sm border-2 justify-center border-green-500 bg-gray-200 ">
                                        <div className="grid border-2  border-rose-500 p-4  grid-cols-6 gap-4 col-span-full lg:col-span-3">
                                            <div className="col-span-full sm:col-span-3">
                                                <label for="position" className="text-base mb-1">
                                                    Position
                                                </label>
                                                <select
                                                    name="position"
                                                    id="position"
                                                    value={position}
                                                    onChange={(e) => {
                                                        // setShow(true);
                                                        onValueChange(e);
                                                    }}
                                                    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 p-2"
                                                >
                                                    <option value=""></option>
                                                    <option value="Court Case">Court Case</option>
                                                    <option value="Legal Advisory">
                                                        Legal Advisory
                                                    </option>
                                                    <option value="Document Writing">
                                                        Document Writing
                                                    </option>
                                                    <option value="Taxes">Taxes</option>
                                                </select>
                                            </div>
                                            <div className="col-span-full sm:col-span-3">
                                                <label for="tag" className="text-base mb-1">
                                                    Tag
                                                </label>

                                                <select
                                                    name="tag"
                                                    id="tag"
                                                    value={tag}
                                                    onChange={onValueChange}
                                                    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 p-2"
                                                >
                                                    <option value=""> </option>
                                                    {domains[position].map((subdomain, ind) => (
                                                        <option key={ind} value={subdomain}>
                                                            {subdomain}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-span-full sm:col-span-3">
                                                <label for="firstname" className="text-base mb-1">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    value={title}
                                                    placeholder="Advocate of ...."
                                                    onChange={onValueChange}
                                                    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-white-900 p-2"
                                                />
                                            </div>

                                            <div className="col-span-full sm:col-span-3">
                                                <label for="uid" className="text-base mb-1">
                                                    UID
                                                </label>
                                                <input
                                                    type="number"
                                                    id="uid"
                                                    placeholder="UID"
                                                    name="uid"
                                                    value={uid}
                                                    onChange={onValueChange}
                                                    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 p-2"
                                                />
                                            </div>

                                            <div className="col-span-full sm:col-span-2">
                                                <label for="year" className="text-base mb-1">
                                                    Year
                                                </label>
                                                <input
                                                    id="year"
                                                    type="number"
                                                    name="year"
                                                    value={year}
                                                    onChange={onValueChange}
                                                    placeholder="No. of Year"
                                                    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 p-2"
                                                />
                                            </div>

                                            <div className="col-span-full sm:col-span-2">
                                                <label for="total_case" className="text-base mb-1">
                                                    Total Cases
                                                </label>
                                                <input
                                                    type="number"
                                                    id="total_case"
                                                    name="total_case"
                                                    value={total_case}
                                                    onChange={onValueChange}
                                                    placeholder="Total no. of cases"
                                                    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 p-2"
                                                />
                                            </div>

                                            <div className="col-span-full sm:col-span-2">
                                                <label for="win" className="text-base mb-1">
                                                    Winning
                                                </label>
                                                <input
                                                    id="win"
                                                    type="number"
                                                    name="winning"
                                                    value={winning}
                                                    onChange={onValueChange}
                                                    placeholder="Winning"
                                                    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 p-2"
                                                />
                                            </div>

                                            <div className="col-span-full sm:col-span-2">
                                                <label for="about" className="text-base mb-1">
                                                    About
                                                </label>
                                                <input
                                                    type="text"
                                                    id="about"
                                                    name="about"
                                                    value={about}
                                                    onChange={onValueChange}
                                                    placeholder="About"
                                                    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 p-2"
                                                />
                                            </div>

                                            <div className="col-span-full sm:col-span-2">
                                                <label for="achieve" className="text-base mb-1">
                                                    Achievements
                                                </label>
                                                <input
                                                    type="text"
                                                    id="achieve"
                                                    name="achievements"
                                                    value={achievements}
                                                    onChange={onValueChange}
                                                    placeholder="Achievemnets"
                                                    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 p-2"
                                                />
                                            </div>

                                            <div className="col-span-full sm:col-span-2">
                                                <label for="number" className="text-base mb-1">
                                                    Phone Number
                                                </label>
                                                <input
                                                    type="number"
                                                    id="number"
                                                    name="phone_no"
                                                    placeholder="Enter your No."
                                                    value={phone_no}
                                                    onChange={onValueChange}
                                                    className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900 p-2"
                                                />
                                            </div>

                                            <div className="col-span-full">
                                                <label for="address" className="text-base mb-1">
                                                    Address
                                                </label>
                                                <input
                                                    id="address"
                                                    type="text"
                                                    name="address"
                                                    placeholder="Adress"
                                                    value={address}
                                                    onChange={onValueChange}
                                                    className="w-full rounded-md focus:border-gray-300 dark:border-gray-500 text-gray-500 p-2"
                                                />
                                            </div>
                                            <div className="mb-4 ">
                                                <div className="relative p-5 text-white  ">
                                                    <div className="space-y-2  ">
                                                        <div className=" mt-20 space-x-4 flex flex-row ">

                                                            <label htmlFor="" className="text-black text-xl font-bold">State </label>

                                                            <select 
                                                                name="state"
                                                                className="w-[9rem] text-black "
                                                                value={state}
                                                                onChange={onValueChange}
                                                            >
                                                                
                                                                <option value="">Select state</option>
                                                                {stateData.map((state) => (
                                                                    <option key={state.isoCode} value={state.isoCode}
                                                                    className="">
                                                                        {state.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <label htmlFor="" className="text-black text-xl font-bold">City </label>
                                                            <select
                                                                className=" rounded p-2 w-[9rem]  text-black"
                                                                value={city}
                                                                name="city"
                                                                onChange={onValueChange}
                                                            >
                                                                <option value="">Select city</option>
                                                                {City.getCitiesOfState("IN", userData.state).map(
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
                                            <button
                                                onClick={(e) => handleSubmit(e)}
                                                className="bg-gray-500 m-4 w-[9rem] h-[2rem]  text-white"
                                            >
                                                Update profile
                                            </button>
                                        </div>
                                    </fieldset>
                                </form>
                            </section>
                        </>
                    ) : null}
                </div>
            </>
        )}

        {/* ************************************************************************************************************************** */}
    </div>
);
}
