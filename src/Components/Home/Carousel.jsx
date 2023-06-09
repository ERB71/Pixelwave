import React from "react";
import Slider from "react-slick";
import "./Carousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const Carousel = () => {
    //Defeins the images to be included in the carousel
    const images = [
        { id: 1, src: require("./Images/England.jpg"), alt: "England Mens Home Shirt"},
        { id: 2, src: require("./Images/City.jpg"), alt: "Manchester City Home Shirt" },
        { id: 3, src: require("./Images/Arsenal.jpg"), alt: "Arsenal Home Shirt" },
        { id: 4, src: require("./Images/Dortmund.jpg"), alt: "Borussia Dortmund Home Shirt" },
    ];

    //Defines the settings for the carousel
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