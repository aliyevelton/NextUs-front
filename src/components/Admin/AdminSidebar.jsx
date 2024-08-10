import { NavLink } from "react-router-dom";
import logo from "../../assets/images/site-logo.svg";

export default function AdminSidebar() {
    return (
        <>
            <style>
                {`
                    body {
                        margin: 0;
                        font-family: Arial, sans-serif;
                    }

                    #sidebar {
                        width: 250px;
                        background-color: #343a40;
                        height: 100vh;
                        padding: 20px;
                        color: white;
                        position: fixed; /* Fix the sidebar to the left */
                        top: 0;
                        left: 0;
                        overflow-y: auto; /* Allows vertical scrolling if content overflows */
                        display: flex;
                        flex-direction: column;
                    }

                    #sidebar div:first-child {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                    }

                    #sidebar a {
                        text-decoration: none;
                        color: white;
                        font-size: 24px;
                        font-weight: bold;
                        display: flex;
                        align-items: center;
                    }

                    #sidebar img {
                        width: 40px;
                        height: 40px;
                        margin-right: 10px;
                        border-radius: 50%; /* Makes the logo round */
                    }

                    #sidebar button {
                        background: none;
                        border: none;
                        color: white;
                        font-size: 24px;
                        cursor: pointer;
                    }

                    #sideContents {
                        margin-top: 40px;
                        display: flex;
                        flex-direction: column;
                        gap: 15px;
                    }

                    #sideContents a {
                        color: white;
                        font-size: 18px;
                        text-decoration: none;
                        padding: 10px;
                        border-radius: 5px;
                        transition: background-color 0.3s ease;
                    }

                    #sideContents a.active {
                        background-color: #007bff;
                    }

                    #sideContents a:hover {
                        background-color: #495057;
                    }

                    /* Ensure the main content area is not covered by the sidebar */
                    #mainContent {
                        margin-left: 250px; /* Margin equal to the width of the sidebar */
                        padding: 20px;
                        overflow-y: auto; /* Allows vertical scrolling if content overflows */
                    }
                `}
            </style>

            <div id="sidebar">
                <div>
                    <a href="#"><img src={logo} alt="Next Us Logo" />Next Us</a>
                    <button>☰</button>
                </div>
                <div id="sideContents">
                    <NavLink to={"/admin"}>Dashboard</NavLink>
                    <NavLink to={"/admin/jobs"}>Jobs</NavLink>
                    <NavLink to={"/admin/courses"}>Courses</NavLink>
                    <NavLink to={"/admin/company"}>Company</NavLink>
                    <NavLink to={"/admin/contact-us"}>Contact Us</NavLink>
                    <NavLink to={"/admin/users"}>Users</NavLink>
                    <NavLink to={"/admin/applicants"}>Job Applicants</NavLink>
                </div>
            </div>

            {/* Main Content Area */}
            <div id="mainContent">
                {/* Add your main content here */}
            </div>
        </>
    );
}
