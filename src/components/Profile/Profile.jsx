import React, { useEffect, useRef, useState } from "react";
import { DefaultBtn, PageSection } from "../../assets/components.styles";
import CopyToClipboard from "react-copy-to-clipboard";
import { TextField } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Card from "../Card/Card";
import { courses, posts } from "../../constants";
import ProfileContent from "./ProfileContent";
import PostCard from "../Card/PostCard";
import axios from "axios";

function Profile({ userData, publicPp }) {
  const [companyData, setCompanyData] = useState({});
  const [publicData, setPublicData] = useState({});

  const [copiedText, setCopiedText] = useState({
    value: "www.linkedin.com/in/salam-61a782298",
    copied: false,
  });

  const [description, setDescription] = useState(
    "Passionate UX/UI Designer dedicated to creating visually compelling and user-friendly designs, specialized in translating complex concepts into seamless digital experiences. A collaborative team player, I am passionate about contributing to project success. Let's connect and elevate your design projects. #UXDesign #UIDesign"
  );
  const [editable, setEditable] = useState(false);
  const [editBackground, setEditBackground] = useState(
    "https://miro.medium.com/v2/resize:fit:1400/0*VN3fRVHbM1r__dtx"
  );
  const [editProfilePicture, setEditProfilePicture] = useState(
    "https://i.pinimg.com/736x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"
  );

  const [tooltipActive, setTooltipActive] = useState(false);
  const timeoutRef = useRef(null);

  const location = useLocation();

  const navigate = useNavigate();

  const path = location.pathname.split("/").filter((x) => x !== "");

  const query = window.location.search;
  const uuid = query.substring(1);

  console.log(uuid);

  let name = publicPp ? path[path.length - 2] : path[path.length - 1];
  let publicName = publicPp && path[path.length - 1] ;
  console.log(path, name);
  

  const handleChangeBackgroundImage = async (e) => {
    const file = e.target.files[0];
    setEditBackground(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("CoverImageFile", file);

    try {
      await axios.put("https://aliyevelton-001-site1.ltempurl.com/api/User/update-cover-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchComp() {
      try {
        const response = await axios.get(`https://aliyevelton-001-site1.ltempurl.com/api/Companies/${uuid}`);
        setCompanyData(response.data)

      } catch (error) {
        console.log(error);
      }
    }
    if (name == "company") fetchComp();
  }, [name, uuid]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await axios.get(`https://aliyevelton-001-site1.ltempurl.com/api/User/FindUser?username=${publicName}`);
        setPublicData(response.data)

      } catch (error) {
        console.log(error);
      }
    }
    if (name == "u") fetchUser();
  }, [name, publicName, uuid])

  useEffect(() => {
    if (name == "profile") {
      setEditProfilePicture(`${userData.profilePhoto ? `https://aliyevelton-001-site1.ltempurl.com/images/user-images/${userData.profilePhoto}` : "https://i.pinimg.com/736x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"} `)
      setEditBackground(`${userData.coverImage ? `https://aliyevelton-001-site1.ltempurl.com/images/user-images/${userData.coverImage}` : "https://miro.medium.com/v2/resize:fit:1400/0*VN3fRVHbM1r__dtx"}`)
      setDescription(userData?.about);
    }
    else if (name == "u"){
      setEditProfilePicture(`${publicData.profilePhoto ? `https://aliyevelton-001-site1.ltempurl.com/images/user-images/${publicData.profilePhoto}` : "https://i.pinimg.com/736x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"}`)
      setEditBackground(`${publicData.coverImage ? `https://aliyevelton-001-site1.ltempurl.com/images/user-images/${publicData.coverImage}` : "https://miro.medium.com/v2/resize:fit:1400/0*VN3fRVHbM1r__dtx"}`)
      setDescription(publicData?.about);
    }
    else {
      setEditProfilePicture(`${companyData.logo ? `https://aliyevelton-001-site1.ltempurl.com/images/companies/${companyData.logo}` : "https://i.pinimg.com/736x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"}`)
      setEditBackground(`${companyData.coverImage ? `https://aliyevelton-001-site1.ltempurl.com/images/companies/${companyData.coverImage}` : "https://miro.medium.com/v2/resize:fit:1400/0*VN3fRVHbM1r__dtx"}`)
      setDescription(companyData?.about);
    }
  }, [companyData?.about, companyData?.coverImage, companyData?.logo, name, publicData?.about, publicData?.coverImage, publicData?.profilePhoto, userData]);

  const submitDesc = async () => {
    try {
      await axios.put("https://aliyevelton-001-site1.ltempurl.com/api/User/update-about-text",
        {
          aboutText: description
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  console.log(companyData);

  const handleChangeProfilePicture = async (e) => {
    const file = e.target.files[0];
    setEditProfilePicture(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("ProfilePhotoFile", file);

    try {
      await axios.put("https://aliyevelton-001-site1.ltempurl.com/api/User/update-profile-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
    } catch (error) {
      console.log(error);
    }
    console.log(editBackground);
  };


  const handleTooltipClick = () => {
    setTooltipActive(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setInterval(() => {
      setTooltipActive(false);
    }, 1000);
  };

  console.log(companyData);
  
  return (
    <section id="profile">
      <div className="profile__container">
        <ProfileContent
          userData={userData ? userData : publicPp ? publicData : companyData}
          handleChangeBackgroundImage={handleChangeBackgroundImage}
          editBackground={editBackground}
          editProfilePicture={editProfilePicture}
          setEditable={setEditable}
          handleChangeProfilePicture={handleChangeProfilePicture}
          editable={editable}
          copiedText={copiedText}
          tooltipActive={tooltipActive}
          handleTooltipClick={handleTooltipClick}
          description={description}
          setCopiedText={setCopiedText}
          setDescription={setDescription}
          submitDesc={submitDesc}
        />

        <PageSection className="page__section">
          <div className="page__section-top">
            <h1>{name == "company" && "Opportunities"}</h1>
          </div>
          <div className="ppBtn">
            {/* {courses.map((course, index) =>
              index < 3 ? <Card key={index} course={course} /> : ""
            )} */}
            {name =="company" ? companyData?.courses?.map((job, index) =>
              <DefaultBtn onClick={() => (navigate(`/courses/${job.id}`))} key={index}>{job.title}</DefaultBtn>
            ) : ''}
          </div>
        </PageSection>
      </div>
    </section>
  );
}

export default Profile;
