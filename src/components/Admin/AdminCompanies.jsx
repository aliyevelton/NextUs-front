import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminCompanies({ setCollection, collection, userData }) {
    const [compData, setcompData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get("https://aliyevelton-001-site1.ltempurl.com/api/Companies");
            setcompData(response.data);
        }
        fetchData();
    }, []);

    async function handleDelete(id) {
        try {
            const response = confirm("Are you sure?");
            if (response) {
                axios.delete(`https://aliyevelton-001-site1.ltempurl.com/api/Companies/${id}`);
                let updatedComp = compData.filter((comp) => {
                    return comp.id != id;
                });
                setcompData(updatedComp);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const logoStyle = {
        width: '50px', // Adjust as needed
        height: '50px', // Adjust as needed
        borderRadius: '50%',
        objectFit: 'cover',
        border: '1px solid #ddd' // Optional: adds a border around the logo
    };

    console.log(compData);

    return (
        <>
            <div id="adminContainer">
                <AdminSidebar></AdminSidebar>
                <div id="insideContainer">
                    <AdminHeader userData={userData}></AdminHeader>
                    <button>Create</button>
                    <table id="adminTable">
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Company Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {compData.map((comp, index) => (
                                <tr className="jobs" key={index}>
                                    <td><img src={`https://aliyevelton-001-site1.ltempurl.com/images/companies/${comp.logo}`} alt="" style={logoStyle} /></td>
                                    <td>{comp.name}</td>
                                    <td className="actions">
                                        <button className="redBtn" onClick={() => { navigate(`/company?${comp.id}`) }}>Detail</button>
                                        <button className="redBtn" onClick={() => handleDelete(comp.id)}>Delete</button>
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

