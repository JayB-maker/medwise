import Link from "next/link";
import Lottie from "react-lottie-player";
import Spin from "@/assets/json/dot-loader.json";
import LoadingIcon from "@/assets/images/loader.svg";
import Image from "next/image";

import React from "react";
const style = { height: "70px", width: "70px" };

export default function PageLoader() {
  return (
    <div className="flex flex-col justify-between items-center">
      <Image src={LoadingIcon} alt="" />
      <div className="flex items-center">
        <p className="translate-x-6">Loading</p>
        <Lottie animationData={Spin} style={style} play />
      </div>
    </div>
  );
}
