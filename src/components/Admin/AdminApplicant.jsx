import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminApplicant({ setCollection, collection, userData }) {
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("https://aliyevelton-001-site1.ltempurl.com/api/JobApplications");
            setCollection(response.data);
        }
        fetchData();
    }, [setCollection]);

    async function handleDelete(id) {
        try {
            const response = confirm("Are you sure?");
            if (response) {
                await axios.delete(`https://aliyevelton-001-site1.ltempurl.com/api/Jobs?id=${id}`);
                let updatedColl = collection.filter((coll) => coll.id !== id);
                setCollection(updatedColl);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <style>
                {`
                    #adminContainer {
                        display: flex;
                        height: 100vh;
                    }

                    #insideContainer {
                        margin-left: 250px; /* Adjust to match the sidebar width */
                        padding: 20px;
                        flex: 1;
                        overflow-y: auto;
                    }

                    button {
                        margin: 10px;
                        padding: 10px 15px;
                        border: none;
                        border-radius: 5px;
                        color: white;
                        cursor: pointer;
                        font-size: 16px;
                        transition: background-color 0.3s ease;
                    }

                    .redBtn {
                        background-color: #dc3545; /* Red color for delete */
                    }

                    .redBtn:hover {
                        background-color: #c82333; /* Darker red for hover */
                    }

                    .blueBtn {
                        background-color: #007bff; /* Blue color for detail */
                    }

                    .blueBtn:hover {
                        background-color: #0056b3; /* Darker blue for hover */
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-top: 20px;
                    }

                    th, td {
                        padding: 15px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }

                    th {
                        background-color: #f8f9fa;
                        color: #343a40;
                    }

                    tbody tr:hover {
                        background-color: #f1f1f1;
                    }

                    #adminTable {
                        width: 100%;
                        border-collapse: collapse;
                    }
                `}
            </style>

            <div id="adminContainer">
                <AdminSidebar />
                <div id="insideContainer">
                    <AdminHeader userData={userData} />
                    <table id="adminTable">
                        <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Job Name</th>
                                <th>Company Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collection?.map((job, index) => (
                                <tr className="jobs" key={index}>
                                    <td>{job?.fullName}</td>
                                    <td>{job?.job?.title}</td>
                                    <td>{job?.job?.company?.name}</td>
                                    <td className="actions">
                                        <button className="redBtn" onClick={() => handleDelete(job.id)}>Delete</button>
                                        <button className="blueBtn" onClick={() => navigate(`/admin/applicants/${job?.id}`)}>Detail</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
