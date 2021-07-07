import React, { useState } from "react";
import axios from "axios";
import InstructorRoute from "../../../components/routes/InstructorRoute";

const CourseCreate = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    loading: false,
    imagePreview: ""
  });

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = () => {};

  const handleSubmit = e => {
    e.preventDefault();
    console.log(values);
  };

  const courseCreateFrom = () => (
    <form obSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
        />
      </div>
    </form>
  );

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Create Course</h1>
      <div className="pt-3 pb-3">{courseCreateFrom()}</div>
    </InstructorRoute>
  );
};

export default CourseCreate;
