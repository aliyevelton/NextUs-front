import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { Input, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef, useState } from "react";
import { DefaultBtn } from "../../assets/components.styles";

function CourseForm({ categories, companies, vacancy, setVacancy, errors }) {

  const [tagValue, setTagValue] = useState("");

  function deleteTags(e, i) {
    e.preventDefault();
    let updatedTags = [...vacancy.tags];
    updatedTags.splice(i, 1);
    setVacancy({ ...vacancy, tags: updatedTags });
  }

  function handleTags(e) {
    e.preventDefault();

    let updatedTags = [...vacancy.tags];
    let found = false;

    for (const tag of updatedTags) {
      if (tag === tagValue) {
        found = true;
      }
    }

    if (found) {
      alert("Already available");
      return;
    } else if (tagValue && tagValue.length > 0) {
      updatedTags.push(tagValue);
    } else {
      alert("Invalid name");
    }

    setVacancy({ ...vacancy, tags: updatedTags });
  }


  return (
    <>
      <div className="vacancy-form">
        <div className="vacancy-form__row">
          <div className="vacancy-form-field">
            <Input
              placeholder="Title"
              value={vacancy.title}
              onChange={(e) => setVacancy({ ...vacancy, title: e.target.value })}
              style={{ fontFamily: "Poppins" }}
            />
            {errors.title ? (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.title}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="vacancy-form-field">
            <Input
              placeholder="Positon"
              value={vacancy.position}
              onChange={(e) =>
                setVacancy({ ...vacancy, position: e.target.value })
              }
              style={{ fontFamily: "Poppins" }}
            />
            {errors.position ? (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.position}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="vacancy-form-field">
            <Input
              placeholder="Location"
              value={vacancy.location}
              onChange={(e) =>
                setVacancy({ ...vacancy, location: e.target.value })
              }
              style={{ fontFamily: "Poppins" }}
            />
            {errors.location ? (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.location}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="vacancy-form__row">
          <div className="vacancy-form-field">
            <Space wrap>
              <Select
                defaultValue={"Select job type"}
                onChange={(value) => setVacancy({ ...vacancy, jobType: value })}
                options={[
                  { value: 1, label: "Full time" },
                  { value: 2, label: "Part time" },
                  { value: 3, label: "Remote" },
                  { value: 4, label: "Freelance" },
                  { value: 5, label: "Iternship" },
                ]}
              />
            </Space>
            {errors.jobType ? (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.jobType}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="vacancy-form-field">
            <Space wrap>
              <Select
                defaultValue={"Select category"}
                onChange={(value) =>
                  setVacancy({ ...vacancy, categoryId: value })
                }
                options={categories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))}
              />
            </Space>
            {errors.categoryId ? (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.categoryId}</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="vacancy-form-field">
            <Space wrap>
              <Select
                defaultValue={"Select company"}
                onChange={(value) => setVacancy({ ...vacancy, companyId: value })}
                options={companies.map((company) => ({
                  value: company.id,
                  label: company.name,
                }))}
              />
            </Space>
            {errors.companyId ? (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.companyId}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="vacancy-form__message">
          <div className="vacancy-form__salary">
            <div className="vacancy-form-field">
              <Space wrap>
                <Select
                  defaultValue={"Select salary type"}
                  onChange={(value) =>
                    setVacancy({ ...vacancy, salaryType: value })
                  }
                  options={[
                    { value: 1, label: "Exact salary" },
                    { value: 2, label: "Salary range" },
                    { value: 3, label: "Not specified" },
                  ]}
                />
              </Space>
              {errors.salaryType ? (
                <div className="error-validation">
                  <span>*</span>
                  <p>{errors.salaryType}</p>
                </div>
              ) : (
                ""
              )}
            </div>
            {vacancy.salaryType === 1 ? (
              <div className="vacancy-form-field">
                <Input
                  placeholder="Exact salary"
                  value={vacancy.exactSalary}
                  onChange={(e) =>
                    setVacancy({ ...vacancy, exactSalary: e.target.value })
                  }
                  style={{ fontFamily: "Poppins" }}
                />
                {errors.exactSalary ? (
                  <div className="error-validation">
                    <span>*</span>
                    <p>{errors.exactSalary}</p>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ) : vacancy.salaryType === 2 ? (
              <div className="vacancy-form__range">
                <div className="vacancy-form-field">
                  <Input
                    placeholder="Min"
                    type="number"
                    value={vacancy.minSalary}
                    onChange={(e) =>
                      setVacancy({ ...vacancy, minSalary: e.target.value })
                    }
                    style={{ fontFamily: "Poppins" }}
                  />
                  {errors.minSalary ? (
                    <div className="error-validation">
                      <span>*</span>
                      <p>{errors.minSalary}</p>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className="vacancy-form-field">
                  <Input
                    onChange={(e) =>
                      setVacancy({ ...vacancy, maxSalary: e.target.value })
                    }
                    placeholder="Max"
                    type="number"
                    style={{ fontFamily: "Poppins" }}
                  />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="vacancy-form-field">
            <TextArea
              showCount
              maxLength={200}
              value={vacancy.description}
              onChange={(e) =>
                setVacancy({ ...vacancy, description: e.target.value })
              }
              placeholder="Description"
              style={{
                fontFamily: "Poppins !important",
                height: 120,
                resize: "none",
              }}
            />
            {errors.description ? (
              <div className="error-validation">
                <span>*</span>
                <p>{errors.description}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="vacancy-form__row">
          <div className="vacancy-form-field">
            <input
              onChange={(e) => setTagValue(e.target.value)}
              placeholder="Tags"
              value={tagValue}
              style={{ fontFamily: "Poppins" }}
            />
          </div>
          <button onClick={handleTags} id="overRideBtn">
            Add a tag
          </button>
        </div>
      </div>
      <div id="tagsDiv">
        {vacancy.tags != undefined && vacancy.tags.length > 0 && vacancy.tags.map((tag, index) => (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }} key={index}>
            <p key={index}>{tag}</p>
            <button id="overRideBtn" onClick={(e) => deleteTags(e, index)}>x</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default CourseForm;
