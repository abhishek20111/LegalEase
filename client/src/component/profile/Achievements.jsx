import React from "react";
import Review from "./Review";
import RatingStars from "react-rating-stars-component";

export default function Achievements(props) {
  const data = {
    _id: { $oid: "6506f11f3d0b555071b84d65" },
    ID: { $oid: "6506e93a93e6020c49f5f98f" },
    uid: "23",
    name: "Amal Clooney",
    phone_no: { $numberDouble: "9193894923.0" },
    title: "Designer",
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
    <div className="flex flex-col justify-between md:flex-row bg-white rounded-t-3xl">
      <div className="sm:w-[50%] p-5 rounded-tl-3xl rounded-tr-3xl sm:rounded-tr-none bg-teal-100">
        <div className="flex gap-x-4 sm:flex-col items-center justify-center">
          <div className="font-Ubuntu sm:text-2xl">Cumulative Rating: </div>
          <div>
            <RatingStars
              count={5}
              size={40}
              value={parseFloat(props.data.T_rating) || 0}
              edit={false}
            />
          </div>
        </div>
        <div className="sm:text-xl text-center font-Oxygen">
          Trusted by over a thousand people
        </div>
      </div>
      <section className="bg-white-800 sm:w-[50%] text-gray-500 ">
        <div className="container max-w-5xl px-4 py-4 mx-auto ">
          <div className="grid gap-4 mx-2  sm:grid-cols-12">
            <div className="relative col-span-12 px-4 space-y-6 sm:col-span-9">
              <div className="col-span-12 space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-700">
                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-400">
                  <h3 className="text-xl font-semibold tracki">
                    Ongoing Professional Growth
                  </h3>
                  <time className="text-xs tracki uppercase text-gray-400">
                    Dec 2020
                  </time>
                  <p className="mt-2">
                    Engage in continuing legal education (CLE).
                  </p>
                </div>
                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top- sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-400">
                  <h3 className="text-xl font-semibold tracki">
                    Early to Mid-Career Development
                  </h3>
                  <time className="text-xs tracki uppercase text-gray-400">
                    Jul 2019
                  </time>
                  <p className="mt-2">
                    Pursue opportunities for advancement or partnership (5+
                    years)
                  </p>
                </div>
                <div className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-400">
                  <h3 className="text-xl font-semibold tracki">
                    Education and Licensing
                  </h3>
                  <time className="text-xs tracki uppercase text-gray-400">
                    Jan 2016
                  </time>
                  <p className="mt-2">
                    Complete undergraduate studies (4 years). Attend law school
                    and earn a JD degree (3 years).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
