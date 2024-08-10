import React from "react";
import LoginForm from "./LoginForm";
import authImg from "../../../assets/images/auth-image.png";

function Login() {
  return (
    <section id="login">
      <div className="login__container">
        <LoginForm />
        <img src={authImg} alt="Auth Image" />
      </div>
    </section>
  );
}

export default Login;
