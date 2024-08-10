import { useState } from "react";
import ApplicationLetter from "./ApplicationLetter";
import ApplicationForm from "./ApplicationForm";
import { useLocation } from "react-router-dom";

function Application({ collection, inputs, setInputs, setActiveModal }) {
  const [activeStep, setActiveStep] = useState(1);
  const [activeForm, setActiveForm] = useState(false);

  const location = useLocation();

  const path = location.pathname.split("/").filter((x) => x !== "");
  const index = Number(path[path.length - 1]);

  const detailedData = collection.find((item) => item.id === index);
  console.log(detailedData);
  

  const steps = ["Personal information", "Motivation letter"];
  return (
    <section id="application">
      <div className="application__container">
        <div className="application__top">
          <span onClick={() => history.back()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
            >
              <path
                d="M16.25 6.5L9.75 13L16.25 19.5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <div className="application__header">
            <h1>Apply for “{detailedData?.position}” role in {detailedData?.company.name}</h1>
            <p>Make sure you fill correct information about yourself.</p>
          </div>
        </div>
        <div className="application__bottom">
          <div className="application__progress">
            {steps.map((step, index) => {
              return (
                <div key={index} className="application__progress-row">
                  <div
                    className={`application__progress-step ${activeStep === index + 1
                      ? "active"
                      : activeStep >= index + 1
                        ? "completed"
                        : ""
                      }`}
                  >
                    <span>{index + 1}</span>
                    <p>{step}</p>
                  </div>
                  <div
                    key={index}
                    className="application__progress-passage"
                  ></div>
                </div>
              );
            })}
          </div>

          {!activeForm ? (
            <ApplicationForm
              inputs={inputs}
              setInputs={setInputs}
              setActiveForm={setActiveForm}
              setActiveStep={setActiveStep}
            />
          ) : (
            <ApplicationLetter
              inputs={inputs}
              setInputs={setInputs}
              setActiveModal={setActiveModal}
              setActiveForm={setActiveForm}
              setActiveStep={setActiveStep}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Application;
