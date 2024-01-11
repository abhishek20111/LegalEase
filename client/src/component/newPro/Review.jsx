import React from "react";
import Rating from "./Rating";

function Review(props) {
  console.log("Review: ", props);
  return (
    <>
      <div className=" w-full m-auto bg-white rounded-t-3xl ">
        <div className="flex p-2 font-semibold text-3xl">
          <h1>Reviews</h1>
        </div>
        <div className="overflow-y-auto h-[280px]">
          {props.data.updatedUser.review.length>0 && props.data.updatedUser.review.map((data,index) => {
            return (
              <>
                <Rating data={data} />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Review;
