import React from "react";
import RatingStars from "react-rating-stars-component";

export default function Rating(props) {
  console.log("Rating: ", props);
  return (
    <>
      <div className="w-[100%] m-auto  p-4">
        <article>
          <div class="flex items-center mb-4 bg-white space-x-4">
            <img class="w-10 h-10 rounded-full" src={props.data.Id.photo} alt="" />
            <div class="space-y-1 font-medium text-black">
              <p>
                {props.data.Id.name}
              </p>
            </div>
          </div> 
          <footer class="mb-5 text-sm text-gray-700 ">
          <RatingStars
              count={5}
              size={24}
              value={parseFloat(props.data.rating) || 0}
              edit={false}
            />
          </footer>
          <p class="mb-3 text-gray-700 ">{props.data.description}</p>
          <hr className="mt-2"></hr>
        </article>
      </div>
    </>
  );
}