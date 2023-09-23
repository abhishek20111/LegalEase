import React from "react";
import Review from "./Review";
import RatingStars from "react-rating-stars-component";

export default function Achievements(props) {
  console.log(props.data.updatedUser.description.achievements);

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
              <div className="space-y-12 relative px-4 sm:col-span-8 sm:space-y-8 sm:before:absolute sm:before:top-2 sm:before:bottom-0 sm:before:w-0.5 sm:before:-left-3 before:bg-gray-700">
                {props.data.updatedUser.description.achievements.map((item, index) => (
                  <div index={index} className="flex flex-col sm:relative sm:before:absolute sm:before:top-2 sm:before:w-4 sm:before:h-4 sm:before:rounded-full sm:before:left-[-35px] sm:before:z-[1] before:bg-violet-400">
                    <h3 className="text-xl font-sans ">
                      {item}
                    </h3>
                    {/* <time className="text-xs tracki uppercase text-gray-400">
                      Dec 2020
                    </time>
                    <p className="mt-2">
                      Engage in continuing legal education (CLE).
                    </p> */}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
