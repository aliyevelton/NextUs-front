import { TextField } from "@mui/material";
import { useState } from "react";
import { DefaultBtn } from "../../assets/components.styles";

function ApplicationLetter({ inputs, setInputs, setActiveForm, setActiveModal, setActiveStep }) {

  console.log(inputs);
  

  return (
    <div className="application__letter">
      <div className="application__letter-textarea">
        <TextField
          id="outlined-multiline-flexible"
          label="Cover letter"
          multiline
          // value={inputs.letter}
          onChange={(e) => setInputs({...inputs, CoverLetter : e.target.value })}
          inputProps={{ maxLength: 500 }}
        />
        <p>{inputs.CoverLetter && inputs.CoverLetter.length > 0 ? inputs.CoverLetter.length : 0}/500</p>
      </div>
      <div className="application__letter-buttons">
        <DefaultBtn
          onClick={() => {
            setActiveForm(false);
            setActiveStep((prev) => prev - 1);
          }}
          color="transparent"
        >
          Back
        </DefaultBtn>
        <DefaultBtn
          disabled={inputs.CoverLetter && inputs.CoverLetter.length > 0 ? false : true}
          onClick={() => setActiveModal("confirm-modal")}
          color="#6875D1"
        >
          Send
        </DefaultBtn>
      </div>
    </div>
  );
}

export default ApplicationLetter;
