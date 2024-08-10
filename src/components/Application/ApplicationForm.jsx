import { useEffect, useState } from "react";
import { DefaultBtn } from "../../assets/components.styles";
import { TextField } from "@mui/material";

function ApplicationForm({ inputs, setInputs, setActiveStep, setActiveForm }) {
  
  const [isDisabled, setIsDisabled] = useState(true);

  const checkForm = (obj) => {
    return Object.values(obj).every((value) => value !== null && value !== "");
  };

  console.log(inputs, isDisabled);

  useEffect(() => {
    setIsDisabled(!checkForm(inputs));
  }, [inputs]);

  return (
    <form className="application__form">
      <div className="application__form-inputs">
        <TextField
          className="application__form-input"
          label="Full Name"
          variant="outlined"
          type="text"
          value={inputs.FullName}
          onChange={(e) => setInputs({ ...inputs, FullName: e.target.value })}
        />
        <TextField
          className="application__form-input"
          label="Email"
          variant="outlined"
          type="email"
          value={inputs.email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        />
      </div>
      <div className="application__upload">
        <div className="application__upload-content">
          <h1>Upload your CV</h1>
          <p>Upload your personal information.Make sure your file is proper.</p>
        </div>
        <div className="application__upload-input">
          <label>
            <div className="application__upload-input-content">
              <div>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="37"
                    height="36"
                    viewBox="0 0 37 36"
                    fill="none"
                  >
                    <path
                      d="M32.2286 16.3492L18.7052 29.8727C15.6298 32.948 10.6436 32.948 7.56825 29.8727C4.49287 26.7973 4.49287 21.8111 7.56825 18.7357L21.0917 5.21231C23.1419 3.16206 26.466 3.16206 28.5163 5.21231C30.5665 7.26256 30.5665 10.5867 28.5163 12.6369L15.5232 25.63C14.4981 26.6551 12.836 26.6551 11.8109 25.63C10.7858 24.6049 10.7858 22.9428 11.8109 21.9177L23.213 10.5156"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p>{inputs.Cv ? inputs.Cv.name : "Choose the file"}</p>
              </div>
              {!inputs.Cv && <p>Only PDF or DOCX file (max 2mb)</p>}
            </div>
            <input
              type="file"
              onChange={(e) =>
                setInputs({ ...inputs, Cv: e.target.files[0] })
              }
            />
          </label>
        </div>
      </div>
      <DefaultBtn
        disabled={isDisabled}
        onClick={() => {
          setActiveStep((prev) => prev + 1);
          setActiveForm(true);
        }}
      >
        Next
      </DefaultBtn>
    </form>
  );
}

export default ApplicationForm;
