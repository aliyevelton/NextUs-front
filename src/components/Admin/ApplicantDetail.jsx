import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ApplicantDetail({ setCollection, collection, userData }) {
    const [contData, setContData] = useState([]);

    const navigate = useNavigate();

    const location = useLocation();

    const path = location.pathname.split("/").filter((x) => x !== "");
    const index = Number(path[path.length - 1]);
    console.log(index);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get(`https://aliyevelton-001-site1.ltempurl.com/api/JobApplications/${index}`);
            setContData(response.data);
        }
        fetchData();
    }, [index]);

    console.log(contData);

    return (
        <>
            <style>
                {`
                    .jobs {
                        background-color: white;
                        border-radius: 10px;
                        padding: 10px;
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                        margin: 20px 0;
                        max-width: 600px;
                        margin-left: auto;
                        margin-right: auto;
                        position: relative;
                    }

                    .jobs button {
                        background-color: #007bff;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        margin-bottom: 10px;
                        margin-left: 50px;
                        transition: background-color 0.3s ease;
                        font-size: 16px;
                        display: inline-flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .jobs button:hover {
                        background-color: #0056b3;
                    }

                    .jobs button::before {
                        content: '←';
                        font-size: 18px;
                    }

                    .jobs h1 {
                        font-size: 18px;
                        color: #007bff;
                        margin-bottom: 8px;
                        margin-top: 20px;
                    }

                    .jobs p {
                        margin: 10px 0;
                        font-size: 16px;
                        line-height: 1.6;
                        color: #333;
                        padding: 10px;
                        background-color: #f9f9f9;
                        border-radius: 5px;
                    }

                    .jobs p:last-child {
                        border-bottom: none;
                        padding-bottom: 0;
                    }

                    @media (max-width: 768px) {
                        .jobs {
                            padding: 20px;
                            margin: 10px;
                        }

                        .jobs button {
                            width: 100%;
                            justify-content: center;
                        }
                    }
                `}
            </style>

            <div id="adminContainer">
                <AdminSidebar />
                <div id="insideContainer">
                    <AdminHeader userData={userData}/>
                    <div className="jobs">
                        <button onClick={() => navigate("/admin/contact-us")}>Back</button>
                        <h1>Full Name</h1>
                        <p>{contData.fullName}</p>
                        <h1>Cover Letter</h1>
                        <p>{contData.coverLetter}</p>
                        <h1>CV</h1>
                        <a target="_blank" href={`https://aliyevelton-001-site1.ltempurl.com/files/jobApplications/${contData.cv}`} download="CustomFileName.pdf">Open PDF</a>
                    </div>
                </div>
            </div>
        </>
    );
}
