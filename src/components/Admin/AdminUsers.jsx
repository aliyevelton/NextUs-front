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
                                        <button onClick={() => navigate(`/admin/roleupdate/${user.id}`)}>Change Role</button>
                                        <button onClick={() => navigate(`/u/${user.userName}`)}>Detail</button>
                                        <button onClick={() => handleStatus(index, user.id)}>{user.isActive ? "Deactivate" : "Activate"}</button>
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
