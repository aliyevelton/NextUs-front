import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminCourses({ setCollection ,collection, userData }) {
    // const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() =>{
        async function fetchData() {
            const response = await axios.get("https://aliyevelton-001-site1.ltempurl.com/api/Courses");
            setCollection(response.data);
        }
        fetchData();
    },[setCollection])

    async function handleDelete(id){
        try {
            const response = confirm("Are you sure?");
            if (response){
                axios.delete(`https://aliyevelton-001-site1.ltempurl.com/api/Courses/${id}`);
                let updatedColl = collection.filter((coll) =>{
                    return coll.id != id;
                });
                setCollection(updatedColl);
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

    // console.log(cole);
    
    return (
        <>
            <div id="adminContainer">
                <AdminSidebar></AdminSidebar>
                <div id="insideContainer">
                    <AdminHeader userData={userData}></AdminHeader>
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
                            {collection.map((job, index) => (
                                <tr className="jobs" key={index}>
                                    <td><img src={`https://aliyevelton-001-site1.ltempurl.com/images/companies/${job.company.logo}`} alt="" style={logoStyle}/></td>
                                    <td>{job.company.name}</td>
                                    <td>{job.title}</td>
                                    <td className="actions">
                                        <button className="redBtn" onClick={() => handleDelete(job.id)}>Delete</button>
                                        <button className="blueBtn" onClick={() => navigate(`/courses/${job.id}`)}>Detail</button>
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
