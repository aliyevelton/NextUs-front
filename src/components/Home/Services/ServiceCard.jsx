import React from "react";

function ServiceCard({ service }) {
  return (
    <div className="service__card">
      <span>
        <img src={service.icon} alt="Service Icon" />
      </span>
      <div className="service__card-content">
        <h1>{service.title}</h1>
        <p>{service.description}</p>
      </div>
    </div>
  );
}

export default ServiceCard;
