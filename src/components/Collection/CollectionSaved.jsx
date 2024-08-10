import React, { act, useEffect, useState } from "react";
import Categories from "../Categories/Categories";
import Card from "../Card/Card";
import { DefaultBtn } from "../../assets/components.styles";
import axios from "axios";

function CollectionSaved({ userData }) {
    const [jobs, setJobs] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() =>{
        async function fetchJobs() {
            try {
                const response1 = await axios.get("https://aliyevelton-001-site1.ltempurl.com/api/JobBookmarks/user-bookmarks", {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const response2 = await axios.get("https://aliyevelton-001-site1.ltempurl.com/api/CourseBookmarks/user-bookmarks", {
                    headers : {
                        Authorization : `Bearer ${localStorage.getItem("token")}`
                    }
                });
                setJobs(response1.data);
                setCourses(response2.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchJobs();
    }, [])
    console.log(jobs);
    

    return (
        <section id="collection">
            <div className="collection__container">
                <div
                    className={`collection__bottom`}
                >
                    <div className="collection__cards">
                        <div className="collection__cards-container">
                            {jobs && jobs.length > 0 && jobs.map((sjob, index) => (
                                <Card key={index} list={sjob} path={"jobs"} />
                            ))}
                            {courses && courses.length > 0 && courses.map((scourse, index) => (
                                <Card key={index} list={scourse} path={"courses"} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CollectionSaved;
