import React from "react";
import { DefaultBtn } from "../../assets/components.styles";
import errorImage from "../../assets/images/error-image.png";
import { Link, useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();

  return (
    <section id="error">
      <div className="error__container">
        <div className="error__left">
          <div className="error__content">
            <h3>404 error</h3>
            <h1>Page not found</h1>
            <p>
              Sorry, the page you are looking for doesn't exist.Here are some
              helpful links:
            </p>
          </div>
          <div className="error__buttons">
            <DefaultBtn onClick={() => navigate(-1)}>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="21"
                  viewBox="0 0 20 21"
                  fill="none"
                >
                  <path
                    d="M15.8327 10.5H4.16602M4.16602 10.5L9.99935 16.3333M4.16602 10.5L9.99935 4.66666"
                    stroke="#5F5F5F"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              Go back
            </DefaultBtn>
            <Link to="/">
              <DefaultBtn>Take me home</DefaultBtn>
            </Link>
          </div>
        </div>
        <div className="error__right">
          <img src={errorImage} alt="Error Image" />
        </div>
      </div>
    </section>
  );
}

export default Error;
