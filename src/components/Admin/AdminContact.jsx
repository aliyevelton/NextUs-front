import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminContact({ setCollection, collection, userData }) {
    const [contData, setContData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get("https://aliyevelton-001-site1.ltempurl.com/api/ContactUs");
                setContData(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);

    async function handleDelete(id) {
        try {
            const response = window.confirm("Are you sure?");
            if (response) {
                await axios.delete(`https://aliyevelton-001-site1.ltempurl.com/api/ContactUs/${id}`);
                let updatedCont = contData.filter((cont) => cont.id !== id);
                setContData(updatedCont);
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
                }

                #insideContainer {
                    flex: 1;
                    padding: 20px;
                }

                button {
                    padding: 10px 15px;
                    border: none;
                    border-radius: 4px;
                    color: #fff;
                    cursor: pointer;
                    font-size: 1em;
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

                .actions {
                    display: flex;
                    align-items: center;
                }

                .actions button {
                    margin-right: 5px;
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
                    <table id="adminTable">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contData.map((cont, index) => (
                                <tr className="jobs" key={index}>
                                    <td>{cont.name}</td>
                                    <td>{cont.surname}</td>
                                    <td>{cont.email}</td>
                                    <td className="actions">
                                        <button className="redBtn" onClick={() => handleDelete(cont.id)}>Delete</button>
                                        <button className="blueBtn" onClick={() => navigate(`/admin/contact-us/${cont.id}`)}>Detail</button>
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
