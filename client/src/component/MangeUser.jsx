import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MangeUser() {
    const USER_TYPE = {
        PUBLIC: "Public User",
        USER: "User",
        MEDIATER: "Mediater",
        ADMIN: "Admin",
        SUPER_ADMIN: "Super Admin",
    };

    const notify1 = (info) => toast.success(info);
    const notify3 = (info) => toast.info(info);
    const notify2 = (info) => toast.error(info);
    const CURRENT_USER_TYPE = useSelector((state) => state.userData.role);
    const [allProfileData, setAllProfileData] = useState([]);



    // Simulate fetching data
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/advanceProfile');
            setAllProfileData(response.data.A_Data)
            console.log(response.data.A_Data);
        } catch (error) {
            notify2('An error occurred while fetching user profiles.');
        }
    };

    const handleVerification = (userId) => {
        console.log("userId " + userId);
        axios
            .post(`http://localhost:8080/verifyUser/${userId}`)
            .then((response) => {
                // console.log(response.data.message);
                notify1(response.data.message);
                fetchUserData()
            })
            .catch((error) => {
                console.log(error);
            });
    };


    useEffect(() => {
        fetchUserData();
    }, [setAllProfileData]);

    return (
        <div>
            <table className="w-[97vw] divide-y divide-gray-200 overflow-auto h-[100vh]">
                <thead className="bg-gray-50 ">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Photo
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                        </th>

                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Tags
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            City
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Documents
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Verify
                        </th>
                        {CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN && <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            role
                        </th>}

                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">

                    {allProfileData.map((profile) => (
                        <tr key={profile.ID._id}>

                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={profile.ID.photo} alt={profile.ID.name} className="h-8 w-8 rounded-full" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="">
                                        <div className="text-sm font-medium text-gray-900">{profile.ID.name}</div>

                                        <div className="text-sm text-gray-500">{profile.position}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{profile.ID.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{profile.tag[0]}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{profile.city}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{profile.city}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">
                                    {(!profile.verifyUser) ? <button onClick={() => { ; handleVerification(profile._id) }} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
                                        {(profile.verifyUser) ? "Completed" : "Pending"}
                                    </button> :
                                        <div className='text-lg font-semibold text-gray-600'>
                                            verified
                                        </div>
                                    }
                                </div>
                            </td>

                            {/* {CURRENT_USER_TYPE === USER_TYPE.SUPER_ADMIN &&
                                profile.ID.role !== USER_TYPE.SUPER_ADMIN && (
                                    <td>
                                        <select
                                            className="text-[#2a4365] font-medium items-center border-2 py-2 rounded-[4px] px-2 hover:text-white hover:bg-[#2a4365]"
                                            value={profile.ID.role}
                                            onChange={(e) =>
                                                handleRoleChange(profile.ID._id, e.target.value)
                                            }
                                        >
                                            <option
                                                value={USER_TYPE.USER}
                                                className="bg-white text-[#2a4365] font-medium hover:bg-[#2a4365] hover:text-white"
                                            >
                                                Normal
                                            </option>
                                            <option
                                                value={USER_TYPE.MEDIATER}
                                                className="bg-white text-[#2a4365] font-medium hover:bg-[#2a4365] hover:text-white"
                                            >
                                                Admin
                                            </option>
                                        </select>
                                    </td>
                                )} */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
