import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./golbal.css";
import previous from "./previous_icon.svg";
import next from "./Next_icon.svg";

let customer = [
  {
    cus_img:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9jdW1lbnQlMjBwcmVwYXJhdGlvbnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
    cus_mainTitle: "Document Preparation",
    cus_subTitle: "Effortless Legal Document Creation",
    cus_content:
      "The platform can connect users with document writers who can help them prepare legal documents such as wills, contracts, agreements, and affidavits",
  },
  {
    cus_img:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8Z2VuZXJhbCUyMGxlZ2FsJTIwYWR2aWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
    cus_mainTitle: "General Legal Advice",
    cus_subTitle: "Expert Guidance on Legal Matters",
    cus_content:
      "Users can seek general legal advice on various legal matters,",
  },
  {
    cus_img:
      "https://plus.unsplash.com/premium_photo-1661559051049-f9e147c7a90b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVkaWF0aW9uJTIwc2VydmljZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
    cus_mainTitle: "Mediation Services",
    cus_subTitle: "Resolve Conflicts Amicably",
    cus_content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel, orci lectus neque nascetur amet, suscipit feugiat. Et, diam tristique quisque platea viverra amet, eget.",
  },
  {
    cus_img:
      "https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJiaXRhcnklMjBzZXJ2aWNlfGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
    cus_mainTitle: "Arbitration Services",
    cus_subTitle: "Swift Dispute Resolution",
    cus_content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel, orci lectus neque nascetur amet, suscipit feugiat. Et, diam tristique quisque platea viverra amet, eget.",
  },
  {
    cus_img:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGVnYWwlMjByZXNlYXJjaHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60",
    cus_mainTitle: "Legal Research",
    cus_subTitle: "In-Depth Legal Insights",
    cus_content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel, orci lectus neque nascetur amet, suscipit feugiat. Et, diam tristique quisque platea viverra amet, eget.",
  },
  {
    cus_img:
      "https://images.unsplash.com/photo-1473186505569-9c61870c11f9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHNwZWNpYWxpemVkJTIwc2VyaWNlJTIwbGF3fGVufDB8fDB8fHww&auto=format&fit=crop&w=400&q=60",
    cus_mainTitle: "Specialized Services",
    cus_subTitle: "Tailored Legal Solutions",
    cus_content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel, orci lectus neque nascetur amet, suscipit feugiat. Et, diam tristique quisque platea viverra amet, eget.",
  },
  {
    cus_img:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGVnYWwlMjBtYXJrZXRwbGFjZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60",
    cus_mainTitle: "Legal Marketplace",
    cus_subTitle: "Competitive Rates, Quality Services",
    cus_content:
      "The platform can be designed to be accessible to citizens from all socio-economic backgrounds.",
  },
  {
    cus_img:
      "https://images.unsplash.com/photo-1505664194779-8beaceb93744?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGVnYWwlMjBhaWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=400&q=60",
    cus_mainTitle: "Legal Aid",
    cus_subTitle: "Accessible Legal Assistance",
    cus_content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel, orci lectus neque nascetur amet, suscipit feugiat. Et, diam tristique quisque platea viverra amet, eget.",
  },
];

export default function Blog() {
  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style }} onClick={onClick}>
        <img src={next} alt="" className="w-2.5" />
      </div>
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <img src={previous} alt="previous" className="w-2.5" />
      </div>
    );
  }

  const settings_first = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: true,
          dots: false,
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          arrows: false,
          slidesToShow: 1,
          dots: true,
        },
      },
    ],
  };

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="mt-10 md:my-20 min-h-[440px] m-auto flex flex-col gap-5 lg:gap-12 xl:max-w-[1000px]">
        <div className="lg:text-[40px] text-center sm:text-[30px] text-4xl m-2 tracking-wide font-sans font-bold">
          Services we provide
        </div>
        <div className="mb-5 px-5 flex template justify-center xl:max-w-[1000px]">
          <Slider {...settings_first} className="flex justify-center">
            {customer.map((data, index) => {
              return (
                <div key={index} className="">
                  <div class="w-full  p-2">
                    <a
                      href=""
                      class="c-card block bg-white rounded-lg overflow-hidden"
                    >
                      <div class="relative pb-48 overflow-hidden">
                        <img
                          class="absolute inset-0 h-full w-full object-cover rounded-lg"
                          src={data.cus_img}
                          alt=""
                        />
                      </div>
                      <div className="">
                        <div class="p-4 hover:shadow-xl block">
                          <span class="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
                            {data.cus_mainTitle}
                          </span>
                          <h2 class="mt-2 mb-2  font-bold">
                            {data.cus_subTitle}
                          </h2>
                          <p class="text-light text-gray-600">
                            {data.cus_content}
                          </p>
                          <div class="mt-3 flex items-center"></div>
                        </div>
                        <div class="p-4 flex items-center text-sm text-gray-600">
                          <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                          <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>
                          <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>

                          <path d="M8.128 19.825a1.586 1.586 0 0 1-1.643-.117 1.543 1.543 0 0 1-.53-.662 1.515 1.515 0 0 1-.096-.837l.736-4.247-3.13-3a1.514 1.514 0 0 1-.39-1.569c.09-.271.254-.513.475-.698.22-.185.49-.306.776-.35L8.66 7.73l1.925-3.862c.128-.26.328-.48.577-.633a1.584 1.584 0 0 1 1.662 0c.25.153.45.373.577.633l1.925 3.847 4.334.615c.29.042.562.162.785.348.224.186.39.43.48.704a1.514 1.514 0 0 1-.404 1.58l-3.13 3 .736 4.247c.047.282.014.572-.096.837-.111.265-.294.494-.53.662a1.582 1.582 0 0 1-1.643.117l-3.865-2-3.865 2z"></path>

                          <svg
                            viewBox="0 0 24 24"
                            class="h-4 w-4 fill-current text-gray-400"
                          >
                            <path></path>
                          </svg>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
              
      </div>
    </>
  );
}
