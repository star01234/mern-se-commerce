import React from "react";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
      <div className="py-12 flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          Unleash Your Inner <span className="text-red">Geek</span>:<br />
          Shop Our Exclusive Tech-themed Merchandise!
        </h1>
        <p className="text-base md:text-lg text-gray-700 mb-8 max-w-2xl">
          We offer a curated selection of high-quality products ranging from
          clothing and accessories to home decor and office essentials. Each
          item is carefully chosen to meet our standards of quality,
          functionality, and style.
        </p>
        <button className="px-6 py-3 bg-red text-white rounded-full hover:bg-red-700 transition-all duration-300">
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Banner;
