import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
import Lsection from "./Lsection";
import axios from "axios";

export default function MainLeader() {
  const [data, setAllProfileData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/advanceProfile');
      setAllProfileData(response.data.A_Data);
      setIsLoading(false); // Set loading state to false when data is fetched
    } catch (error) {
      notify2('An error occurred while fetching user profiles.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (isLoading) {
    // Render a loading indicator while data is being fetched
    return <div>Loading...</div>;
  }



  let sortdata = [];
  function sortByPointsSum(arr) {

    arr.forEach((item) => {
      const points = item.points;
      const sum = points.reduce((total, point) => total + point.point_curr + point.profile_v + point.externalPoint, 0);
      item.totalPointsSum = sum;
    });
    arr.sort((a, b) => b.totalPointsSum - a.totalPointsSum);
    arr.forEach((item) => {
      sortdata.push(item.totalPointsSum);

      delete item.totalPointsSum;
    });

    return arr;
  }

  const sortedData = sortByPointsSum(data);
  console.log(sortedData);
  return (
    <>
      <div className="flex xl:flex-row flex-col">
        <div className="flex w-fit  flex-col  justify-between ">
          <div className="  h-1/2   flex flex-col  m-auto text-center justify-start  ">

            <div className="flex   ">
              <div className="flex flex-col justify-end  m-2 ">
                
                <div className="h-40  flex flex-col justify-end w-16 ml-2 bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-600 ">
                  <div className="font-bold text-white text-2xl text-center">{(sortedData[1].points[0].point_curr + sortedData[1].points[0].profile_v + sortedData[1].points[0].externalPoint) || (0)}</div>
                </div>
                <div className="font-medium text-xl text-gray-700 text-center">
                  {sortedData[2].ID.name}
                </div>
                <div className="font-normal  text-gray-700 text-center">
                  {sortedData[2].position}
                </div>
              </div>

              <div className="flex flex-col justify-end m-2">
                <div className="h-56 flex  flex-col ml-5 justify-end w-16  bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-600">
                  <div className="font-bold text-white text-2xl text-center">{sortedData[0].points[0].point_curr + sortedData[0].points[0].profile_v + sortedData[0].points[0].externalPoint}</div>
                </div>
                <div className="font-medium  text-xl text-gray-700 text-center">
                  {sortedData[0].ID.name}
                </div>
                <div className="font-normal  text-gray-700 text-center">
                  {sortedData[0].position}
                </div>
              </div>

              <div className="flex flex-col justify-end m-2 ">
               
                <div className="h-40  flex flex-col justify-end w-16 ml-2 bg-gradient-to-b from-yellow-500 via-yellow-400 to-yellow-600 ">
                  <div className="font-bold text-white text-2xl text-center">{(sortedData[2].points[0].point_curr + sortedData[2].points[0].profile_v + sortedData[2].points[0].externalPoint) || (0)}</div>
                </div>
                <div className="font-medium text-xl text-gray-700 text-center">
                  {sortedData[2].ID.name}
                </div>
                <div className="font-normal  text-gray-700 text-center">
                  {sortedData[2].position}
                </div>
              </div>
            </div>
            <div className='text-4xl tracking-wide font-sans my-4 font-bold'>LeaderBoard</div>
          </div>

          <div className="   "><Leaderboard data = {data} /> </div>

        </div>
        <div><Lsection data = {data} /></div>

      </div>
    </>
  );
}
