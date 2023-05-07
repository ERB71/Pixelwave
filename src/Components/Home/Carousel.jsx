import React from "react";
import Slider from "react-slick";
import "./Carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Carousel = () => {
    const images = [
        { id: 1, src: require("./Images/England.jpg"), alt: "England Mens Home Shirt"},
        { id: 2, src: require("./Images/City.jpg"), alt: "Manchester City Home Shirt" },
        { id: 3, src: require("./Images/Arsenal.jpg"), alt: "Arsenal Home Shirt" },
        { id: 4, src: require("./Images/Bayern.jpg"), alt: "Bayern Munich Home Shirt" },
    ];

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
    };
  
    return (
        <div className="slider-wrapper">
            <Slider {...settings}>
                {images.map((image) => (
                <div key={image.id}>
                    <img src={image.src} alt={image.alt}  className="slider-image" />
                </div>
                ))}
            </Slider>
        </div>
    );
  };

  export default Carousel