import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function HeaderControls({ userData, handleLogout }) {
  const [activeControl, setActiveControl] = useState("Profile");
  const navigate = useNavigate(); // useNavigate for redirection

  const navigations = [
    {
      label: "Saved",
      value: "/saved",
    },
    {
      label: "Profile",
      value: "/profile",
    },
  ];

  const handleLogoutClick = () => {
    handleLogout(); // Call the logout function passed as a prop
    navigate("/login"); // Redirect to the login page or home page
  };

  return (
    <div className="header__controls">
      {navigations.map((navigation, index) => (
        <Link
          onClick={() => setActiveControl(navigation.label)}
          key={index}
          to={
            navigation.value === "/profile"
              ? navigation.value + "?" + userData.id
              : navigation.value
          }
          className={navigation.label === activeControl ? "active-control" : ""}
        >
          {navigation.label === "Saved" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M5 7.8C5 6.11984 5 5.27976 5.32698 4.63803C5.6146 4.07354 6.07354 3.6146 6.63803 3.32698C7.27976 3 8.11984 3 9.8 3H14.2C15.8802 3 16.7202 3 17.362 3.32698C17.9265 3.6146 18.3854 4.07354 18.673 4.63803C19 5.27976 19 6.11984 19 7.8V21L12 17L5 21V7.8Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : navigation.label === "Profile" ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M3 20C5.33579 17.5226 8.50702 16 12 16C15.493 16 18.6642 17.5226 21 20M16.5 7.5C16.5 9.98528 14.4853 12 12 12C9.51472 12 7.5 9.98528 7.5 7.5C7.5 5.01472 9.51472 3 12 3C14.4853 3 16.5 5.01472 16.5 7.5Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>{userData.name}</p>
            </>
          ) : (
            ""
          )}
        </Link>
      ))}
      <button onClick={handleLogoutClick} className="logout-button">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
</svg>

      </button>
    </div>
  );
}

export default HeaderControls;
