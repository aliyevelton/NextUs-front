import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function RoleUpdates({userData}) {
    const [userDetails, setUserDetails] = useState({});
    const [roles, setRoles] = useState();
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

    async function handleUptate() {
        if (selectedRoles.length != 0){
            try {
                await axios.put("https://aliyevelton-001-site1.ltempurl.com/api/User/update-roles", {
                    userId: userDetails.id,
                    roles: selectedRoles
                },{
                    headers : {
                        "Content-Type" : "application/json"
                    }
                })
                location.reload();
            } catch (error) {
                console.log(error);
                
            }
        }
        else alert("Please select at least one role");
    }

    return (
        <>
            <div id="adminContainer">
                <AdminSidebar></AdminSidebar>
                <div id="insideContainer">
                    <AdminHeader userData={userData}></AdminHeader>
                    <div>
                        <h2>User : {userDetails.userName}</h2>
                        <h2>Current Roles</h2>
                        <ul>
                            {userDetails?.roles?.map((role, index) => (
                                <li style={{ listStyleType: "disc", marginLeft: "20px" }} key={index}>
                                    {role}
                                </li>
                            ))}
                        </ul>
                        <h2>Select Roles</h2>

                        {roles?.map((roleI, index) => {
                            const isChecked = selectedRoles.includes(roleI.name);
                            return (
                                <div key={index}>
                                    <input
                                        type="checkbox"
                                        name="role"
                                        id={roleI.name}
                                        checked={isChecked}
                                        onChange={() => handleCheckboxChange(roleI.name)}
                                    />
                                    <label htmlFor={roleI.name}>{roleI.name}</label>
                                    <br />
                                </div>
                            );
                        })}
                        <button onClick={() => handleUptate()}>Update Roles</button>
                    </div>
                </div>
            </div>
        </>
    );
}
