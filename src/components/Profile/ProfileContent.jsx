import React from "react";
import { Link, useLocation } from "react-router-dom";
import { DefaultBtn } from "../../assets/components.styles";
import CopyToClipboard from "react-copy-to-clipboard";
import { TextField } from "@mui/material";

function ProfileContent({
  userData,
  setEditable,
  editable,
  editBackground,
  handleChangeBackgroundImage,
  editProfilePicture,
  handleChangeProfilePicture,
  copiedText,
  tooltipActive,
  handleTooltipClick,
  description,
  setCopiedText,
  setDescription,
  submitDesc
}) {
  const location = useLocation();

  // const navigate = useNavigate();

  const path = location.pathname.split("/").filter((x) => x !== "");
  // const index = Number(path[path.length - 1]);

  let name = path[path.length - 1];

  return (
    <div className="profile__content">
      <div className="profile__background">
        <img src={editBackground} alt="" />
        {name == "profile" ? <div className="profile__background-select">
          <label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M2.87604 18.1156C2.92198 17.7021 2.94496 17.4954 3.00751 17.3022C3.06301 17.1307 3.14143 16.9676 3.24064 16.8171C3.35246 16.6475 3.49955 16.5005 3.79373 16.2063L17 3C18.1046 1.89543 19.8955 1.89543 21 3C22.1046 4.10457 22.1046 5.89543 21 7L7.79373 20.2063C7.49955 20.5005 7.35245 20.6475 7.18289 20.7594C7.03245 20.8586 6.86929 20.937 6.69785 20.9925C6.5046 21.055 6.29786 21.078 5.88437 21.124L2.5 21.5L2.87604 18.1156Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input type="file" onChange={handleChangeBackgroundImage} />
          </label>
        </div> : ""}
      </div>
      <div className="profile__picture">
        <img src={editProfilePicture} alt="" />
        {name == "profile" ? <label>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M2.87604 18.1156C2.92198 17.7021 2.94496 17.4954 3.00751 17.3022C3.06301 17.1307 3.14143 16.9676 3.24064 16.8171C3.35246 16.6475 3.49955 16.5005 3.79373 16.2063L17 3C18.1046 1.89543 19.8955 1.89543 21 3C22.1046 4.10457 22.1046 5.89543 21 7L7.79373 20.2063C7.49955 20.5005 7.35245 20.6475 7.18289 20.7594C7.03245 20.8586 6.86929 20.937 6.69785 20.9925C6.5046 21.055 6.29786 21.078 5.88437 21.124L2.5 21.5L2.87604 18.1156Z"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <input type="file" onChange={handleChangeProfilePicture} />
        </label> : ""}
      </div>
      <div className="profile__header">
        <div className="profile__left">
          <div className="profile__info">
            <div className="profile__explanation">
              <h1>{userData.name} {userData.surname}</h1>
              <p>{userData.profession || 'Add Profession'}</p>
            </div>
            <p className="profile__connection">100+ network</p>
          </div>
        </div>
        <div className="profile__right">
          <div className="profile__share">
            <h1>Public profile & URL</h1>
            <p>{window.location.origin}/u/{userData.userName}</p>
          </div>

          <div className={`tooltip ${tooltipActive ? "tooltip-active" : ""}`}>
            Copied
          </div>
          <CopyToClipboard
            text={copiedText.value}
            onCopy={() => setCopiedText({ ...copiedText, copied: true })}
          >
            <span onClick={handleTooltipClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M8 8V5.2C8 4.0799 8 3.51984 8.21799 3.09202C8.40973 2.71569 8.71569 2.40973 9.09202 2.21799C9.51984 2 10.0799 2 11.2 2H18.8C19.9201 2 20.4802 2 20.908 2.21799C21.2843 2.40973 21.5903 2.71569 21.782 3.09202C22 3.51984 22 4.0799 22 5.2V12.8C22 13.9201 22 14.4802 21.782 14.908C21.5903 15.2843 21.2843 15.5903 20.908 15.782C20.4802 16 19.9201 16 18.8 16H16M5.2 22H12.8C13.9201 22 14.4802 22 14.908 21.782C15.2843 21.5903 15.5903 21.2843 15.782 20.908C16 20.4802 16 19.9201 16 18.8V11.2C16 10.0799 16 9.51984 15.782 9.09202C15.5903 8.71569 15.2843 8.40973 14.908 8.21799C14.4802 8 13.9201 8 12.8 8H5.2C4.0799 8 3.51984 8 3.09202 8.21799C2.71569 8.40973 2.40973 8.71569 2.21799 9.09202C2 9.51984 2 10.0799 2 11.2V18.8C2 19.9201 2 20.4802 2.21799 20.908C2.40973 21.2843 2.71569 21.5903 3.09202 21.782C3.51984 22 4.07989 22 5.2 22Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </CopyToClipboard>
        </div>
      </div>
      <div className="profile__about">
        <div className="profile__about-me">
          <h1>About</h1>
          {editable ? (
            <div className="profile__about-edit">
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                maxRows={4}
                value={description ? description : ""}
                onChange={(e) => setDescription(e.target.value)}
              />
              <DefaultBtn
                onClick={() => {
                  setEditable(false);
                  submitDesc();
                }}
                color="#6875d1"
              >
                Submit
              </DefaultBtn>
            </div>
          ) : (
            <p>{description}</p>
          )}
        </div>
        {name == "profile" ? <span onClick={() => setEditable(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M2.87604 18.1156C2.92198 17.7021 2.94496 17.4954 3.00751 17.3022C3.06301 17.1307 3.14143 16.9676 3.24064 16.8171C3.35246 16.6475 3.49955 16.5005 3.79373 16.2063L17 3C18.1046 1.89543 19.8955 1.89543 21 3C22.1046 4.10457 22.1046 5.89543 21 7L7.79373 20.2063C7.49955 20.5005 7.35245 20.6475 7.18289 20.7594C7.03245 20.8586 6.86929 20.937 6.69785 20.9925C6.5046 21.055 6.29786 21.078 5.88437 21.124L2.5 21.5L2.87604 18.1156Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span> : ""}
      </div>
    </div>
  );
}

export default ProfileContent;
