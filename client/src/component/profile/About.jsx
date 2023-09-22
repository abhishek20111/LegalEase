import React from "react"
// import check from "../../assets/check.png"
export default function About(props) {
  return (
    <div>
      <div className="bg-white w-[100%] m-auto rounded-t-3xl">
        <div className="container mx-auto px-4">
          <div className="flex flex-col pt-4 md:flex-row">
            <div className=" flex flex-col  sm:flex sm:flex-row md:w-[50%] sm:justify-between  ">
              <div className=" w-[98%] sm:w-[50%] text-center">
                <div className="flex flex-col bg-white  text-left p-2 m-2 w-[98%] rounded-sm">
                  <div className="text-1xl text-gray-500">Education</div>
                  <div className="text-1xl font-Oxygen ">
                    Stanford University
                  </div>
                </div>

                <div className="flex flex-col bg-white text-left p-2 m-2 w-[98%] rounded-sm">
                  <div className="text-1xl text-gray-500">Department</div>
                  <div className="text-1xl font-Oxygen ">Product Design</div>
                </div>

                <div className="flex flex-col bg-white text-left p-2 m-2 w-[98%] rounded-sm">
                  <div className="text-1xl text-gray-500">Organisation</div>
                  <div className="text-1xl font-Oxygen ">Simple Web LLC</div>
                </div>
              </div>

              <div className="w-[98%]  sm:w-[48%]  text-center">
                <div className="flex flex-col bg-white  text-left p-2 m-2 w-[98%] rounded-sm">
                  <div className="text-1xl text-gray-500">Language</div>
                  <div className="text-1xl font-Oxygen ">English, Hindi</div>
                </div>

                <div className="flex flex-col bg-white text-left p-2 m-2 w-[98%] rounded-sm">
                  <div className="text-1xl text-gray-500">Work History</div>
                  <div className="text-1xl font-Oxygen ">Xuz Engineer</div>
                </div>

                <div className="flex flex-col bg-white text-left p-2 m-2 w-[98%] rounded-sm">
                  <div className="text-1xl text-gray-500">Education</div>
                  <div className="text-1xl font-Oxygen ">
                    Stanford University
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center m-auto">
          <div className=" p-4">
            <div className="flex flex-col text-center bg-white">
              <div className="font-medium text-xl m-2 px-1">Specialisations:</div>
              {
                props.data.tag.map((item) => {
                  return (
                    <div className="m-2 bg-white px-1 rounded-lg font-medium font-Oxygen flex">
                      <img src="" className="w-6" alt="" /> <span className="">{item}</span>
                    </div>
                  );
                })
              }
            </div>
          </div>
              {/* <img
                className="h-52 m-2 "
                src="https://media.istockphoto.com/id/1134291628/photo/male-manager-shaking-hands-with-female-applicant.webp?b=1&s=170667a&w=0&k=20&c=Woj-HmznDXbG93OFf5CRYee4gfQfQbOuhHvUAscvOY4="
              ></img> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
