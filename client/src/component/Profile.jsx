import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { uploadcloudnary } from './upload'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const USER_TYPE = {
        PUBLIC: "Public User",
        USER: "User",
        MEDIATER: "Mediater",
        ADMIN: "Admin",
        SUPER_ADMIN: "Super Admin",
    };

    const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);
    const name = useSelector((state) => state.userData.name)
    const email = useSelector((state) => state.userData.email)
    const id = useSelector((state) => state.userData.id)
    const notify1 = (info) => toast.success(info);
    const notify2 = (info) => toast.error(info);
    const navigate = useNavigate()

    const initialData = {
        ID: id,
        uid: "",
        phone_no: '',
        title: "",
        position: '',
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
        address: '',
        T_rating: '0',
        point_complete: "25",
    }

    const [userData, setUserData] = useState(initialData)
    const [show, setShow] = useState(false)
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
        address
    } = userData
    const [newProfile, setNewProfile] = useState([])


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
        }
        else if (name === "about" || name === "achievements") {
            setUserData({
                ...userData,
                description: {
                    ...userData.description,
                    [name]: [value], // Assuming 'about' and 'achievements' are single string inputs
                },
            });
        }
        else {
            setUserData({ ...userData, [name]: value });
        }
    };






    const domains = {
        "": [
            "Select Position"
        ],
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
        Taxes: [
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

    const [links, setLinks] = useState([]);
    const [ImageChange, setImageChange] = useState('');

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
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(JSON.stringify(userData));
            const response = await axios.post('http://localhost:8080/updateProfile', userData, axiosConfig);

            console.log(response.data.message);
            
            if (response.status === 201) {
                notify1('Profile updated successfully');
                refresh()
                // notify1('Please Login Again For changing UI..');
                localStorage.clear();
                navigate('/signin')
            } else {
                notify2('Profile update failed');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleChangeProfilePic = async (arr) => {
        try {
            console.log(arr);
            const response = await axios.post('http://localhost:8080/updateProfilePic', { url: arr[0].url }, axiosConfig);
            console.log(response.data);
            setNewProfile(response.data);
            notify1(response.data.message);
            refresh()
        } catch (error) {
            notify2('An error occurred while updating the profile');
        }
    };


    const getProfileData = async (id) => {

        try {
            const response = await axios.get(`http://localhost:8080/getProfile/${id}`, axiosConfig);
            console.log(response.data);
            setNewProfile(response.data);

        } catch (error) {
            console.log(error);
        }
    };

    const refresh = () => {
        console.log(newProfile);
        getProfileData(id)
    }
    useEffect(() => {
        refresh()
    }, [setNewProfile])


    return (
        <div>
            <h1 className='text-3xl font-bold mx-3'> Profile </h1>
            <br />
            Current role: {CURRENT_USER_TYPE}
            <br />
            name: {name}
            <br />
            email: {email}
            <br />
            id : {id}
            <br />

            <div>
                <input
                    type="file"
                    className="mx-2 rounded-md p-1"
                    multiple
                    onChange={(e) => { setImageChange(e.target.files); }}
                />
                <button onClick={(e) => { handleImageSubmit(e); }}>Upload</button>

                <img
                    className='h-[123px]'
                    src={newProfile.userData && newProfile.userData.photo ? newProfile.userData.photo : "https://images.unsplash.com/photo-1655119373888-1bce2223555a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8&w=1000&q=80"}
                    alt=""
                />


            </div>


            {CURRENT_USER_TYPE === USER_TYPE.USER ?
                <div className='mt-[2rem]'>
                    <select
                        name="position"
                        id="position"
                        value={position}
                        onChange={(e) => { setShow(true); onValueChange(e); }}
                        className=" border rounded-[5px]   placeholder:text-[16px] px-2 "
                    >
                        <option value=""></option>
                        <option value="Court Case">Court Case</option>
                        <option value="Legal Advisory">Legal Advisory</option>
                        <option value="Document Writing">Document Writing</option>
                        <option value="Taxes">Taxes</option>
                    </select>
                </div>
                :
                <>
                    {newProfile.updatedUser && (
                        <div className="user-profile">
                            <h2>User Profile</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>ID:</td>
                                        <td>{newProfile.updatedUser._id}</td>
                                    </tr>
                                    <tr>
                                        <td>T Rating:</td>
                                        <td>{newProfile.updatedUser.T_rating}</td>
                                    </tr>
                                    <tr>
                                        <td>Address:</td>
                                        <td>{newProfile.updatedUser.address}</td>
                                    </tr>
                                    <tr>
                                        <td>Available:</td>
                                        <td>{newProfile.updatedUser.avilable ? 'Yes' : 'No'}</td>
                                    </tr>
                                    <tr>
                                        <td>Created At:</td>
                                        <td>{new Date(newProfile.updatedUser.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                    {/* <tr>
                                        <td>Description:</td>
                                        <td>{newProfile.updatedUser.description}</td>
                                    </tr> */}
                                    <tr>
                                        <td>About:</td>
                                        <td>{newProfile.updatedUser.description.about ? newProfile.updatedUser.description.about[0] : ''}</td>
                                    </tr>
                                    <tr>
                                        <td>Achievements:</td>
                                        <td>{newProfile.updatedUser.description.achievements ? newProfile.updatedUser.description.achievements[0] : ''}</td>
                                    </tr>

                                    <tr>
                                        <td>Experience:</td>
                                        <td>
                                            Total Cases: {newProfile.updatedUser.experience?.total_case},{' '}
                                            Winning: {newProfile.updatedUser.experience?.winning},{' '}
                                            Years: {newProfile.updatedUser.experience?.year}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Phone Number:</td>
                                        <td>{newProfile.updatedUser.phone_no}</td>
                                    </tr>
                                    <tr>
                                        <td>Position:</td>
                                        <td>{newProfile.updatedUser.position}</td>
                                    </tr>
                                    <tr>
                                        <td>Tag:</td>
                                        <td>{newProfile.updatedUser.tag && newProfile.updatedUser.tag.join(', ')}</td>
                                    </tr>
                                    <tr>
                                        <td>Title:</td>
                                        <td>{newProfile.updatedUser.title}</td>
                                    </tr>
                                    <tr>
                                        <td>UID:</td>
                                        <td>{newProfile.updatedUser.uid}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </>

            }
            {
                show ?
                    <>
                        <div className='mt-[2rem]'>
                            <select
                                name="tag"
                                id="tag"
                                value={tag}
                                onChange={onValueChange}
                                className="border rounded-[5px] placeholder:text-[16px] px-2"
                            >
                                <option value=""> </option>
                                {domains[position].map((subdomain, ind) => (
                                    <option key={ind} value={subdomain}>
                                        {subdomain}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <input type="text" className='bg-red-300' name='title' value={title} placeholder='Advocate of ....' onChange={onValueChange} />
                        <input type="text" className='bg-green-200' name='address' value={address} onChange={onValueChange} />
                        <input type="number" className='bg-yellow-200' name='phone_no' placeholder='+91 70089XXX' value={phone_no} onChange={onValueChange} />
                        <input type="number" className='bg-red-300' name='year' value={year} onChange={onValueChange} />
                        <input type="number" className='bg-green-200' name='winning' value={winning} onChange={onValueChange} />
                        <input type="number" className='bg-purple-200' name='total_case' value={total_case} onChange={onValueChange} />
                        <input type="number" className='bg-red-300' placeholder='UID' name='uid' value={uid} onChange={onValueChange} />
                        <input type="text" className='bg-green-600' name='about' value={about} onChange={onValueChange} />
                        <input type="text" className='bg-red-600' name='achievements' value={achievements} onChange={onValueChange} />

                        <button onClick={(e) => handleSubmit(e)} className='bg-gray-500 m-4 w-[9rem] h-[2rem] text-white'>Update profile</button>
                    </> : null
            }

        </div>
    )
}
