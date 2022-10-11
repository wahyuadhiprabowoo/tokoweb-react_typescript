import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const Banner = () => {
  return (
    <Carousel
      autoPlay
      interval={3000}
      infiniteLoop
      showStatus={false}
      showThumbs={false}
      dynamicHeight={true}
      centerMode={true}
    >
      <div className="">
        <img src={require("../assets/1-2.png")} alt="carousel" />
        {/* <p className="legend"></p> */}
      </div>

      <div>
        <img src={require("../assets/1-3.png")} alt="carousel" />
      </div>
      <div>
        <img src={require("../assets/1-4.png")} alt="carousel" />
      </div>
      <div>
        <img src={require("../assets/1-5.png")} alt="carousel" />
      </div>
    </Carousel>
  );
};

export default Banner;

// import { Carousel } from "flowbite-react";
// import React from "react";

// function Banner() {
//   return (
//     <div>
//       <div className="h-56 my-4 sm:h-64 xl:h-80 2xl:h-96">
//         <Carousel slideInterval={5000}>
//           <img
//             src={require("../../assets/1.png")}
//             alt="..."
//             className="w-full h-full"
//           />
//           <img
//             src={require("../../assets/3.png")}
//             alt="..."
//             className="w-full h-full"
//           />
//           <img
//             src={require("../../assets/2.png")}
//             alt="..."
//             className="w-full h-full"
//           />
//           {/* <img src={require("../../assets/1.png")} alt="..." />
//           <img src={require("../../assets/2.png")} alt="..." /> */}
//         </Carousel>
//       </div>
//     </div>
//   );
// }

// export default Banner;
