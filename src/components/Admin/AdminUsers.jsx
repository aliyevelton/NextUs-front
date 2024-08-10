import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminUsers({userData}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            try {
                const response = await axios.get("https://aliyevelton-001-site1.ltempurl.com/api/User");
                setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchUsers();
    }, [])

    const navigate = useNavigate();

    console.log(users);

    const logoStyle = {
        width: '50px', // Adjust as needed
        height: '50px', // Adjust as needed
        borderRadius: '50%',
        objectFit: 'cover',
        border: '1px solid #ddd' // Optional: adds a border around the logo
    };

    async function handleStatus(i, id){
        if (users[i].isActive){
            try {
                await axios.put(`https://aliyevelton-001-site1.ltempurl.com/api/User/deactivate?userId=${id}`)
            } catch (error) {
                console.log(error);
            }
        }
        else {
            try {
                await axios.put(`https://aliyevelton-001-site1.ltempurl.com/api/User/activate?userId=${id}`)
            } catch (error) {
                console.log(error);
            }
        }
        location.reload();
    }

    return (
        <>
            <style>
                {`
                #adminContainer {
                    display: flex;
                    flex-direction: row;
                    padding: 20px;
                }

                #insideContainer {
                    flex: 1;
                    padding: 20px;
                }

                button {
                    padding: 8px 12px;
                    border: none;
                    border-radius: 4px;
                    color: #fff;
                    cursor: pointer;
                    font-size: 0.9em;
                    margin: 5px;
                    transition: background-color 0.3s;
                }

                .createBtn {
                    background-color: #28a745; /* Green for Create */
                }

                .createBtn:hover {
                    background-color: #218838;
                }

                .changeRoleBtn {
                    background-color: #ffc107; /* Yellow for Change Role */
                }

                .changeRoleBtn:hover {
                    background-color: #e0a800;
                }

                .detailBtn {
                    background-color: #007bff; /* Blue for Detail */
                }

                .detailBtn:hover {
                    background-color: #0056b3;
                }

                .deactivateBtn {
                    background-color: #dc3545; /* Red for Deactivate */
                }

                .deactivateBtn:hover {
                    background-color: #c82333;
                }

                .activateBtn {
                    background-color: #17a2b8; /* Teal for Activate */
                }

                .activateBtn:hover {
                    background-color: #138496;
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

                .actions button {
                    margin-right: 5px;
                }
                `}
            </style>
            <div id="adminContainer">
                <AdminSidebar></AdminSidebar>
                <div id="insideContainer">
                    <AdminHeader userData={userData}></AdminHeader>
                    <table id="adminTable">
                        <thead>
                            <tr>
                                <th>Profile Photo</th>
                                <th>Username</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => {
                                let finalRole = "";

                                user.roles.map((role, index) => {
                                    if (user.roles.length == 0) {
                                        finalRole = "No roles available";
                                        return finalRole;
                                    }

                                    if (user.roles.length == 1) {
                                        finalRole = role;
                                        return finalRole;
                                    }

                                    else if (index == 0) {
                                        finalRole += role;

                                    }
                                    else {
                                        finalRole += ", " + role;

                                    }
                                    return role;
                                })

                                return <tr className="jobs" key={index}>
                                    <td><img src={`https://aliyevelton-001-site1.ltempurl.com/images/user-images/${user.profilePhoto}`} alt="" style={logoStyle}/></td>
                                    <td>{user.userName}</td>
                                    <td>{finalRole}</td>
                                    <td>{user.isActive ? "Active" : "Non Active"}</td>
                                    <td className="actions">
                                        <button className="changeRoleBtn" onClick={() => navigate(`/admin/roleupdate/${user.id}`)}>Change Role</button>
                                        <button className="detailBtn" onClick={() => navigate(`/u/${user.userName}`)}>Detail</button>
                                        <button className={user.isActive ? "deactivateBtn" : "activateBtn"} onClick={() => handleStatus(index, user.id)}>
                                            {user.isActive ? "Deactivate" : "Activate"}
                                        </button>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
