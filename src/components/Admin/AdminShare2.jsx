import { TextField } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DefaultBtn } from "../../assets/components.styles";
import axios from "axios";
import VacancyForm from "../Forms/VacancyForm";
// import { Space, Select } from "antd";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import CourseForm from "../Forms/CourseForm";

function AdminShare({userData}) {
  const [announcement, setAnnouncement] = useState("");
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [errors, setErrors] = useState({});
  const [checkInputs, setCheckInputs] = useState(false);

  const categoryUrl =
    "https://aliyevelton-001-site1.ltempurl.com/api/JobCategories";
  const companyUrl = "https://aliyevelton-001-site1.ltempurl.com/api/Companies";
  const jobsUrl = "https://aliyevelton-001-site1.ltempurl.com/api/Jobs";
  useEffect(() => {
    axios.get(categoryUrl).then((res) => setCategories(res.data));
    axios.get(companyUrl).then((res) => setCompanies(res.data));
  }, []);

  // const [option, setOption] = useState(null);
  const [vacancy, setVacancy] = useState({
    title: "",
    position: "",
    description: "",
    location: "",
    jobType: "",
    exactSalary: 0,
    minSalary: 0,
    maxSalary: 0,
    salaryType: 0,
    categoryId: 0,
    companyId: 0,
    tags : []
  });
  // const handleChange = (event) => {
  //   setAnnouncement(event);
  // };

  const [isDisabled, setIsDisabled] = useState(true);

  const checkForm = (obj) => {
    return Object.values(obj).every((value) => value !== "");
  };

  useEffect(() => {
    setIsDisabled(!checkForm(announcement));
  }, [announcement]);

  useEffect(() => {
    if (checkInputs) {
      checkValidation();
    }
  }, [vacancy]);
  const checkValidation = () => {
    const validationErrors = {};
    if (!vacancy.title.trim()) validationErrors.title = "Title is required!";
    if (!vacancy.position.trim())
      validationErrors.position = "Position is required!";
    if (!vacancy.location.trim())
      validationErrors.location = "Location is required!";
    if (!vacancy.jobType > 0)
      validationErrors.jobType = "Job type is required!";
    if (!vacancy.categoryId > 0)
      validationErrors.categoryId = "Category is required!";
    if (!vacancy.companyId > 0)
      validationErrors.companyId = "Company is required!";
    if (!vacancy.description.trim())
      validationErrors.description = "Description is required!";
    if (vacancy.salaryType === 0)
      validationErrors.salaryType = "Salary type is required!";
    else if (vacancy.salaryType === 1) {
      if (!vacancy.exactSalary > 0) {
        validationErrors.exactSalary = "Salary is required!";
      }
    } else if (vacancy.salaryType === 2) {
      if (!vacancy.minSalary > 0)
        validationErrors.minSalary = "Minimum salary is required!";
      if (!vacancy.maxSalary > 0)
        validationErrors.maxSalary = "Maximum salary is required!";
    }
    setErrors(validationErrors);
  };
  const postVacancy = () => {
    checkValidation();
    setCheckInputs(true);
    axios
      .post(jobsUrl, vacancy)
      .then((res) => {
        console.log(res.data);
        alert("Successfully Created")
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div id="adminContainer">
        <AdminSidebar></AdminSidebar>
        <div id="insideContainer">
          <AdminHeader userData={userData}></AdminHeader>
          <section id="share-post">
            <div className="share-post__container">
              <div className="share-post__top">
                <Link to="/admin">
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 26 26"
                      fill="none"
                    >
                      <path
                        d="M16.25 6.5L9.75 13L16.25 19.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>

                <div className="share-post__header">
                  <h1>Share your announcement</h1>
                  <p>Make sure you fill all the information correctly</p>
                </div>
              </div>
              <div className="share-post__bottom">
                <form>
                  <CourseForm
                    categories={categories}
                    companies={companies}
                    vacancy={vacancy}
                    setVacancy={setVacancy}
                    errors={errors}
                    setErrors={setErrors}
                  />
                </form>
                <DefaultBtn onClick={postVacancy} disabled={isDisabled}>
                  Post
                </DefaultBtn>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>

  );
}

export default AdminShare;
