import { useEffect, useState } from "react";

export default function AdminHeader({ userData }) {
    const [editProfilePicture, setEditProfilePicture] = useState(
        "https://i.pinimg.com/736x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"
    );

    useEffect(() => {
        setEditProfilePicture(`${userData.profilePhoto ? `https://aliyevelton-001-site1.ltempurl.com/images/user-images/${userData.profilePhoto}` : "https://i.pinimg.com/736x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"}`);
    }, [userData]);

    return (
        <>
            <style>
                {`
                    .profile-picture {
                        border-radius: 50%;
                        object-fit: cover;
                        margin-right: 10px; 
                    }
                    .profile-container {
                        margin-left: auto; 
                        display: flex;
                        align-items: center;
                        margin-right: 20px;
                    }
                `}
            </style>

            <div className="profile-container">
                <img src={editProfilePicture} alt="Profile" className="profile-picture" />
                <p>{userData.userName}</p>
            </div>
        </>
    );
}
