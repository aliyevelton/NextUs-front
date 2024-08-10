import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function RoleUpdates({ userData }) {
    const [userDetails, setUserDetails] = useState({});
    const [roles, setRoles] = useState([]);
    const [selectedRoles, setSelectedRoles] = useState([]);

    const location2 = useLocation();
    const path = location2.pathname.split("/").filter((x) => x !== "");
    const index = path[path.length - 1];

    useEffect(() => {
        async function fetchUser() {
            try {
                const response1 = await axios.get(
                    `https://aliyevelton-001-site1.ltempurl.com/api/User/FindUserById?userId=${index}`
                );
                const response2 = await axios.get(
                    `https://aliyevelton-001-site1.ltempurl.com/api/User/all-roles`
                );
                setRoles(response2.data);
                setUserDetails(response1.data);
                setSelectedRoles(response1.data.roles || []);
            } catch (error) {
                console.log(error);
            }
        }
        fetchUser();
    }, [index]);

    const handleCheckboxChange = (role) => {
        setSelectedRoles((prevRoles) =>
            prevRoles.includes(role)
                ? prevRoles.filter((r) => r !== role)
                : [...prevRoles, role]
        );
    };

    async function handleUpdate() {
        if (selectedRoles.length !== 0) {
            try {
                await axios.put(
                    "https://aliyevelton-001-site1.ltempurl.com/api/User/update-roles",
                    {
                        userId: userDetails.id,
                        roles: selectedRoles
                    },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        }
                    }
                );
                window.location.reload();
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Please select at least one role");
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

                h2 {
                    color: #333;
                    font-size: 1.5em;
                }

                ul {
                    padding-left: 20px;
                    font-size: 24px;
                }

                li {
                    list-style-type: disc;
                    margin-bottom: 10px;
                }

                .role-container {
                    margin: 10px 0;
                }

                .role-checkbox {
                    margin-right: 10px;
                    font-size: 24px;
                }

                .update-button {
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                .update-button:hover {
                    background-color: #0056b3;
                }

                .role-label {
                    margin-left: 5px;
                }
                `}
            </style>
            <div id="adminContainer">
                <AdminSidebar />
                <div id="insideContainer">
                    <AdminHeader userData={userData} />
                    <div>
                        <h2>User : {userDetails.userName}</h2><br /><br />
                        <h2>Current Roles</h2><br />
                        <ul>
                            {userDetails?.roles?.map((role, index) => (
                                <li key={index}>{role}</li>
                            ))}
                        </ul>
                        <h2>Select Roles</h2>
                        <div className="role-container">
                            {roles?.map((roleI, index) => {
                                const isChecked = selectedRoles.includes(roleI.name);
                                return (
                                    <div key={index} className="role-checkbox">
                                        <input
                                            type="checkbox"
                                            name="role"
                                            id={roleI.name}
                                            checked={isChecked}
                                            onChange={() => handleCheckboxChange(roleI.name)}
                                        />
                                        <label htmlFor={roleI.name} className="role-label">{roleI.name}</label>
                                    </div>
                                );
                            })}
                        </div>
                        <button onClick={handleUpdate} className="update-button">
                            Update Roles
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
