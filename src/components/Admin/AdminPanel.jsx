import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";

export default function AdminPanel({ userData, authActive }) {
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") == undefined) {
            navigate("/login");
        }
        else if (userData.roles != undefined) {
            let found = false;
            for (const role of userData.roles) {
                if (role == "Admin") {
                    found = true;
                }
            }
            if (!found) navigate("/*");
        }
    }, [navigate, userData.roles]);

    return (
        <>
            {userData.roles && userData.roles.find((role) => {
                if (role == "Admin") return true
                else return false
            }) ? <div id="adminContainer">
                <AdminSidebar></AdminSidebar>
                <div id="insideContainer">
                    <AdminHeader userData={userData}></AdminHeader>
                </div>
            </div> : ""}
        </>
    );
}
