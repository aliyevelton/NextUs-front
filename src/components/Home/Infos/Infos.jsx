import React from "react";
import infosImg from "../../../assets/images/infos-image.png";
import { DefaultBtn } from "../../../assets/components.styles";
import { Link } from "react-router-dom";
function Infos() {
  return (
    <section id="infos">
      <div className="infos__container">
        <div className="infos__row">
          <img src={infosImg} alt="Infos Image" />
          <div>
            <h1>Our Online Education is Smart & Effective </h1>
            <p>
              Our online education can be a convenient and flexible option for
              students who attend traditional in-person classes due to their
              location, schedule.
            </p>
            <Link to="/courses">
            <DefaultBtn>Get Started</DefaultBtn>
          </Link>
          </div>
        </div>
        <div className="infos__row">
          <div>
            <h1>Our Online Education is Smart & Effective </h1>
            <p>
              Our online education can be a convenient and flexible option for
              students who attend traditional in-person classes due to their
              location, schedule.
            </p>
            <Link to="/courses">
            <DefaultBtn>Get Started</DefaultBtn>
          </Link>
          </div>
          <img src={infosImg} alt="Infos Image" />
        </div>
      </div>
    </section>
  );
}

export default Infos;
