
import React, { useState } from "react";
import About from "./newPro/About";
import Review from "./newPro/Review";
import Contact from "./newPro/Contact";
import Achievements from "./newPro/Achievements";

export default function Mainprofile(props) {
  console.log("MainProfiel: ", props);

  const [first, second] = useState(0);

  const Zero_click = () => {
    second(0);
  };

  const first_click = () => {
    second(1);
  };
  const Second_click = () => {
    second(2);
  };

  const Third_click = () => {
    second(3);
  };

  return (
    <>
      {props.data && (
        <div className=" rounded-md  bg-gray-100 border-gray-300  m-auto">
          {/* **************************border-2 border-red-500******************************* */}
          <div className="flex flex-col rounded-b-3xl bg-white p-2 lg:p-4 sm:flex-row md:justify-between lg:place-content-start m-auto ">
            <div className=" p-2">
              <img
                className="rounded-lg h-44 bg-cover bg-center w-44 text-center object-cover m-auto lg:h-52 lg:w-52 outline"
                src={props.data.userData.photo}
              ></img>
            </div>
            <div className="lg:w-[90%] sm:w-[80%] ml-2 p-2 max-w-full  m-auto">
              <div className="">
                <div className="flex flex-col sm:flex-row sm:justify-between ">
                  <div className="font-normal border-b-2 border-black text-center sm:text-left mb-2 text-3xl font-serif">
                    {props.data.userData.name}
                  </div>
                  <div className="flex">
                    <div className="sm:flex text-center sm:flex-row">
                      {props.data.updatedUser.tag.map((tag, index) => (
                        <button
                          key={index}
                          className={`px-3 mb-1 py-1 sm:px-1 font-semibold md:px-2 mx-4 lg:text-left text-center ${"bg-blue-100  text-blue-800"}  rounded-full `}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    <div>
                      <button className="hover:bg-blue-300 hover:text-blue-800 hover:outline p-1 bg-blue-600 font-Ubuntu text-lg text-white rounded-sm outline-offset-2 outline-blue-700 outline-double">
                        Connect
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col  gap-x-2 place-content-start">
                  <span className="text-gray-600">
                    Title:{" "}
                    <span className="text-black italic">
                      {props.data.updatedUser.title}
                    </span>
                  </span>
                  <span className="text-gray-600">
                    Position:{" "}
                    <span className="text-black italic">
                      {props.data.updatedUser.position}
                    </span>
                  </span>
                </div>
              </div>
              <div
                className="mt-2 text-start font-Ubuntu
             text-sm sm:max-w-full border-l py-1 px-1 border-black"
              >
                Description the Oxford Dictionaries define a document as “a
                piece of written, printed, or electronic matter that provides
                information or evidence or that serves as an official record.”
                Document writing, then, is the process of creating a written
                document.{" "}
              </div>
            </div>
          </div>

          {/******border-2 border-red-500********************** */}
          <div className="flex flex-col text-center sm:flex-row bg-gradient-to-r from-gray-100 via-blue-100 to-gray-100 sm:justify-evenly justify-content py-1 ">
            <div className="xl:flex   text-center justify-around">
              <div className="my-4 flex   place-content-center text-center  ">
                <span className="h-12 font-semibold text-2xl place-content-center w-12 rounded-full bg-[#e0aaff]">
                  <img
                    className="h-12 font-semibold text-2xl bg-cover place-content-center w-12 rounded-full"
                    src="https://images.unsplash.com/photo-1580519542036-c47de6196ba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bW9uZXl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                  />
                </span>
                <div className="flex sm:w-48 sm:text-left sm:ml-2 flex-col">
                  <div className="text-2xl font-semibold">
                    {((props.data.updatedUser.description.experience.winning /
                      props.data.updatedUser.description.experience
                        .total_case) *
                      100).toFixed(1)}
                    %
                  </div>
                  <div className="text-1xl">Winning Ratio</div>
                </div>
              </div>

              <div className=" my-4 flex place-content-center text-center">
                <span className=" h-12 font-semibold text-2xl place-content-center w-12 rounded-full bg-[#d9ed92]">
                  <img
                    className="h-12 font-semibold text-2xl bg-cover place-content-center w-12 rounded-full"
                    src="https://images.unsplash.com/photo-1527219525722-f9767a7f2884?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fGV4cGVyaWVuY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                  />
                </span>
                <div className="flex  sm:w-48 sm:ml-2 flex-col sm:text-left">
                  <div className="text-2xl  font-semibold">
                    {props.data.updatedUser.description.experience.year}
                  </div>
                  <div className="text-1xl">Years of Exp.</div>
                </div>
              </div>
            </div>

            <div className="xl:flex text-center justify-between ">
              <div className=" my-4 flex place-content-center text-center">
                <span className="h-12 font-semibold text-2xl place-content-center w-12 rounded-full bg-[#90e0ef]">
                  <img
                    className="h-12 font-semibold text-2xl bg-cover place-content-center w-12 rounded-full"
                    src="https://media.istockphoto.com/id/954924774/photo/hand-holding-winner-trophy.jpg?s=2048x2048&w=is&k=20&c=-kMjeCdNBnthN09C2c_G4ClgTwlaiAvZlyHinAnZwWc="
                  />
                </span>
                <div className="flex sm:text-left  sm:w-48 sm:ml-2  flex-col">
                  <div className="text-2xl  font-semibold">
                    {props.data.updatedUser.T_rating}+
                  </div>
                  <div className="text-1xl">Avg. Rating</div>
                </div>
              </div>

              <div className="my-4 flex place-content-center sm:text-left text-center  ">
                <span className="h-12 font-semibold text-2xl place-content-center w-12 rounded-full bg-[#ffd60a]">
                  <img
                    className="h-12 font-semibold text-2xl bg-cover place-content-center w-12 rounded-full"
                    src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8d29ya2luZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                  />
                </span>
                <div className="flex sm:text-left  sm:w-48 sm:ml-2  flex-col">
                  <div className="text-2xl  font-semibold">
                    {props.data.updatedUser.description.experience.total_case}+
                  </div>
                  <div className="text-1xl">Cases Worked</div>
                </div>
              </div>
            </div>
          </div>
          {/* ************************************************************************* */}
          <div className="rounded-t-3xl ">
            {first == 0 && <About data={props.data} />}
            {first == 1 && <Achievements data={props.data} />}
            {first === 2 && <Review data={props.data} />}
            {first === 3 && <Contact data={props.data} />}
          </div>

          {/* ************************************************************************* */}
          <div className="text-center bg-white border-t-2 sm:flex sm:justify-evenly ">
            <div className="mb-1  hover:cursor-pointer  sm:px-12 font-medium text-lg p-2 active:bg-gray-200 text-[#004b23]">
              <button className="outline-none border-none" onClick={Zero_click}>
                About
              </button>
            </div>

            <div className="mb-1  hover:cursor-pointer  sm:px-12 font-medium text-lg p-2 active:bg-gray-200 text-[#004b23]">
              <button
                className="outline-none border-none"
                onClick={first_click}
              >
                Achievements
              </button>
            </div>

            <div
              className="mb-1 border:none outline:none hover:cursor-pointer sm:px-12 font-medium active:bg-gray-200 text-lg p-2 text-[#004b23]"
              onClick={Second_click}
            >
              <button className="outline-none border-none">Review</button>
            </div>

            <div
              className="mb-1 border:none outline:none hover:cursor-pointer sm:px-12 font-medium active:bg-gray-200 text-lg p-2 text-[#004b23]"
              onClick={Third_click}
            >
              <button className="outline-none border-none">Contact</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
=======
import React from "react";

export default function Mainprofile() {
  const data = {
    _id: { $oid: "6506f11f3d0b555071b84d65" },
    ID: { $oid: "6506e93a93e6020c49f5f98f" },
    uid: "23",
    name: "Amal Clooney",
    phone_no: { $numberDouble: "9193894923.0" },
    title: "Advocate",
    position: "Document Writing",
    description: {
      experience: {
        year: { $numberInt: "21" },
        winning: { $numberInt: "89" },
        total_case: { $numberInt: "34" },
      },
      about: ["23"],
      achievements: ["34"],
    },
    avilable: true,
    tag: ["Intellectual Property", "Real Estate"],
    address: "djsadj",
    T_rating: "0",
    review: [],
    points: [],
    createdAt: { $date: { $numberLong: "1694953759988" } },
    updatedAt: { $date: { $numberLong: "1694953759988" } },
    __v: { $numberInt: "0" },
  };

  return (
    <>
      <div className="w-[95%] border-2 border-gray-300  m-auto lg:w-3/4 ">
        {/* **************************border-2 border-red-500******************************* */}
        <div className="flex flex-col my-2 p-2 lg:p-4 lg:flex-row lg:justify-between lg:place-content-start m-auto ">
          <div className=" p-2">
            <img
              className=" h-44  w-44 text-center m-auto lg:h-52 lg:w-52"
              src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.webp?b=1&s=170667a&w=0&k=20&c=YQ_j83pg9fB-HWOd1Qur3_kBmG_ot_hZty8pvoFkr6A="
            ></img>
          </div>
          <div className="lg:w-[80%] ml-2 p-2 max-w-full  m-auto">
            <div className="flex flex-col lg:flex-row lg:justify-between ">
              <div className="font-semibold text-center mb-2 text-2xl">
                {data.name}
                <span className="p-2">🟢</span>
              </div>
              <div className="lg:flex text-center lg:flex-row">
                {data.tag.map((tag, index) => (
                  <button
                    key={index} // You can use the index as the key if the tags are unique
                    className="px-5 py-2 mx-4 text-[#2bc016] lg:text-left text-center duration-150 bg-[#caffbf] rounded-lg hover:bg-indigo-700 active:shadow-lg my-1"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col lg:flex-row text-center place-content-start">
              <span className="text-[#ff4000] font-bold">
                Title :- {data.title}&nbsp; &nbsp;
              </span>
              <span className="text-[#5a189a]  font-bold">
                {" "}
                Position :- {data.position}
              </span>
            </div>
            <div className="mt-2 text-center lg:text-start">
              Description the Oxford Dictionaries define a document as “a piece
              of written, printed, or electronic matter that provides
              information or evidence or that serves as an official record.”
              Document writing, then, is the process of creating a written
              document.{" "}
            </div>
          </div>
        </div>

        {/***************************************************************************** */}
        <div className="flex flex-col border-2 bg-gray-200 md:flex-row  md:justify-evenly justify-content py-4 ">
          <div className="xl:flex  justify-between">
            <div className="my-4 flex place-content-center text-center ">
              <span className="h-14 font-semibold text-2xl place-content-center w-14 rounded-full bg-[#e0aaff]">
                🧑
              </span>
              <div className="flex w-48  flex-col">
                <div className="text-4xl font-extrabold">
                  {data.description.experience.winning.$numberInt}%{" "}
                </div>
                <div className="text-2xl">Job Success</div>
              </div>
            </div>

            <div className=" my-4 flex place-content-center text-center">
              <span className=" h-14 font-semibold text-2xl place-content-center w-14 rounded-full bg-[#d9ed92]">
                😄
              </span>
              <div className="flex  w-48 flex-col">
                <div className="text-4xl font-extrabold">
                  {data.description.experience.year.$numberInt}+{" "}
                </div>
                <div className="text-2xl">Experience</div>
              </div>
            </div>
          </div>

          <div className="xl:flex justify-between ">
            <div className=" my-4 flex place-content-center text-center">
              <span className="h-14 font-semibold text-2xl place-content-center w-14 rounded-full bg-[#90e0ef]">
                🌞
              </span>
              <div className="flex w-48  flex-col">
                <div className="text-4xl font-extrabold">
                  {data.description.achievements}+
                </div>
                <div className="text-2xl">Achievements</div>
              </div>
            </div>

            <div className="my-4 flex place-content-center text-center  ">
              <span className="h-14 font-semibold text-2xl place-content-center w-14 rounded-full bg-[#ffd60a]">
                💲
              </span>
              <div className="flex w-48  flex-col">
                <div className="text-4xl font-extrabold">
                  {data.description.experience.winning.$numberInt}+
                </div>
                <div className="text-2xl">Hours Worked</div>
              </div>
            </div>
          </div>
        </div>
        {/* ************************************************************************* */}
        <div></div>

        {/* ************************************************************************* */}
        <div></div>
      </div>
    </>
  );
}
