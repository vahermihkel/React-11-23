import React from 'react'
import Lottie from "lottie-react";
                // css --> images
import notFound from "../../images/NotFound.json";

//  npm install lottie-react


function NotFound() {
  const lottieProps = {
    loop: true,
    animationData: notFound,
    style: {
    width: '90vw',
    height: '300px',
    speed: 1,
  },
};

return (
    <div className="center">
      <Lottie {...lottieProps} />
    </div>
);
}

export default NotFound