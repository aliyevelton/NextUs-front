import React from "react";
import infosImg from "../../../assets/images/infos-image.png";
import { DefaultBtn } from "../../../assets/components.styles";
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
            <DefaultBtn>Get Started</DefaultBtn>
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
            <DefaultBtn>Get Started</DefaultBtn>
          </div>
          <img src={infosImg} alt="Infos Image" />
        </div>
      </div>
    </section>
  );
}

export default Infos;
