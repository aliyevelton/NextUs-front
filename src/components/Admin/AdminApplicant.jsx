import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminApplicant({ setCollection ,collection, userData }) {
    // const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() =>{
        async function fetchData() {
            const response = await axios.get("https://aliyevelton-001-site1.ltempurl.com/api/JobApplications");
            setCollection(response.data);
        }
        fetchData();
    },[setCollection])

    async function handleDelete(id){
        try {
            const response = confirm("Are you sure?");
            if (response){
                axios.delete(`https://aliyevelton-001-site1.ltempurl.com/api/Jobs?id=${id}`);
                let updatedColl = collection.filter((coll) =>{
                    return coll.id != id;
                });
                setCollection(updatedColl);
            }
        } catch (error) {
            console.log(error); 
        }
    }

    // const logoStyle = {
    //     width: '50px', // Adjust as needed
    //     height: '50px', // Adjust as needed
    //     borderRadius: '50%',
    //     objectFit: 'cover',
    //     border: '1px solid #ddd' // Optional: adds a border around the logo
    // };

    console.log(collection);
    
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
