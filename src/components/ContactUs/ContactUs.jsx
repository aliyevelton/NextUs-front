import React, { useState } from "react";
import {
  DefaultBtn,
  DefaultInput,
  DefaultTextArea,
} from "../../assets/components.styles";
import contactImage from "../../assets/images/contact-image.png";
import axios from "axios";
import { toast } from "react-toastify";

function ContactUs() {
  const [contactDetail, setContactDetail] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });
  const contactUrl = "https://aliyevelton-001-site1.ltempurl.com/api/ContactUs";
  const [errors, setErrors] = useState([]);
  const sendFormData = (e) => {
    e.preventDefault();
    checkValidation();
    if (!errors.length) {
      setContactDetail({
        name: "",
        surname: "",
        email: "",
        message: "",
      });
    }

    axios
      .post(contactUrl, contactDetail)
      .then((res) => toast.success(res.data))
      .catch((err) => toast.error(err.response.data.message));
  };

  const checkValidation = () => {
    const validationErrors = {};
    if (!contactDetail.name.trim()) validationErrors.name = "Name is required!";
    if (!contactDetail.surname.trim())
      validationErrors.surname = "Surname is required!";
    if (!contactDetail.email.trim())
      validationErrors.email = "Email is required!";
    else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactDetail.email))
      validationErrors.email = "Email is not valid!";
    if (!contactDetail.message.trim())
      validationErrors.message = "Message is required!";

    setErrors(validationErrors);
  };

  return (
    <section id="contact-us">
      <div className="contact-us__container">
        <div className="contact-us__left">
          <div className="contact-us__left-header">
            <h1>Contact us</h1>
            <p>Subheading for description or instructions</p>
          </div>
          <form className="contact-us__left-form">
            <div>
              <label>
                First Name
                <DefaultInput
                  value={contactDetail.name}
                  onChange={(e) =>
                    setContactDetail({ ...contactDetail, name: e.target.value })
                  }
                  placeholder="Jane"
                  type="text"
                />
              </label>
              <label>
                Last name
                <DefaultInput
                  value={contactDetail.surname}
                  onChange={(e) =>
                    setContactDetail({
                      ...contactDetail,
                      surname: e.target.value,
                    })
                  }
                  placeholder="Smitherton"
                  type="text"
                />
              </label>
              {errors.name && (
                <div className="error-validation">
                  <span>*</span>
                  <p>{errors.name}</p>
                </div>
              )}
            </div>
            <label>
              Email address
              <DefaultInput
                placeholder="email@janesfakedomain.net"
                type="email"
                value={contactDetail.email}
                onChange={(e) =>
                  setContactDetail({ ...contactDetail, email: e.target.value })
                }
              />
            </label>
            <label>
              Your message
              <DefaultTextArea
                placeholder="Enter your question or message"
                type="text"
                value={contactDetail.message}
                onChange={(e) =>
                  setContactDetail({
                    ...contactDetail,
                    message: e.target.value,
                  })
                }
              />
            </label>
            <DefaultBtn onClick={sendFormData} color="#6875D1">
              Submit
            </DefaultBtn>
          </form>
        </div>
        <div className="contact-us__right">
          <img src={contactImage} alt="Contact Image" />
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
