import React from "react";
import logo from "../assets/logoREDESIGNED.png";

const Title = () => {
  return (
    <div className="flex justify-center items-center pt-0 pb-0">
      <h1 className="font-bold text-6xl text-[#431498] mr-6">MoodLens</h1>
      <img src={logo} alt="logo" className="h-28 w-28" />
    </div>
  );
};

export default Title;
