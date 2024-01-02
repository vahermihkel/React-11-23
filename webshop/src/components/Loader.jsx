import React from 'react'
import loader from "../images/Loader.json";
import Lottie from "lottie-react";

const Loader = ({loaderWidth, loaderHeight}) => {
    const lottieProps = {
      loop: true,
      animationData: loader,
      style: {
      width: loaderWidth,
      height: loaderHeight,
      speed: 1
    }
  }

  return (
    <div className="center">
      <Lottie {...lottieProps} />
    </div>
  )
}

export default Loader