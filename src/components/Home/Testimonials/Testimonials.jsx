import React from "react";
import TestimonialCard from "./TestimonialCard";

function Testimonials() {
  const testimonials = [
    {
      description:
        "“I am proud to say that after a few months of taking this course I passed my exam and now an AWS Certified Cloud Practitioner! This content was exactly what the CCP exam covered.”",
      user: "Will Amber",
      content: "(New) Ultimate AWS Certified Cloud Practitioner -2020",
      image: "https://imgs.search.brave.com/L8g0q2VTDqc0PX3hfAVBBNx6gKLd9JE0Gld8jH4BjvQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE5/NDAwODEwL3Bob3Rv/L21yLXdoby5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9aGFy/VHhXX0lSbDA2Q25o/LTRrbkNudHh3WWlx/V282eWlBeEpUcld5/U0ppRT0",
    },
    {
      description:
        "“I am proud to say that after a few months of taking this course I passed my exam and now an AWS Certified Cloud Practitioner! This content was exactly what the CCP exam covered.”",
      user: "Will Amber",
      content: "(New) Ultimate AWS Certified Cloud Practitioner -2020",
      image: "https://imgs.search.brave.com/L8g0q2VTDqc0PX3hfAVBBNx6gKLd9JE0Gld8jH4BjvQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE5/NDAwODEwL3Bob3Rv/L21yLXdoby5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9aGFy/VHhXX0lSbDA2Q25o/LTRrbkNudHh3WWlx/V282eWlBeEpUcld5/U0ppRT0",
    },
    {
      description:
        "“I am proud to say that after a few months of taking this course I passed my exam and now an AWS Certified Cloud Practitioner! This content was exactly what the CCP exam covered.”",
      user: "Will Amber",
      content: "(New) Ultimate AWS Certified Cloud Practitioner -2020",
      image: "https://imgs.search.brave.com/L8g0q2VTDqc0PX3hfAVBBNx6gKLd9JE0Gld8jH4BjvQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvNjE5/NDAwODEwL3Bob3Rv/L21yLXdoby5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9aGFy/VHhXX0lSbDA2Q25o/LTRrbkNudHh3WWlx/V282eWlBeEpUcld5/U0ppRT0",
    },
  ];

  return (
    <section id="testimonials">
      <div className="testimonials__container">
        <h1 className="testimonials__top">
          How learners like you achieve their goal
        </h1>
        <div className="testimonials__bottom">
          {testimonials.map((testimonial, item) => (
            <TestimonialCard key={item} testimonials={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
