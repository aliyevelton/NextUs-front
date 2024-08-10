import React from "react";
import siteLogo from "../../assets/images/site-logo.svg";
function Footer() {
  return (
    <footer>
      <div className="footer__container">
        <img src={siteLogo} alt="Site Logo" />
        <p>Copyright © NextUS | All Rights Reserved </p>
      </div>
    </footer>
  );
}

export default Footer;
