import React from "react";
import { DefaultBtn } from "../../assets/components.styles";

function CongratsModal({ setActiveModal }) {
  return (
    <div className="modal-congrats">
      <div className="modal__container-header">
        <h1>Congratulations</h1>
        <p>
          You just applied! The recruiters will contact with you if you’re
          proper applicant.
        </p>
      </div>
      <DefaultBtn onClick={() => setActiveModal("")} color="#6875D1">
        Thanks
      </DefaultBtn>
    </div>
  );
}

export default CongratsModal;
