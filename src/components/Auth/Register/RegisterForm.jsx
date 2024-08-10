import React, { useEffect, useState } from "react";
import { DefaultBtn, DefaultInput } from "../../../assets/components.styles";
import { TextField } from "@mui/material";
import siteLogo from "../../../assets/images/site-logo-auth.png";
import { Link } from "react-router-dom";
import axios from "axios";
function RegisterForm() {
  const [hidePass, setHidePass] = useState(false);
  const [registeredUser, setRegisteredUser] = useState({
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [checkInputs, setCheckInput] = useState(false);
  const url = "https://aliyevelton-001-site1.ltempurl.com/api/User/Register";
  const checkValidation = () => {
    const checkSymbolsRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const checkUppercaseRegex = /[A-Z]/;
    const checkLowercaseRegex = /[a-z]/;

    const validationErrors = {};
    if (!registeredUser.name.trim())
      validationErrors.name = "Name is required!";
    if (!registeredUser.username.trim())
      validationErrors.username = "Username is required!";
    if (!registeredUser.surname.trim())
      validationErrors.surname = "Surname is required!";
    if (!registeredUser.email.trim)
      validationErrors.email = "Email is required!";
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(registeredUser.email))
      validationErrors.email = "Email is not valid!";
    if (!registeredUser.password.trim())
      validationErrors.password = ["Password is required"];
    else {
      const errorMessages = [];
      if (!checkUppercaseRegex.test(registeredUser.password)) {
        errorMessages.push(
          "Password must contain at least one uppercase letter."
        );
      }
      if (!checkSymbolsRegex.test(registeredUser.password)) {
        errorMessages.push(
          "Password must contain at least one special character (@#$%)."
        );
      }
      if (!checkLowercaseRegex.test(registeredUser.password)) {
        errorMessages.push(
          "Password must contain at least one lowercase letter."
        );
      }
      if (registeredUser.password.length < 8) {
        errorMessages.push("Password length should be at least 8 characters.");
      }
      if (errorMessages.length > 0) {
        validationErrors.password = errorMessages;
      }
    }
    if (!registeredUser.confirmPassword.trim())
      validationErrors.confirmPassword = "Confirm password is required!";
    else if (registeredUser.password !== registeredUser.confirmPassword)
      validationErrors.confirmPassword = "Password not matched!";
    setErrors(validationErrors);
  };

  useEffect(() => {
    if (checkInputs) {
      checkValidation();
    }
  }, [registeredUser]);

  const formSubmit = (e) => {
    e.preventDefault();
    checkValidation();
    setCheckInput(true);
    axios.post(url, registeredUser).then((res) => {console.log(res); alert("please verify email")});
    // setRegisteredUser({
    //   ...registeredUser,
    //   name: "",
    //   surname: "",
    //   email: "",
    //   password: "",
    // });
  };

  return (
    <div className="auth__register">
      <div className="auth__register-logo">
        <Link to="/">
          <img src={siteLogo} alt="" />
        </Link>
      </div>
      <div className="auth__register-container">
        <div className="auth__register-header">
          <h1>Sign up</h1>
          <p>Sign up to enjoy the feature of Revolutie</p>
        </div>
        <form onSubmit={formSubmit}>
          <div className="register-input">
            <TextField
              value={registeredUser.name}
              label="Your Name"
              variant="outlined"
              type="text"
              onChange={(e) => {
                setRegisteredUser({ ...registeredUser, name: e.target.value });
              }}
            />
            {errors.name && (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.name}</p>
              </div>
            )}
          </div>
          <div className="register-input">
            <TextField
              value={registeredUser.surname}
              label="Your Surname"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setRegisteredUser({
                  ...registeredUser,
                  surname: e.target.value,
                })
              }
            />
            {errors.surname && (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.surname}</p>
              </div>
            )}
          </div>
          <div className="register-input">
            <TextField
              value={registeredUser.username}
              label="Username"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setRegisteredUser({
                  ...registeredUser,
                  username: e.target.value,
                })
              }
            />
            {errors.username && (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.username}</p>
              </div>
            )}
          </div>
          <div className="register-input">
            <TextField
              value={registeredUser.email}
              label="Email"
              variant="outlined"
              type="text"
              onChange={(e) =>
                setRegisteredUser({ ...registeredUser, email: e.target.value })
              }
            />
            {errors.email && (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.email}</p>
              </div>
            )}
          </div>
          <div className="register-input">
            <div className="auth__register-password">
              <TextField
                value={registeredUser.password}
                onChange={(e) =>
                  setRegisteredUser({
                    ...registeredUser,
                    password: e.target.value,
                  })
                }
                label="Password"
                variant="outlined"
                type={hidePass ? "text" : "password"}
              />
              <span
                className="password-show"
                onClick={() => setHidePass(!hidePass)}
              >
                {hidePass ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
            {errors.password &&
              errors.password.map((item, index) => (
                <div key={index} className="error-validation">
                  <span>*</span>
                  <p>{item}</p>
                </div>
              ))}
          </div>
          <div className="register-input">
            <div className="auth__register-password">
              <TextField
                value={registeredUser.confirmPassword}
                onChange={(e) =>
                  setRegisteredUser({
                    ...registeredUser,
                    confirmPassword: e.target.value,
                  })
                }
                label="Confirm Password"
                variant="outlined"
                type={hidePass ? "text" : "password"}
              />
              <span
                className="password-show"
                onClick={() => setHidePass(!hidePass)}
              >
                {hidePass ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M2.42012 12.7132C2.28394 12.4975 2.21584 12.3897 2.17772 12.2234C2.14909 12.0985 2.14909 11.9015 2.17772 11.7766C2.21584 11.6103 2.28394 11.5025 2.42012 11.2868C3.54553 9.50484 6.8954 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7766C21.8517 11.9015 21.8517 12.0985 21.8231 12.2234C21.785 12.3897 21.7169 12.4975 21.5807 12.7132C20.4553 14.4952 17.1054 19 12.0004 19C6.8954 19 3.54553 14.4952 2.42012 12.7132Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12.0004 15C13.6573 15 15.0004 13.6569 15.0004 12C15.0004 10.3431 13.6573 9 12.0004 9C10.3435 9 9.0004 10.3431 9.0004 12C9.0004 13.6569 10.3435 15 12.0004 15Z"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M10.7429 5.09232C11.1494 5.03223 11.5686 5 12.0004 5C17.1054 5 20.4553 9.50484 21.5807 11.2868C21.7169 11.5025 21.785 11.6103 21.8231 11.7767C21.8518 11.9016 21.8517 12.0987 21.8231 12.2236C21.7849 12.3899 21.7164 12.4985 21.5792 12.7156C21.2793 13.1901 20.8222 13.8571 20.2165 14.5805M6.72432 6.71504C4.56225 8.1817 3.09445 10.2194 2.42111 11.2853C2.28428 11.5019 2.21587 11.6102 2.17774 11.7765C2.1491 11.9014 2.14909 12.0984 2.17771 12.2234C2.21583 12.3897 2.28393 12.4975 2.42013 12.7132C3.54554 14.4952 6.89541 19 12.0004 19C14.0588 19 15.8319 18.2676 17.2888 17.2766M3.00042 3L21.0004 21M9.8791 9.87868C9.3362 10.4216 9.00042 11.1716 9.00042 12C9.00042 13.6569 10.3436 15 12.0004 15C12.8288 15 13.5788 14.6642 14.1217 14.1213"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
            </div>
            {errors.confirmPassword && (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.confirmPassword}</p>
              </div>
            )}
          </div>
          <DefaultBtn>Sign up</DefaultBtn>
        </form>
        <p>or</p>
        <DefaultBtn>
          Continue with Google
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M17.16 9.19323C17.16 8.5905 17.1059 8.01095 17.0055 7.45459H9V10.7425H13.5746C13.3775 11.8051 12.7786 12.7053 11.8784 13.308V15.4407H14.6255C16.2327 13.961 17.16 11.7819 17.16 9.19323Z"
              fill="#4285F4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.99997 17.5C11.295 17.5 13.2191 16.7389 14.6254 15.4407L11.8784 13.308C11.1173 13.818 10.1436 14.1193 8.99997 14.1193C6.78611 14.1193 4.91224 12.6241 4.24383 10.615H1.40405V12.8173C2.80269 15.5953 5.67724 17.5 8.99997 17.5Z"
              fill="#34A853"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.24387 10.6151C4.07387 10.105 3.97728 9.56028 3.97728 9.00005C3.97728 8.43982 4.07387 7.89505 4.24387 7.38505V5.18277H1.40409C0.82841 6.33027 0.5 7.62846 0.5 9.00005C0.5 10.3716 0.82841 11.6698 1.40409 12.8173L4.24387 10.6151Z"
              fill="#FBBC05"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M8.99997 3.88072C10.2479 3.88072 11.3684 4.30958 12.2493 5.15186L14.6873 2.7139C13.2152 1.3423 11.2911 0.500031 8.99997 0.500031C5.67724 0.500031 2.80269 2.40481 1.40405 5.18277L4.24383 7.38504C4.91224 5.37595 6.78611 3.88072 8.99997 3.88072Z"
              fill="#EA4335"
            />
          </svg>
        </DefaultBtn>
        <div className="auth__register-account">
          <p>Already have an account??</p>
          <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
