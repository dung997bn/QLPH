import React from "react";
import { Link } from "react-router-dom";

const Carousel = ({ info }) => {
  const { login, isInProgress } = info;
  return (
    <div className="carousel carousel-slider center">
      <div className="carousel-fixed-item center">
        <Link
          to="#"
          onClick={login}
          disabled={isInProgress}
          style={{ textDecoration: "none", fontSize: "20px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width="230px"
            height="50px"
            viewBox="0 0 3278 522"
          >
            <rect
              className="fil0"
              x="200"
              y="2"
              width="2600"
              height="517"
              fill="black"
            />
            <rect x="280" y="129" width="122" height="122" fill="#F35325" />
            <rect x="420" y="129" width="122" height="122" fill="#81BC06" />
            <rect x="280" y="263" width="122" height="122" fill="#05A6F0" />
            <rect x="420" y="263" width="122" height="122" fill="#FFBA08" />
            <text x="670" y="357" fill="white" className="fnt0">
              Đăng nhập Office 365
            </text>
          </svg>
        </Link>
      </div>
      <a className="carousel-item" href="#one!">
        <img
          className="responsive-img"
          src="assets/images/Neu1.jpg"
          alt="Neu1"
          style={{ maxHeight: "600px" }}
        />
      </a>
      <a className="carousel-item" href="#two!">
        <img
          className="responsive-img"
          src="assets/images/Mrimg.png"
          alt="Mrimg"
          style={{ maxHeight: "600px" }}
        />
      </a>
      <a className="carousel-item" href="#three!">
        <img
          className="responsive-img"
          src="assets/images/CongTruong.png"
          alt="CongTruong"
          style={{ maxHeight: "600px" }}
        />
      </a>
    </div>
  );
};

export default Carousel;
