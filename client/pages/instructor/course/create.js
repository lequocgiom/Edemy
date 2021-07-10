import axios from "axios";
import router from "next/router";
import React, { useEffect, useState } from "react";
import Resizer from "react-image-file-resizer";
import { toast } from "react-toastify";
import CourseCreateForm from "../../../components/forms/CourseCreateForm";
import InstructorRoute from "../../../components/routes/InstructorRoute";

const CourseCreate = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "9.99",
    uploading: false,
    paid: true,
    category: "",
    loading: false
  });

  useEffect(() => {
    if (!values.paid) {
      setValues({ ...values, price: 0 });
    } else {
      setValues({ ...values, price: "9.99" });
    }
  }, [values.paid]);

  const [preview, setPreview] = useState("");
  const [uploadButtonText, setUploadButtonText] = useState("Upload Image");
  const [image, setImage] = useState("");

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleImage = e => {
    let file = e.target.files[0];
    setPreview(window.URL.createObjectURL(file));
    setUploadButtonText(file.name);
    setValues({ ...values, loading: true });

    //resize
    Resizer.imageFileResizer(file, 720, 500, "JPEG", 100, 0, async uri => {
      try {
        let { data } = await axios.post("/api/course/upload-image", {
          image: uri
        });
        console.log("IMAGE UPlOADED", data);
        setImage(data);

        //set image in the state
        setValues({ ...values, loading: false });
        toast("Upload image successfully!");
      } catch (err) {
        console.log(err);
        setValues({ ...values, loading: false });
        toast("Image upload failed. Try later.");
      }
    });
  };

  const handleImageRemove = async e => {
    try {
      setValues({ ...values, loading: true });
      console.log("REMOVE IMAGE");
      const res = await axios.post("/api/course/remove-image", { image });
      setImage({});
      setPreview("");
      setUploadButtonText("Upload Image");
      setValues({ ...values, loading: false });
    } catch (err) {
      console.log(err);
      setValues({ ...values, loading: false });
      toast("Image upload failed. Try later.");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // console.log(values);
    try {
      const { data } = await axios.post("/api/course", {
        ...values,
        image
      });
      toast("Great! Now you can start adding lessons");
      router.push("/instructor");
    } catch (err) {
      console.log(err);
      toast(err.response.data);
    }
  };

  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Create Course</h1>
      <div className="pt-3 pb-3">
        <CourseCreateForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleImage={handleImage}
          handleImageRemove={handleImageRemove}
          values={values}
          setValues={setValues}
          preview={preview}
          uploadButtonText={uploadButtonText}
        />
      </div>
      {/* <pre>{JSON.stringify(values, null, 4)}</pre>
      <hr />
      <pre>{JSON.stringify(image, null, 4)}</pre> */}
    </InstructorRoute>
  );
};

export default CourseCreate;
