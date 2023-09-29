// import { Link } from "react-router-dom";
// import { Fade } from "react-awesome-reveal";
import { useState, useEffect } from "react";
import lawyer from "../assets/lawyerCut1.png";
import bg from "../assets/bg-pattern.svg";
import lawyer2 from "../assets/l21.png";
import graph from "../assets/banner-img.png";
import Section1 from "./HomePage/Section1";
import Section2 from "./HomePage/Section2";
import Section3 from "./HomePage/Section3";
import Footer from "./HomePage/Footer";

export default function LandingPage() {
  const [imageSrc, setImageSrc] = useState(lawyer); // Initial image source
  const thresholdWidth = 640; // Threshold width for switching images

  // Function to update the image source based on viewport width
  const updateImageSrc = () => {
    const viewportWidth = window.innerWidth;
    if (viewportWidth < thresholdWidth) {
      setImageSrc(lawyer2); // Set to lawyer2 for smaller screens
    } else {
      setImageSrc(lawyer); // Set to lawyer for larger screens
    }
  };

  // Add an event listener for the window resize event
  useEffect(() => {
    updateImageSrc(); // Initial image source check

    // Update the image source whenever the window is resized
    window.addEventListener("resize", updateImageSrc);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateImageSrc);
    };
  }, []);

  return (
    <>
    <section
      className="min-h-screen md:flex-none md:flex-col"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* <Fade> */}
      {imageSrc === lawyer ? (
        <div className="border flex justify-end gap-10 px-5">
          <button className="font-thin text-3xl font-sans border px-2 py-1">
            Forum
          </button>
          <button className="font-thin text-3xl font-sans border px-2 py-1">
            Forum
          </button>
        </div>
      ) : (
        <div className="border flex justify-end gap-10 px-5">
          <button className="font-thin text-3xl font-sans border px-2 py-1">
            Forum
          </button>
          <button className="font-thin text-3xl font-sans border px-2 py-1">
            Forum
          </button>
        </div>
      )}
      <div
        className={`w-[90%] mx-auto px-4 pt-12  gap-x-6 text-gray-600 md:px-8 flex-wrap flex sm:flex-nowrap`}
      >
        <div className="space-y-5 max-w-lg lg:max-w-2xl mx-auto text-center xl:text-left xl:pt-16 ">
          <h1 className="text-4xl text-gray-800 font-Ubuntu font-bold mx-auto lg:text-5xl xl:text-7xl">
            <span className="font-serif">"</span>unlocking{" "}
            <span className="text-blue-600">Justice,</span> <br></br> one{" "}
            <span className="italic font-serif font-thin">click</span> at a time
            <span className="font-serif">"</span>
          </h1>
          <p className="max-w-xl mx-auto font-Oxygen text-xl xl:mx-0 py-4">
            Trusted by over 1 million people and 1000 businesses, we are the leading online platform for all things related law.
          </p>
          <div className=" flex flex-wrap sm:flex-nowrap items-start justify-center sm:flex  xl:justify-start">
            {/* <Link to="/intern"> */}
            <a className="flex items-center max-w-[100px] justify-center gap-x-2 py-2 px-4 text-white font-medium bg-blue-500 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-lg md:inline-flex">
              Explore
            </a>
            {/* </Link> */}
            <div>
              {imageSrc === lawyer && (
                <img src={graph} className="h-[200px] md:h-[300px]" alt="" />
              )}
            </div>
          </div>
        </div>
        <div className="min-w-[35%] flex-1 mx-auto w-full ">
          <div className="flex justify-center sm:rounded-b-[250px] rounded-t-[300px] ml-2  min-[600px]:ml-2 w-full">
            <img
              src={imageSrc}
              className=" sm:rounded-full max-w-[200px] md:max-w-full  md:mt-0 sm:bg-gradient-to-r from-transparent via-gray-100 to-blue-400 ring-black relative    "
              alt=""
            />
          </div>
        </div>
      </div>
      {/* </Fade> */}
    </section>
      <div
        className="mih-h-screen"
        
      >
        <Section1 />
        <Section2/>
        <Section3 />
      </div>
      <Footer />
      </>
  );
}
