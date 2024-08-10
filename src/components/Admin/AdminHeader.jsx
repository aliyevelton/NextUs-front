import { useEffect, useState } from "react";

export default function AdminHeader({userData}) {
    const [editProfilePicture, setEditProfilePicture] = useState(
        "https://i.pinimg.com/736x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"
      );
    useEffect(() => {
          setEditProfilePicture(`${userData.profilePhoto ? `https://aliyevelton-001-site1.ltempurl.com/images/user-images/${userData.profilePhoto}` : "https://i.pinimg.com/736x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"}`)
      }, [userData]);
    return (
        <>
            {/* {authActive &&
                        <div>
                            <img src="https://i.pinimg.com/736x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg" alt="" />
                            <p>{userData.name}</p>
                        </div>} */}
            <div>
                <div >
                    <img src={editProfilePicture} alt="" />
                    <p>{userData.userName}</p>
                </div>
            </div>
        </>
    )
}