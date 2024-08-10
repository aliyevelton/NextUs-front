import { useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminContact({ setCollection ,collection, userData }) {
    const [contData, setContData] = useState([]);

    const navigate = useNavigate();

    useEffect(() =>{
        async function fetchData() {
            const response = await axios.get("https://aliyevelton-001-site1.ltempurl.com/api/ContactUs");
            setContData(response.data);            
        }
        fetchData();
    },[]);

    async function handleDelete(id){
        try {
            const response = confirm("Are you sure?");
            if (response){
                axios.delete(`https://aliyevelton-001-site1.ltempurl.com/api/ContactUs/${id}`);
                let updatedCont = contData.filter((cont) =>{
                    return cont.id != id;
                });
                setContData(updatedCont);
            }
        } catch (error) {
            console.log(error); 
        }
    }

    console.log(contData);

    return (
        <>
            <div id="adminContainer">
                <AdminSidebar></AdminSidebar>
                <div id="insideContainer">
                    <AdminHeader userData={userData}></AdminHeader>
                    <table id="adminTable">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Adress</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contData.map((cont, index) => (
                                <tr className="jobs" key={index}>
                                    <td>{cont.name}</td>
                                    <td>{cont.surname}</td>
                                    <td>{cont.email}</td>
                                    {/* <td>{cont.message}</td> */}
                                    <td className="actions">
                                        <button className="redBtn"  onClick={() => handleDelete(cont.id)}>Delete</button>
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
