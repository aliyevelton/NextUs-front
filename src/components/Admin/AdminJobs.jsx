import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminJobs({ setCollection, collection, userData }) {
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://aliyevelton-001-site1.ltempurl.com/api/Jobs");
                setCollection(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [setCollection]);

    async function handleDelete(id) {
        try {
            const response = window.confirm("Are you sure?");
            if (response) {
                await axios.delete(`https://aliyevelton-001-site1.ltempurl.com/api/Jobs?id=${id}`);
                let updatedColl = collection.filter((coll) => coll.id !== id);
                setCollection(updatedColl);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logoStyle = {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '1px solid #ddd'
    };

    return (
        <>
            <style>
                {`
                #adminContainer {
                    display: flex;
                }

                #insideContainer {
                    flex: 1;
                    padding: 20px;
                }

                button {
                    padding: 10px 15px;
                    border: none;
                    border-radius: 4px;
                    color: #black;
                    cursor: pointer;
                    font-size: 1em;
                }
                    button:hover {
                        opacity: 0.8;
                    }

                .redBtn {
                    background-color: #dc3545;
                    margin-right: 10px;
                }

                .redBtn:hover {
                    background-color: #c82333;
                }

                .blueBtn {
                    background-color: #007bff;
                }

                .blueBtn:hover {
                    background-color: #0056b3;
                }

                #adminTable {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }

                #adminTable th, #adminTable td {
                    border: 1px solid #ddd;
                    padding: 10px;
                }

                #adminTable th {
                    background-color: #f4f4f4;
                    text-align: left;
                }

                .jobs {
                    transition: background-color 0.3s;
                }

                .jobs:hover {
                    background-color: #f1f1f1;
                }
                `}
            </style>
            <div id="adminContainer">
                <AdminSidebar />
                <div id="insideContainer">
                    <AdminHeader userData={userData} />
                    <button onClick={() => navigate("/admin/jobs/create")}>Create</button>
                    <table id="adminTable">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Company Name</th>
                                <th>Job Title</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {collection?.map((job, index) => (
                                <tr className="jobs" key={index}>
                                    <td><img src={`https://aliyevelton-001-site1.ltempurl.com/images/companies/${job.company.logo}`} alt="" style={logoStyle} /></td>
                                    <td>{job.company.name}</td>
                                    <td>{job.title}</td>
                                    <td className="actions">
                                        <button className="redBtn" onClick={() => handleDelete(job.id)}>Delete</button>
                                        <button className="blueBtn" onClick={() => navigate(`/jobs/${job.id}`)}>Detail</button>
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
