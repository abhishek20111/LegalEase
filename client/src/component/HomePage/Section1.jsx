import React from "react";
import bg_2 from "../../assets/bg_2.jpg";

export default function Section1() {
  return (
    <>
      <section
        class="p-4 min-h-screen flex justify-center items-center"
        style={{ backgroundImage: `url(${bg_2})`, backgroundSize: "cover" }}
      >
        <div class="text-center lg:w-[63%] p-8 mx-auto">
          <div className="text-4xl m-2 tracking-wide font-sans font-bold">
            Get Started in 3 Simple Steps
          </div>
          <p className="mt-6 mb-4 text-base tracking-wide">
            Our legal experts are here to guide you through the process. Take
            the first step today.
          </p>
          <div className="flex flex-col mt-4 sm:flex-row">
            <div className="m-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-red-400 absolute -top-6 -left-6 overflow-hidden "></div>
                <div className="flex m-1 z-20 relative bg-blue-50 rounded-lg flex-col text-left p-4">
                  <span className="w-10 m-1 h-10 rounded-full bg-blue-400"></span>
                  <h1 className="text-lg  m-1  tracking-wide font-bold ">
                    Legal Consultation
                  </h1>
                  <p className="tracking-wide m-1 font-light">
                    Speak with our experienced attorneys to discuss your case
                    experienced attorneys.
                  </p>
                </div>
              </div>
            </div>
            <div className="m-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-red-400 absolute -top-6 -left-6 overflow-hidden "></div>
                <div className="flex z-20 relative m-1 bg-blue-50 rounded-lg flex-col text-left p-4">
                  <span className="w-10 m-1 h-10 rounded-full bg-blue-400"></span>
                  <h1 className="text-lg  m-1 tracking-wide font-bold ">
                    Case Evaluation
                  </h1>
                  <p className="tracking-wide m-1 font-light">
                    Speak with our experienced attorneys to discuss your case
                    experienced attorneys.
                  </p>
                </div>
              </div>
            </div>
            <div className="m-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-red-400 absolute -top-6 -left-6 overflow-hidden "></div>
                <div className="flex z-20 relative m-1 bg-blue-50 rounded-lg flex-col text-left p-4">
                  <span className="w-10 m-1 h-10 rounded-full bg-blue-400"></span>
                  <h1 className="text-lg  m-1 tracking-wide font-bold ">
                    Legal Representation
                  </h1>
                  <p className=" m-1 font-light">
                    Speak with our experienced attorneys to discuss your case
                    experienced attorneys.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
