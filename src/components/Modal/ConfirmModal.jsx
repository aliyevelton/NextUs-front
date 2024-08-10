import axios from "axios";
import { DefaultBtn } from "../../assets/components.styles";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function ConfirmModal({ collection, userData, inputs, setActiveModal }) {
  const [finalData, setFinalData] = useState({});

  const location = useLocation();

  const path = location.pathname.split("/").filter((x) => x !== "");
  const index = Number(path[path.length - 1]);

  const detailedData = collection.find((item) => item.id === index);

  console.log(detailedData);

  useEffect(() => {
    if (inputs && userData.id) {
      const data = {
        FullName: inputs.FullName,
        CoverLetter: inputs.CoverLetter,
        Cv: inputs.Cv,
        JobId: detailedData?.id,
        UserId: userData.id,
      };
      setFinalData(data);
      console.log("Final Data:", data);
    }
  }, [detailedData?.id, inputs, userData]);

  const handleSubmit = async (e) => {
    e.stopPropagation();
    try {
      await axios.post("https://aliyevelton-001-site1.ltempurl.com/api/JobApplications", finalData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setActiveModal("congrats-modal");
    } catch (error) {
      console.error("Error submitting the form:", error.response.data);
    }
  };

  return (
    <div className="modal-confirm">
      <div className="modal__container-header">
        <h1>Are these correct?</h1>
        <p>
          Make sure that the information you entered is correct for the job
          application. You have a chance to change inputs for “UX/UI Designer”
          job vacancy.
        </p>
      </div>
      <div className="modal__container-rows">
        <div className="modal__container-row">
          Full name: <p>{inputs.FullName}</p>
        </div>
        <div className="modal__container-row">
          Email: <p>{inputs.email}</p>
        </div>
        <div className="modal__container-row">
          Salary Expectation: <p>$1200-1800</p>
        </div>
      </div>
      <div className="modal__container-buttons">
        <DefaultBtn onClick={() => setActiveModal("")}>Go back</DefaultBtn>
        <DefaultBtn onClick={handleSubmit} color="#6875D1">
          Confirm and Send
        </DefaultBtn>
      </div>
    </div>
  );
}

export default ConfirmModal;
