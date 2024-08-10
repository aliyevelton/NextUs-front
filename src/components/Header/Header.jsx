import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios
import siteLogo from "../../assets/images/site-logo.svg";
import HeaderAuth from "./HeaderAuth";
import HeaderControls from "./HeaderControls";
import { Divide as Hamburger } from "hamburger-react";
import awardIcon from "../../assets/images/icons/award.svg";
import bagIcon from "../../assets/images/icons/bag.svg";
import phoneCallIcon_1 from "../../assets/images/icons/phone-call-1.svg";

function Header({ userData, authActive }) {
  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  const navigate = useNavigate(); // Use useNavigate to handle navigation
  const navigations = [
    {
      label: "Courses",
      value: "/courses",
      icon: awardIcon,
    },
    {
      label: "Jobs",
      value: "/jobs",
      icon: bagIcon,
    },
    {
      label: "Contacts",
      value: "/contact-us",
      icon: phoneCallIcon_1,
    },
  ];

  const handleLogout = async () => {
    try {
      await axios.post('https://aliyevelton-001-site1.ltempurl.com/api/Auth/Logout'); 

      localStorage.removeItem('authToken'); 

      navigate('/login'); 
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally handle logout errors (e.g., show a notification)
    }
  };

  return (
    <header>
      <div className="header__container">
        <Link to="/">
          <img src={siteLogo} alt="Next Us" />
        </Link>
        <nav className={hamburgerOpen ? "active-nav" : ""}>
          <div className="header__navigations">
            {navigations.map((navigation, index) => (
              <Link
                onClick={() => setHamburgerOpen(false)}
                key={index}
                className={
                  navigation.value === location.pathname
                    ? "active-navigation"
                    : ""
                }
                to={navigation.value}
              >
                <img src={navigation.icon} alt={navigation.label} />
                <p>{navigation.label}</p>
              </Link>
            ))}
          </div>
          {authActive ? <HeaderControls userData={userData} handleLogout={handleLogout} /> : <HeaderAuth />}
        </nav>
        <Hamburger toggled={hamburgerOpen} toggle={setHamburgerOpen} />
      </div>
    </header>
  );
}

export default Header;
