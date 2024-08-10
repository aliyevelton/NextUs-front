import React from "react";
import { DefaultBtn } from "../../assets/components.styles";
import { Link } from "react-router-dom";
import userIcon from "../../assets/images/icons/user.svg";

function HeaderAuth() {
  return (
    <div className="header__auth">
      <Link to="/register">
        <DefaultBtn>Sign up</DefaultBtn>
      </Link>
      <Link to="/login">
        <DefaultBtn>
          <img src={userIcon} alt="" />
          Login
        </DefaultBtn>
      </Link>
    </div>
  );
}

export default HeaderAuth;
