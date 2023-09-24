import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Forum2() {
    const event = new Date('August 19, 1975 23:15:30 GMT+00:00');
    const t = event.toLocaleTimeString('en-US');

    const [show, setShow] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [comment, setComment] = useState('');
    const [forumData, setForumData] = useState([]);
    const [loading, setLoading] = useState(true);
    const notify1 = (info) => toast.success(info);


    const toggleComment = (e, post) => {
        e.preventDefault();
        if (show) {
            setShow(false);
        } else {
            setShow(true);
            setSelectedPost(post);
        }
    };

    const axiosConfig = {
        headers: {
            Authorization: `    `
        }
    };
    const onsubmitePost = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/saveCommentForum', {
                comment
            }, axiosConfig);

            const message = response.data.message;
            console.log('Data saved successfully!');
            notify1(message)

        } catch (error) {
            console.error('An error occurred:', error);
        }
    }

    useEffect(() => {
        // Define a function to fetch forum data
        const fetchForumData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/getForum' , axiosConfig); // Send a POST request to the /getForum endpoint

                if (response.status === 201) {
                    setForumData(response.data.newData);
                } else {
                    console.error('Failed to fetch forum data.');
                }
            } catch (error) {
                console.error('An error occurred:', error);
            } finally {
                setLoading(false);
            }
        };

        // Call the fetchForumData function when the component mounts
        fetchForumData();
    }, []);

    


    console.log(forumData);
    return (
        <>
            <div className='w-[100vw] h-[100vh]'>
                <div className='flex flex-col md:flex-row'>
                    {/* sidebar */}
                    <div className='w-[17%] mt-1 bg-[#bfdbf7] md:block hidden'>
                        <div className=' flex flex-col sm:overflow-auto sm:h-[92vh]'>

                            <form className='mb-2 mt-1'>
                                <label for="default-search" className="mb-2  text-xs	 text-gray-900 sr-only dark:text-white">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-3 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <input type="search" id="default-search" className="block w-[89%] m-auto p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search . . ." required />
                                    {/* <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs	 px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
                                </div>
                            </form>
                          

                            <div className=" flex flex-col m-auto mt-4">
                                <p className='font-semibold text-xl text-gray-900 font-sans'>Court Cases</p>
                                <div className='    pl-[10%]  pt-[4%] pb-[7%] text-gray-800 font-serif' >
                                    <p>Civil Litigation</p>
                                    <p>Criminal Defense</p>
                                    <p>Family Law</p>
                                    <p>Employment Law</p>
                                    <p>Personal Injury Law</p>
                                </div>

                            </div>
                            <div className=" flex flex-col m-auto">
                                <p className='font-semibold  text-xl text-gray-900 font-sans pl-[8%]'>Legal Advisory</p>
                                <div className='pl-[16%]  pt-[4%] pb-[7%] text-gray-800 font-serif' >
                                    <p>Business and Corporate</p>
                                    <p>Intellectual Property</p>
                                    <p>Immigration Law</p>
                                    <p>Healthcare Law</p>
                                    <p>Environment Law</p>
                                </div>

                            </div>
                            <div className=" flex flex-col m-auto ">
                                <p className='font-semibold  pl-[5%] text-xl text-gray-900 font-sans'>Taxes</p>
                                <div className='pl-[15%]  pt-[4%] pb-[7%] text-gray-800 font-serif' >
                                    <p>Taxes Planning</p>
                                    <p>Tax Compliance</p>
                                    <p>IRS Representation</p>
                                    <p>Estate Tax Planning</p>
                                    <p>International Taxation</p>
                                </div>
                            </div>
                            <div className=" flex flex-col m-auto ">
                                <p className='font-semibold  text-xl text-gray-900 font-sans pl-[10%]'>Document  Writing</p>
                                <div className='pl-[18%] pt-[4%] pb-[7%] text-gray-800 font-serif' >
                                    <p>Contracts and Agreements</p>
                                    <p>Wills and Estate Property</p>
                                    <p>Intellectual Property</p>
                                    <p>Real Estate Documents</p>
                                    <p>Business Documents</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* right sidebar */}
                    <div className=' flex w-full bg-slate-200  '>
                        {loading? (
                <p>Loading...</p>
            ): <div className='flex flex-col m-auto w-[98%] sm:w-[80%] md:w-[80%] overflow-auto h-[90vh]'>

                            <div className='bg-gray-100 m-auto w-[90%] justify-center'>
                                <div className='flex flex-col w-[80%] m-auto '>

                                    <label for="message" className="block mb-2 mt-[5%]  font-medium text-gray-900 text-2xl dark:text-white">Your Post</label>
                                    <textarea onChange={(e) => setComment(e.target.value)} id="message" rows="4" className="block m-[2px] p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
                                    <div className='flex w-full justify-end'>
                                        <button onClick={(e) => onsubmitePost(e)} className="bg-blue-500 w-[80px] mb-[3%]  hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                                            POST
                                        </button>
                                    </div>
                                    <div className='flex '>

                                        <img src="https://static.vecteezy.com/system/resources/thumbnails/024/226/462/small/happy-anime-boy-logo-vector.jpg" className='rounded-full h-[50px] ' alt="" />
                                        <p className='ml-[10px] m-auto font-semibold'>author</p>
                                    </div>
                                </div>
                                <form>
                                    <div className="w-[80%] m-auto mt-[2%] border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800 max-h-[95px] overflow-hidden ">
                                            <p className='font-bold mb-2'>content</p>
                                        </div>
                                        <div className='flex w-full justify-end'>
                                            <button className="ml-[80%] font-bold text-blue-500 py-1 px-4 rounded"
                                                onClick={(e) => toggleComment(e)}>
                                                Read More...
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                            <div className=' ml-2 flex gap-x-8'>
                                                <span className="material-symbols-outlined">comment</span>
                                                <span className="material-symbols-outlined">thumb_up</span>
                                            </div>
                                            <div className="flex pl-0 space-x-1 sm:pl-2">
                                                <div className='flex w-full justify-end'>
                                                    <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                        <span>{t}</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex mt-[5%]'>
                                        {/* <button className="bg-blue-500 ml-[10%] mb-[2%] hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                                                Chat
                                            </button> */}
                                    </div>
                                </form>




                            </div>


                        </div>}
                    </div>
                </div>
            </div>

            {show && selectedPost && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="fixed inset-0 w-full h-full bg-black opacity-40" onClick={() => setShow(false)}></div>
                    <div className="flex items-center min-h-screen px-4 py-8">
                        <div className="relative w-full max-w-[100vw] mx-auto bg-white rounded-md shadow-lg h-full">
                            <div className="flex items-center justify-between p-4 border-b">
                                <div className='flex w-full justify-end'>
                                    <button className="" onClick={() => setShow(false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <div className='bg-gray-100 m-auto w-[80%] justify-center'>
                                <div className='flex flex-col w-[80%] m-auto'>
                                    <div className='flex'>
                                        <img src="https://static.vecteezy.com/system/resources/thumbnails/024/226/462/small/happy-anime-boy-logo-vector.jpg" className='rounded-full h-[50px]' alt="" />
                                        <p className='ml-[10px] m-auto font-semibold'>{selectedPost.author}</p>
                                    </div>
                                </div>
                                <form>
                                    <div className="w-[75%] m-auto mt-[2%] border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                            <p className='font-bold mb-2'>{selectedPost.content}</p>
                                            <p>
                                                Lorem ipsum dolor sit amet consectetur adipisicinglorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat aut necessitatibus impedit cupiditate accusantium mollitia officiis ab vel! Assumenda modi labore repudiandae quae totam alias odio dignissimos nesciunt consequuntur doloribus perspiciatis dolore libero harum similique recusandae, odit atque fugiat voluptatem animi tempore, facere, voluptate distinctio voluptas! Vero officia nam libero. Dolores, illum? Aperiam, ab repellat! Nemo delectus error deserunt tenetur quo aspernatur tempore soluta doloremque mollitia, commodi, in magnam. Aspernatur, repudiandae ab odit quos voluptates dicta. Alias qui a voluptas tempora aliquid. Perferendis, ex esse. Omnis fugit modi ipsam itaque. elit. Non soluta deleniti eius dolore a, laudantium in quasi odit...
                                            </p>
                                            {/* Additional content */}
                                        </div>
                                        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
                                            <div className=' ml-2 flex gap-x-8'>
                                                <span className="material-symbols-outlined">comment</span>
                                                <span className="material-symbols-outlined">thumb_up</span>
                                            </div>
                                            <div className="flex pl-0 space-x-1 sm:pl-2">
                                                <button type="button" className="inline-flex justify-center items-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                                    <span>{t}</span>
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}





        </>
    );
}