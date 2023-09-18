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
