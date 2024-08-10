import React from "react";
import authImg from "../../../assets/images/auth-image.png";
import RegisterForm from "./RegisterForm";

function Register() {
  return (
    <section id="register">
      <div className="register__container">
        <RegisterForm />
        <img src={authImg} alt="Auth Image" />
      </div>
    </section>
  );
}

export default Register;
