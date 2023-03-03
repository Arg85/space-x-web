import React from "react";
import S from "../Assets/Space-X.jpg";
import "../Styles/Banner.css";
const Banner = () => {

//   console.log(scrolly, MainContext, "scrolly");
  return (
    <div className="relative bg-gray-900 h-screen">
      <img
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={S}
        alt=""
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gray-900 opacity-70"></div>
      <div className=" BannerContent relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 lg:py-32">
          <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
            Learn More About
            <span className="text-indigo-600"> Space-X Capsules</span>
          </h1>
          <div className="mt-8 d-flex align-items-center justify-center">
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
              <svg
                class="fill-current w-4 h-4 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
              </svg>
              <span
             
              >
                Take Me there
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
