import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Super_Manage() {
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
    const [userDataN, setUserDataN] = useState([]);
    const [userDataA, setUserDataA] = useState([]);


    const axiosConfig = {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
    };


    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/getAllUserProfile',  axiosConfig);
            setUserDataN(response.data.N_User)
            setUserDataA(response.data.A_User_Data)
            console.log(response.data);
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

    const handleRoleChange = (Id, data) => {
        console.log(Id, data);
        axios
            .post(`http://localhost:8080/changeRole/${Id}`, { newRole: data })
            .then((response) => {
                console.log(response.data.message);
                notify1(response.data.message)
            })
            .catch((error) => {
                console.log(error);
                notify2(error)
            });
    }


    useEffect(() => {
        fetchUserData();
    }, [setUserDataN, setUserDataA]);
    return (
        <div>
            <div>
                <h2>User Data Table</h2>
                <table className='table-auto border-separate border-spacing-2 border border-slate-500'>
                    <thead className=''>
                        <tr className=''>
                            <th className='border border-slate-600'>Name</th>
                            <th className='border border-slate-600'>Email</th>
                            <th className='border border-slate-600'>Role</th>
                        </tr>
                    </thead>
                    <tbody className=''>

                        {userDataN &&  userDataN.map((user) => (
                            <tr key={user._id} className=''>
                                <td className='border border-slate-600'>{user.name}</td>
                                <td className='border border-slate-600 font-bold'>{user.email}</td>
                                <td className='border border-slate-600'>{user.role}</td>
                                {/* <td>{user.description.about[0].split('\n')[0].substring(6)}</td>
                                <td>{user.title}</td>
                                <td>{user.address}</td>
                                <td>{user.phone_no}</td>
                                <td>{user.ID.email}</td>
                                <td>
                                    <a href={user.description.about[0].split('\n')[6].substring(11)} target="_blank" rel="noopener noreferrer">
                                        LinkedIn
                                    </a>
                                </td>
                                <td>{user.description.about[1]}</td>
                                <td>
                                    Years: {user.description.experience.year}<br />
                                    Winning: {user.description.experience.winning}<br />
                                    Total Cases: {user.description.experience.total_case}
                                </td>
                                <td>{user.description.practice_areas.join(', ')}</td>
                                <td>{user.description.languages_spoken.join(', ')}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
