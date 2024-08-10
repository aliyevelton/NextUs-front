import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import "./assets/style.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Auth/Login/Login";
import Register from "./components/Auth/Register/Register";
import { useEffect, useState } from "react";
import Requirements from "./components/Requirements/Requirements";
import Error from "./components/Error/Error";
import ContactUs from "./components/ContactUs/ContactUs";
import Application from "./components/Application/Application";
// import ConfirmModal from "./components/Modal/ConfirmModal";
// import CongratsModal from "./components/Modal/CongratsModal";
import AdminPanel from "./components/Admin/AdminPanel";
import Collection from "./components/Collection/Collection";
import Modal from "./components/Modal/Modal";
import Profile from "./components/Profile/Profile";
import AdminShare from "./components/Admin/AdminShare";
import axios from "axios";
import AdminJobs from "./components/Admin/AdminJobs";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminCompanies from "./components/Admin/AdminCompanies";
import RoleUpdate from "./components/Admin/RoleUpdate";
import AdminContact from "./components/Admin/AdminContact";
import ContactDetail from "./components/Admin/ContactDetail";
import CollectionSaved from "./components/Collection/CollectionSaved";
import AdminCourses from "./components/Admin/AdminCourses";
import AdminApplicant from "./components/Admin/AdminApplicant";
import ApplicantDetail from "./components/Admin/ApplicantDetail";

function App() {
  const location = useLocation();
  const [userData, setUserData] = useState({});
  const [authActive, setAuthActive] = useState(false);
  const [activateLayout, setActivateLayout] = useState("header");
  const [activeFilter, setActiveFilter] = useState(false);
  const [filters, setFilters] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [collection, setCollection] = useState([]);
  const [error, setError] = useState(false);
  const token = localStorage.getItem("token");
  const [inputs, setInputs] = useState({
    FullName: "",
    email: "",
    Cv: "",
  });

  const currentUserUrl =
    "https://aliyevelton-001-site1.ltempurl.com/api/User/current";

  useEffect(() => {
    if (token) {
      axios
        .get(currentUserUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res.data);
          setUserData(res.data);
          setAuthActive(true);
          console.log(res.data);
        });
    }
  }, [token]);

  let url = "";
  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register") {
      setActivateLayout("auth");
    } else if (location.pathname.includes("/admin")) {
      setActivateLayout("admin");
    }
    else setActivateLayout("def");
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);
  if (location.pathname.includes("/jobs") || location.pathname.includes("/company")) {
    url = "https://aliyevelton-001-site1.ltempurl.com/api/Jobs";
  } else if (location.pathname.includes("/courses")) {
    url = "https://aliyevelton-001-site1.ltempurl.com/api/Courses";
  }

  console.log(filters);

  useEffect(() => {
    async function filterJobs() {
      const path = location.pathname.split("/").filter((x) => x !== "");
      let index = path[path.length - 1];

      index = index.charAt(0).toUpperCase() + index.slice(1).toLowerCase();

      let updatedIndex = index;

      let finalQuery = "";


      filters.forEach((filter, index) => {
        if (typeof filter == "number") {
          if (index == 0) {
            finalQuery += `categoryId=${filter}`
          }
          else finalQuery += `&categoryId=${filter}`
        }
        else {
          if (index == 0) {
            finalQuery += `title=${filter}`
          }
          else finalQuery += `&title=${filter}`
        }
      })

      try {
        const response = await axios.get(`https://aliyevelton-001-site1.ltempurl.com/api/${updatedIndex}?${finalQuery}`);
        setCollection(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    filterJobs();
  }, [filters]);

  useEffect(() => {
    if (url.length > 0) {
      axios
        .get(url)
        .then((response) => {
          setCollection(response.data);
          setError(false);
        })
        .catch((error) => {
          setError(true);
          console.log(error.message + url);
        });
    }
  }, [url]);

  return (
    <>
      {activateLayout === "def" ? (
        <Header
          authActive={authActive}
          setAuthActive={setAuthActive}
          location={location}
          userData={userData}
        />
      ) : (
        ""
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/courses"
          element={
            <Collection
              filters={filters}
              setFilters={setFilters}
              setCollection={setCollection}
              error={error}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              collection={collection}
            />
          }
        />
        <Route
          path="/courses/:id"
          element={
            <Requirements
              userData={userData}
            />
          }
        />
        <Route
          path="/jobs"
          element={
            <Collection
              filters={filters}
              setFilters={setFilters}
              setCollection={setCollection}
              error={error}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              collection={collection}
            />
          }
        />
        <Route
          path="/jobs/:id"
          element={
            <Requirements
              userData={userData}
            />
          }
        />
        <Route
          path="/jobs/apply/:id"
          element={
            <Application
              collection={collection}
              inputs={inputs}
              setInputs={setInputs}
              setActiveModal={setActiveModal}
            />
          }
        />
        <Route
          path="/saved"
          element={
            <CollectionSaved
            userData={userData}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/u/:username" element={<Profile publicPp={true} />} />
        <Route path="/profile" element={<Profile userData={userData} />} />
        <Route path="/company" element={<Profile />} />
        <Route path="/admin/jobs/create" element={<AdminShare userData={userData}/>} />
        <Route path="/admin" element={<AdminPanel userData={userData} authActive={authActive} />} />
        <Route path="/admin/jobs" element={<AdminJobs setCollection={setCollection} collection={collection} userData={userData} />} />
        <Route path="/admin/contact-us" element={<AdminContact setCollection={setCollection} collection={collection} userData={userData} />} />
        <Route path="/admin/contact-us/:id" element={<ContactDetail setCollection={setCollection} collection={collection} userData={userData} />} />
        <Route path="/admin/applicants/:id" element={<ApplicantDetail setCollection={setCollection} collection={collection} userData={userData} />} />
        <Route path="/admin/company" element={<AdminCompanies setCollection={setCollection} collection={collection} userData={userData} />} />
        <Route path="/admin/users" element={<AdminUsers userData={userData} />} />
        <Route path="/admin/courses" element={<AdminCourses collection={collection} setCollection={setCollection} userData={userData} />} />
        <Route path="/admin/roleupdate/:id" element={<RoleUpdate userData={userData}/>} />
        <Route path="/admin/applicants" element={<AdminApplicant setCollection={setCollection} collection={collection} userData={userData} />} />
        <Route path="*" element={<Error />} />
      </Routes>

      {activeModal.length > 0 ? (
        <Modal collection={collection} userData={userData} inputs={inputs} setActiveModal={setActiveModal} activeModal={activeModal} />
      ) : (
        ""
      )}

      {activateLayout === "def" ? (
        <Footer />
      ) : (
        ""
      )}
    </>
  );
}

export default App;
