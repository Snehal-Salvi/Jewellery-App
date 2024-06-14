import React from 'react'
import { Link } from 'react-router-dom';
import carouselPic1 from "../../assets/carousel1.png";
import carouselPic2 from "../../assets/carousel2.png";
import carouselPic3 from "../../assets/carousel3.png";
import carouselPic4 from "../../assets/carousel4.png";

export default function Home() {
  return (
    <div>
      <div 
        id="carouselExampleDark" 
        className="carousel carousel-dark slide" 
        data-bs-ride="carousel" 
        data-bs-interval="2000"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Link to="/search">
              <img src={carouselPic1} className="d-block w-100" alt="carousel" />
            </Link>
          </div>
          <div className="carousel-item">
            <Link to="/contact">
              <img src={carouselPic2} className="d-block w-100" alt="carousel" />
            </Link>
          </div>
          <div className="carousel-item">
          <Link to="/search">
            <img src={carouselPic3} className="d-block w-100" alt="carousel" />
            </Link>
          </div>
          <div className="carousel-item">
          <Link to="/contact">
            <img src={carouselPic4} className="d-block w-100" alt="carousel" />
            </Link>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}