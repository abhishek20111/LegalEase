import React from "react";
import Rating from "./Rating";

function Review() {
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
    review: [
      {
        key: "1",
        src: "https://images.unsplash.com/photo-1480429370139-e0132c086e2a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
        sname: "John michel",
        date: "2014-08-16",
        place: "UP",
        review:
          "It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.",
      },
      {
        key: "2",
        src: "https://images.unsplash.com/photo-1581382575275-97901c2635b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        sname: "Aditya Pratap Singh",
        date: "2020-10-23",
        place: "Banaras",
        review:
          "This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.",
      },
      {
        key: "3",
        src: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8d29tZW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
        sname: "Divya Singh",
        date: "2021-2-14",
        place: "Agra",
        review: "Very polite and calm",
      },
      {
        key: "4",
        src: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFufGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
        sname: "Rohit Agarwal",
        date: "2014-08-16",
        place: "Fatepur",
        review:
          "It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.",
      },
    ],
    points: [],
    createdAt: { $date: { $numberLong: "1694953759988" } },
    updatedAt: { $date: { $numberLong: "1694953759988" } },
    __v: { $numberInt: "0" },
    client: {
      name: ["John Michel", "XYZ Singh"],
    },
  };

  return (
    <>
      <div className=" w-[98%] m-auto bg-white rounded-t-3xl ">
        <div className="flex p-2 font-semibold text-3xl">
          <h1>Reviews</h1>
        </div>
        <div className="overflow-y-auto h-[280px]">

        {data.review.map((val) => {
          return (
            <>
              <Rating
                key={val.key}
                sname={val.sname}
                src={val.src}
                date={val.date}
                place={val.place}
                review={val.review}
                />
            </>
          );
        })}
        </div>
      </div>
    </>
  );
}

export default Review;
