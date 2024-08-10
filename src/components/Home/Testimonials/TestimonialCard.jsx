import React from "react";

function TestimonialCard({ testimonials }) {
  return (
    <div className="testimonial__card">
      <div className="testimonial__card-content">
        <p>{testimonials.description}</p>
        <div className="testimonial__card-user">
          <img src={testimonials.image} alt="" />
          <h1>{testimonials.user}</h1>
        </div>
      </div>
      <div className="testimonial__card-bottom">
        <span className="testimonials__card-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="16"
            viewBox="0 0 15 16"
            fill="none"
          >
            <path
              d="M3.125 3.61845C3.125 3.01147 3.125 2.70798 3.25156 2.54068C3.36181 2.39494 3.53033 2.30475 3.71275 2.29386C3.92215 2.28136 4.17466 2.4497 4.6797 2.78639L11.2519 7.16788C11.6692 7.44608 11.8779 7.58518 11.9506 7.76051C12.0142 7.91379 12.0142 8.08606 11.9506 8.23935C11.8779 8.41467 11.6692 8.55377 11.2519 8.83198L4.6797 13.2135C4.17466 13.5502 3.92215 13.7185 3.71275 13.706C3.53033 13.6951 3.36181 13.6049 3.25156 13.4592C3.125 13.2919 3.125 12.9884 3.125 12.3814V3.61845Z"
              fill="white"
            />
          </svg>
        </span>
        <p>{testimonials.content}</p>
      </div>
    </div>
  );
}

export default TestimonialCard;
