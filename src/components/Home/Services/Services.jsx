import React from "react";
import serviceIcon1 from "../../../assets/images/services-icon-1.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import ServiceCard from "./ServiceCard";

function Services() {
  const services = [
    {
      icon: serviceIcon1,
      title: "Courses",
      description:
        "Free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses",
    },
    {
      icon: serviceIcon1,
      title: "Courses",
      description:
        "Free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses",
    },
    {
      icon: serviceIcon1,
      title: "Job Applications",
      description:
        "Free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses",
    },
    {
      icon: serviceIcon1,
      title: "Meet-ups",
      description:
        "Free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses",
    },
    {
      icon: serviceIcon1,
      title: "Meet-ups",
      description:
        "Free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses",
    },
    {
      icon: serviceIcon1,
      title: "Meet-ups",
      description:
        "Free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses",
    },
    {
      icon: serviceIcon1,
      title: "Meet-ups",
      description:
        "Free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses free courses",
    },
  ];

  return (
    <section id="services">
      <div className="services__container">
        <h1 className="services__top">Services</h1>
        <div className="services__bottom">
          <button className="swiper-custom-prev">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M16.25 6.5L9.75 13L16.25 19.5"
                stroke="#F7F7F7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              prevEl: ".swiper-custom-prev",
              nextEl: ".swiper-custom-next",
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {services.map((service, item) => (
              <SwiperSlide key={item}>
                <ServiceCard service={service} />
              </SwiperSlide>
            ))}
          </Swiper>
          <button className="swiper-custom-next">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M9.75 19.5L16.25 13L9.75 6.5"
                stroke="#F7F7F7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Services;
