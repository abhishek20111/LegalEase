import React, { useEffect, useState } from "react";
import Leaderboard from "./Leaderboard";
import Lsection from "./Lsection";
import axios from "axios";

export default function MainLeader() {


  const [data, setAllProfileData] = useState([]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/advanceProfile');
      setAllProfileData(response.data.A_Data)
      console.log(response.data.A_Data);
    } catch (error) {
      notify2('An error occurred while fetching user profiles.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [setAllProfileData]);



  // const data =
  //   [
  //     {
  //       "description": {
  //         "experience": {
  //           "year": 21,
  //           "winning": 1,
  //           "total_case": 5
  //         },
  //         "about": [
  //           "Name: Abhishek Sharma",
  //           "Title: Advocate at Legal Solutions LLP",
  //           "Location: New Delhi, India",
  //           "Phone: +91-9876543210",
  //           "Email: abhishek.sharma@email.com",
  //           "LinkedIn: linkedin.com/in/abhishek-sharma",
  //           "About Me:",
  //           "I am a dedicated and passionate advocate with a strong commitment to upholding the principles of justice and fairness. With over 10 years of experience in the legal field, I have successfully represented clients in a wide range of cases, from criminal defense to civil litigation. My goal is to provide effective legal solutions tailored to the unique needs of each client.",
  //           "Education:",
  //           "- LLB, National Law University, Delhi",
  //           "- LLM in Criminal Law, University of Mumbai",
  //           "Practice Areas:",
  //           "- Criminal Defense",
  //           "- Civil Litigation",
  //           "- Family Law",
  //           "- Real Estate Law",
  //           "- Corporate Law",
  //           "Languages Spoken:",
  //           "- English",
  //           "- Hindi",
  //           "I believe in the power of the law to make a positive impact on people's lives, and I am dedicated to ensuring that my clients' rights are protected. Whether you're facing a legal challenge or seeking legal advice, I am here to assist you every step of the way."
  //         ],
  //         "achievements": [
  //           "Professional Experience:",
  //           "Advocate at Legal Solutions LLP",
  //           "New Delhi, India | March 2010 - Present",
  //           "- Provide legal counsel and representation to clients in criminal defense cases, achieving favorable outcomes in numerous high-profile trials.",
  //           "- Handle complex civil litigation cases, including contract disputes, property disputes, and personal injury claims, with a strong track record of settlements in clients' favor.",
  //           "- Advise clients on family law matters, including divorce, child custody, and alimony, and represent them in court when necessary.",
  //           "- Assist corporate clients with legal compliance, contract drafting, and dispute resolution.",
  //           "- Specialize in real estate law, conducting due diligence, title searches, and property transactions.",
  //           "Associate Advocate at Smith & Johnson Law Firm",
  //           "Mumbai, India | May 2007 - February 2010",
  //           "- Worked closely with senior attorneys on a variety of legal cases, gaining valuable experience in research, case preparation, and court appearances.",
  //           "- Assisted in the drafting of legal documents, including contracts, pleadings, and motions.",
  //           "- Conducted legal research to support case strategies and ensure compliance with relevant laws and regulations.",
  //           "Internship at Supreme Court of India",
  //           "New Delhi, India | Summer 2006",
  //           "- Gained exposure to the highest judicial body in India, observing courtroom proceedings and assisting in legal research for landmark cases.",
  //           "Professional Memberships:",
  //           "- Member of the Bar Council of India",
  //           "- Delhi High Court Bar Association",
  //           "- Indian National Bar Association",
  //           "My extensive experience and commitment to achieving justice for my clients make me a trusted advocate in the legal community. I look forward to the opportunity to serve you and provide effective legal solutions tailored to your specific needs."
  //         ]
  //       },
  //       "id": "650d90ed4ee74a7a4217162a",
  //       "ID": {
  //         "_id": "650d84654ee74a7a421715d2",
  //         "name": "abhishek2001",
  //         "email": "abhishek2001@123",
  //         "role": "Admin",
  //         "Advance_id": [],
  //         "blockchain": [],
  //         "createdAt": "2023-09-22T12:11:17.808Z",
  //         "updatedAt": "2023-09-22T13:04:45.489Z",
  //         "v": 0,
  //         "photo": "https://res.cloudinary.com/dbvurfvz8/image/upload/v1695384776/bfokzgmc2sjn3jqwrvmx.jpg"
  //       },
  //       "uid": "2115000022",
  //       "phone_no": 7007862830,
  //       "title": "Advocate",
  //       "position": "Court Case",
  //       "avilable": false,
  //       "tag": ["Family Law"],
  //       "verifyUser": false,
  //       "address": "New Delhi, India | March 2010 ",
  //       "city": "Varanasi",
  //       "T_rating": "20",
  //       "review": [
  //         {
  //           "Id": "650dbecc6ea020b7ec33952d",
  //           "name": "Abhishek",
  //           "rating": "4",
  //           "description": "hi it is really good, I understand his concepts",
  //           "_id": "650dbf5c39b827197969f7d4"
  //         }
  //       ],
  //       "clientId": [],
  //       "document": [],
  //       "createdAt": "2023-09-22T13:04:45.606Z",
  //       "updatedAt": "2023-09-23T17:28:17.482Z",
  //       "v": 1,
  //       "points": []
  //     },
  //     {
  //       "description": {
  //         "experience": {
  //           "year": 8,
  //           "winning": 90,
  //           "total_case": 100
  //         },
  //         "about": [
  //           "I am a dedicated intellectual property lawyer with 8 years of experience. My expertise includes trademark and patent law. I have successfully protected my clients' intellectual assets and defended against infringement."
  //         ],
  //         "achievements": [
  //           "With a remarkable 90% success rate in intellectual property cases, I have handled 100 cases related to trademarks and patents. My commitment to safeguarding creative and innovative work is unwavering."
  //         ]
  //       },
  //       "_id": "650dab7d3b59035a84ae13f3",
  //       "ID": {
  //         "_id": "650daab43b59035a84ae13e5",
  //         "name": "Robert Louis",
  //         "email": "robertlouis@123",
  //         "role": "Admin",
  //         "Advance_id": [],
  //         "blockchain": [],
  //         "createdAt": "2023-09-22T14:54:44.131Z",
  //         "updatedAt": "2023-09-22T14:58:05.890Z",
  //         "v": 0,
  //         "photo": "https://res.cloudinary.com/dbvurfvz8/image/upload/v1695394529/ku8omq25klydqzk0swgt.jpg"
  //       },
  //       "uid": "2115000228",
  //       "phone_no": 1234567890,
  //       "title": "LLM in Intellectual Property Law",
  //       "position": "Legal Advisory",
  //       "avilable": true,
  //       "tag": ["Healthcare Law"],
  //       "verifyUser": true,
  //       "address": "101 Maple Lane, San Francisco, USA",
  //       "city": "Badami",
  //       "T_rating": "45",
  //       "review": [
  //         {
  //           "Id": "650e9f198f9f013b6318bf90",
  //           "name": "e",
  //           "rating": "5",
  //           "description": "good , such a nice website",
  //           "_id": "650e9f438f9f013b6318bf9a"
  //         },
  //         {
  //           "Id": "650e9f198f9f013b6318bf90",
  //           "name": "e",
  //           "rating": "5",
  //           "description": "good , such a nice website",
  //           "_id": "650e9f458f9f013b6318bf9e"
  //         },
  //         {
  //           "Id": "650e9f198f9f013b6318bf90",
  //           "name": "e",
  //           "rating": "4",
  //           "description": "hi hhh",
  //           "_id": "650ee5ceab90d1f2cb47e938"
  //         },
  //         {
  //           "Id": "650e9f198f9f013b6318bf90",
  //           "name": "e",
  //           "rating": "4",
  //           "description": "hi hhh",
  //           "_id": "650ee669ab90d1f2cb47e93e"
  //         },
  //         {
  //           "Id": "650e9f198f9f013b6318bf90",
  //           "name": "e",
  //           "rating": "4",
  //           "description": "hello nice",
  //           "_id": "650ee810c9863fe280241604"
  //         }
  //       ],
  //       "clientId": [],
  //       "document": [],
  //       "points": [
  //         {
  //           "point_curr": 0,
  //           "profile_v": 250,
  //           "externalPoint": 0,
  //           "_id": "650f215abe749768f2e41044"
  //         }
  //       ],
  //       "createdAt": "2023-09-22T14:58:05.997Z",
  //       "updatedAt": "2023-09-23T17:33:14.064Z",
  //       "v": 1
  //     },
  //     {
  //       "description": {
  //         "experience": {
  //           "year": 10,
  //           "winning": 80,
  //           "total_case": 200
  //         },
  //         "about": [
  //           "I am a dedicated family law attorney with a decade of experience. I specialize in divorce, child custody, and spousal support cases. My goal is to provide compassionate and effective legal solutions for families in transition"
  //         ],
  //         "achievements": [
  //           "Over the past 10 years, I have achieved an 80% success rate in family law cases, resolving 200 cases related to divorce, child custody, and alimony. I am committed to protecting the best interests of children and families."
  //         ]
  //       },
  //       "_id": "650dac943b59035a84ae1407",
  //       "ID": {
  //         "_id": "650dac0c3b59035a84ae13f9",
  //         "name": "Rakesh Sharma",
  //         "email": "rakeshsharma@123",
  //         "role": "Admin",
  //         "Advance_id": [],
  //         "blockchain": [],
  //         "createdAt": "2023-09-22T15:00:28.573Z",
  //         "updatedAt": "2023-09-22T15:02:44.235Z",
  //         "v": 0,
  //         "photo": "https://res.cloudinary.com/dbvurfvz8/image/upload/v1695394852/c35hcm3luywpsqzw9nk8.jpg"
  //       },
  //       "uid": "2115000069",
  //       "phone_no": 9456212080,
  //       "title": "JD in Family Law",
  //       "position": "Document Writing",
  //       "avilable": true,
  //       "tag": ["Intellectual Property"],
  //       "verifyUser": false,
  //       "address": "789 Pine Street, Seattle, USA",
  //       "city": "Lakshadweep",
  //       "T_rating": "0",
  //       "review": [],
  //       "clientId": [],
  //       "document": [],
  //       "points": [],
  //       "createdAt": "2023-09-22T15:02:44.338Z",
  //       "updatedAt": "2023-09-23T06:20:12.059Z",
  //       "v": 0
  //     },
  //     {
  //       "description": {
  //         "experience": {
  //           "year": 6,
  //           "winning": 85,
  //           "total_case": 75
  //         },
  //         "about": [
  //           "I am an environmental lawyer with 9 years of experience advocating for environmental protection and sustainability. My work involves legal actions against environmental violations and promoting green initiatives."
  //         ],
  //         "achievements": [
  //           "With an 85% success rate in environmental law cases, I have represented clients in 75 cases related to environmental protection, pollution control, and conservation. My commitment is to a greener future."
  //         ]
  //       },
  //       "_id": "650dae2f3b59035a84ae1430",
  //       "ID": {
  //         "_id": "650dadae3b59035a84ae1422",
  //         "name": "Raj Kumar",
  //         "email": "rajkumar@123",
  //         "role": "Admin",
  //         "Advance_id": [],
  //         "blockchain": [],
  //         "createdAt": "2023-09-22T15:07:26.493Z",
  //         "updatedAt": "2023-09-22T15:09:35.352Z",
  //         "v": 0,
  //         "photo": "https://res.cloudinary.com/dbvurfvz8/image/upload/v1695395300/k2da07breyodil1eqknk.jpg"
  //       },
  //       "uid": "2115000016",
  //       "phone_no": 7669987678,
  //       "title": "JD in Environmental Law",
  //       "position": "Legal Advisory",
  //       "avilable": true,
  //       "tag": ["Business and Corporate"],
  //       "verifyUser": true,
  //       "address": "789 Pine Street, Seattle, USA",
  //       "city": "Kargil",
  //       "T_rating": "23",
  //       "review": [],
  //       "clientId": [],
  //       "document": [],
  //       "points": [
  //         {
  //           "point_curr": 0,
  //           "profile_v": 290,
  //           "externalPoint": 0,
  //           "_id": "650f23180ebb874066981543"
  //         }
  //       ],
  //       "createdAt": "2023-09-22T15:09:35.530Z",
  //       "updatedAt": "2023-09-23T17:40:40.595Z",
  //       "v": 1
  //     },
  //     {
  //       "description": {
  //         "experience": {
  //           "year": 11,
  //           "winning": 78,
  //           "total_case": 300
  //         },
  //         "about": [
  //           "I am a seasoned business attorney with 11 years of experience in corporate law. I assist businesses in various legal matters, including contracts, mergers, and compliance. My goal is to facilitate growth and mitigate risks"
  //         ],
  //         "achievements": [
  //           "\"With a 78% success rate in business law cases, I have handled 300 cases related to corporate transactions, contract negotiations, and regulatory compliance. My dedication to business success is unwavering"
  //         ]
  //       },
  //       "_id": "650daec23b59035a84ae1444",
  //       "ID": {
  //         "_id": "650dae4b3b59035a84ae1436",
  //         "name": "Devandra Yadav",
  //         "email": "devandrayadav@123",
  //         "role": "Admin",
  //         "Advance_id": [],
  //         "blockchain": [],
  //         "createdAt": "2023-09-22T15:10:03.871Z",
  //         "updatedAt": "2023-09-22T15:12:02.136Z",
  //         "v": 0,
  //         "photo": "https://res.cloudinary.com/dbvurfvz8/image/upload/v1695395436/fsoz9zwllwgumf7wbbct.jpg"
  //       },
  //       "uid": "2115000567",
  //       "phone_no": 7007876699,
  //       "title": "JD in Business Law",
  //       "position": "Document Writing",
  //       "avilable": true,
  //       "tag": ["Intellectual Property"],
  //       "verifyUser": false,
  //       "address": "345 Oak Street, London, UK",
  //       "city": "Dera Gopipur",
  //       "T_rating": "0",
  //       "review": [
  //         {
  //           "Id": "650e9f198f9f013b6318bf90",
  //           "name": "e",
  //           "rating": "4",
  //           "description": "hi iit is good one 😁 ",
  //           "_id": "650ee539ab90d1f2cb47e91f"
  //         },
  //         {
  //           "Id": "650e9f198f9f013b6318bf90",
  //           "name": "e",
  //           "rating": "4",
  //           "description": "hi iit is good one 😁 ",
  //           "_id": "650ee539ab90d1f2cb47e923"
  //         },
  //         {
  //           "Id": "650e9f198f9f013b6318bf90",
  //           "name": "e",
  //           "rating": "4",
  //           "description": "hi done ",
  //           "_id": "650ee896c9863fe28024163d"
  //         }
  //       ],
  //       "clientId": [],
  //       "document": [],
  //       "points": [],
  //       "createdAt": "2023-09-22T15:12:02.257Z",
  //       "updatedAt": "2023-09-23T13:31:02.027Z",
  //       "v": 0
  //     },
  //     {
  //       "description": {
  //         "experience": {
  //           "year": 7,
  //           "winning": 88,
  //           "total_case": 120
  //         },
  //         "about": [
  //           "I am a passionate personal injury lawyer with 7 years of experience. I represent individuals injured in accidents, seeking justice and fair compensation. My commitment is to ensure the well-being of my clients."
  //         ],
  //         "achievements": [
  //           "With an 88% success rate in personal injury cases, I have resolved 120 cases involving accidents, medical malpractice, and wrongful death. My dedication to my clients' recovery is unwavering."
  //         ]
  //       },
  //       "_id": "650daf7f3b59035a84ae145c",
  //       "ID": {
  //         "_id": "650daedb3b59035a84ae144a",
  //         "name": "Devanshu Yadav",
  //         "email": "devanshuyadav@123",
  //         "role": "Admin",
  //         "Advance_id": [],
  //         "blockchain": [],
  //         "createdAt": "2023-09-22T15:12:27.610Z",
  //         "updatedAt": "2023-09-22T15:15:11.148Z",
  //         "v": 0,
  //         "photo": "https://res.cloudinary.com/dbvurfvz8/image/upload/v1695395703/nqvvvkcnlmiul92n1mkn.jpg"
  //       },
  //       "uid": "2115000276",
  //       "phone_no": 9456802345,
  //       "title": "JD in Personal Injury Law",
  //       "position": "Taxes",
  //       "avilable": true,
  //       "tag": ["IRS Representation"],
  //       "verifyUser": true,
  //       "address": "222 Birch Lane, Chicago, USA",
  //       "city": "Dadra",
  //       "T_rating": "0",
  //       "review": [],
  //       "clientId": [],
  //       "document": [],
  //       "points": [
  //         {
  //           "point_curr": 0,
  //           "profile_v": 270,
  //           "externalPoint": 0,
  //           "_id": "650f23207fbd333394d05e06"
  //         }
  //       ],
  //       "createdAt": "2023-09-22T15:15:11.229Z",
  //       "updatedAt": "2023-09-23T17:40:48.809Z",
  //       "v": 1
  //     },
  //     {
  //       "description": {
  //         "experience": {
  //           "year": 10,
  //           "winning": 55,
  //           "total_case": 500
  //         },
  //         "about": [
  //           "I am a certified tax professional with a decade of experience in taxes and financial planning. My expertise encompasses tax planning, compliance, and IRS representation. I am dedicated to helping individuals and businesses navigate the complexities of taxation."
  //         ],
  //         "achievements": [
  //           "Over the past 10 years, I have successfully handled 500 tax-related cases, assisting clients in tax planning, compliance, and representing them before the IRS. My goal is to minimize tax liabilities and ensure financial stability."
  //         ]
  //       },
  //       "_id": "650db0813b59035a84ae1474",
  //       "ID": {
  //         "_id": "650dafe63b59035a84ae1462",
  //         "name": "Raveena Chopra",
  //         "email": "raveenachopra@123",
  //         "role": "Admin",
  //         "Advance_id": [],
  //         "blockchain": [],
  //         "createdAt": "2023-09-22T15:16:54.914Z",
  //         "updatedAt": "2023-09-22T15:19:28.925Z",
  //         "v": 0,
  //         "photo": "https://res.cloudinary.com/dbvurfvz8/image/upload/v1695395962/n1nc9pwyyz0sd46gv0nn.jpg"
  //       },
  //       "uid": "2115000456",
  //       "phone_no": 8449497234,
  //       "title": " Certified Tax Professional",
  //       "position": "Legal Advisory",
  //       "avilable": true,
  //       "tag": ["Intellectual Property"],
  //       "verifyUser": true,
  //       "address": "543 Cedar Street, San Francisco, USA",
  //       "city": "Diu",
  //       "T_rating": "45",
  //       "review": [],
  //       "clientId": [],
  //       "document": [],
  //       "points": [],
  //       "createdAt": "2023-09-22T15:19:28.999Z",
  //       "updatedAt": "2023-09-23T17:40:57.158Z",
  //       "v": 1
  //     },
  //     {
  //       "description": {
  //         "experience": {
  //           "year": 8,
  //           "winning": 92,
  //           "total_case": 150
  //         },
  //         "about": [
  //           "I am a dedicated immigration attorney with 8 years of experience. My practice focuses on immigration law, including visas, green cards, and deportation defense. I am passionate about helping individuals achieve their American dream."
  //         ],
  //         "achievements": [
  //           "With a 92% success rate, I have represented clients in 150 immigration cases, obtaining visas, green cards, and successfully defending against deportation. I am dedicated to uniting families and providing opportunities for a better future."
  //         ]
  //       },
  //       "_id": "650db0f13b59035a84ae148e",
  //       "ID": {
  //         "_id": "650db01e3b59035a84ae1480",
  //         "name": "Lina Patel",
  //         "email": "linapatel@123",
  //         "role": "Admin",
  //         "Advance_id": [],
  //         "blockchain": [],
  //         "createdAt": "2023-09-22T15:20:46.121Z",
  //         "updatedAt": "2023-09-22T15:22:49.163Z",
  //         "v": 0,
  //         "photo": "https://res.cloudinary.com/dbvurfvz8/image/upload/v1695395703/nqvvvkcnlmiul92n1mkn.jpg"
  //       },
  //       "uid": "2115000234",
  //       "phone_no": 9988776655,
  //       "title": "JD in Immigration Law",
  //       "position": "Taxes",
  //       "avilable": true,
  //       "tag": ["Family Law"],
  //       "verifyUser": true,
  //       "address": "123 Oak Avenue, New York, USA",
  //       "city": "Bengaluru",
  //       "T_rating": "23",
  //       "review": [],
  //       "clientId": [],
  //       "document": [],
  //       "points": [
  //         {
  //           "point_curr": 0,
  //           "profile_v": 300,
  //           "externalPoint": 0,
  //           "_id": "650f23407fbd333394d05e0f"
  //         }
  //       ],
  //       "createdAt": "2023-09-22T15:22:49.245Z",
  //       "updatedAt": "2023-09-23T17:41:04.531Z",
  //       "v": 1
  //     },
  //     {
  //       "description": {
  //         "experience": {
  //           "year": 9,
  //           "winning": 94,
  //           "total_case": 180
  //         },
  //         "about": [
  //           "I am a passionate criminal defense attorney with 9 years of experience. My practice is dedicated to defending individuals accused of crimes, ensuring their rights are protected and they receive a fair trial."
  //         ],
  //         "achievements": [
  //           "With a 94% success rate in criminal defense cases, I have represented clients in 180 cases ranging from misdemeanors to felonies. My commitment is to provide legal defense that upholds justice and the rights of the accused."
  //         ]
  //       },
  //       "_id": "650db16b3b59035a84ae1496",
  //       "ID": {
  //         "_id": "650db0e83b59035a84ae1488",
  //         "name": "Sandeep Verma",
  //         "email": "sandeepverma@123",
  //         "role": "Admin",
  //         "Advance_id": [],
  //         "blockchain": [],
  //         "createdAt": "2023-09-22T15:23:55.833Z",
  //         "updatedAt": "2023-09-22T15:25:48.913Z",
  //         "v": 0,
  //         "photo": "https://res.cloudinary.com/dbvurfvz8/image/upload/v1695395703/nqvvvkcnlmiul92n1mkn.jpg"
  //       },
  //       "uid": "2115000467",
  //       "phone_no": 7687689900,
  //       "title": "JD in Criminal Defense",
  //       "position": "Document Writing",
  //       "avilable": true,
  //       "tag": ["Personal Injury"],
  //       "verifyUser": true,
  //       "address": "987 Elm Street, Los Angeles, USA",
  //       "city": "Gangtok",
  //       "T_rating": "0",
  //       "review": [],
  //       "clientId": [],
  //       "document": [],
  //       "points": [
  //         {
  //           "point_curr": 0,
  //           "profile_v": 310,
  //           "externalPoint": 0,
  //           "_id": "650f236d7fbd333394d05e18"
  //         }
  //       ],
  //       "createdAt": "2023-09-22T15:25:49.004Z",
  //       "updatedAt": "2023-09-23T17:41:12.650Z",
  //       "v": 1
  //     }
  //   ]
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
