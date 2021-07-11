import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import SingleCourseLesson from "../../components/cards/SingleCourseLesson";
import PreviewModal from "../../components/modal/PreviewModal";
import { Context } from "../../context";
const SingleCourse = ({ course }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { user }
  } = useContext(Context);

  const handlePaidEnrollment = () => {
    console.log("paid enrollment");
  };

  const handleFreeEnrollment = () => {
    console.log("free enrollment");
  };

  return (
    <>
      <SingleCourseJumbotron
        course={course}
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
        setPreview={setPreview}
        user={user}
        loading={loading}
        handlePaidEnrollment={handlePaidEnrollment}
        handleFreeEnrollment={handleFreeEnrollment}
      />
      <PreviewModal
        showModal={showModal}
        setShowModal={setShowModal}
        preview={preview}
      />

      {course.lessons && (
        <SingleCourseLesson
          lessons={course.lessons}
          setPreview={setPreview}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.query;
  const { data } = await axios.get(`${process.env.API}/course/${slug}`);
  return {
    props: {
      course: data
    }
  };
}

export default SingleCourse;
