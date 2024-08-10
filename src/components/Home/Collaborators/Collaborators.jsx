import React from "react";
import collabLogo from "../../../assets/images/collab.svg";

function Collaborators() {
  const collabs = [collabLogo, collabLogo, collabLogo, collabLogo];
  return (
    <section id="collaborators">
      <div className="collaborators__container">
        <h1 className="collaborators__top">
          Over 100 Universities and Companies Collaborate With Us{" "}
        </h1>
        <div className="collaborators__bottom">
          {collabs.map((collab, item) => (
            <img key={item} src={collab} alt={"Collaborator" + item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Collaborators;
