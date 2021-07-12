import axios from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import SingleCourseJumbotron from "../../components/cards/SingleCourseJumbotron";
import SingleCourseLesson from "../../components/cards/SingleCourseLesson";
import PreviewModal from "../../components/modal/PreviewModal";
import { Context } from "../../context";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const SingleCourse = ({ course }) => {
  const router = useRouter();
  const { slug } = router.query;

  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [enrolled, setEnrolled] = useState({});

  const {
    state: { user }
  } = useContext(Context);

  useEffect(() => {
    console.log("user, course :>> ", user, course);
    if (user && course) checkErollment();
  }, [user]);

  const checkErollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`);
    console.log("data check enrollment :>> ", data);
    setEnrolled(data);
  };

  const handlePaidEnrollment = async e => {
    console.log("paid enrollment");
    try {
      setLoading(true);
      if (!user) router.push("/login");

      //check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);

      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`);
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
      stripe.redirectToCheckout({ sessionId: data });
    } catch (err) {
      toast("Enrollment failed. Try again.");
      console.log(err);
      setLoading(false);
    }
  };

  const handleFreeEnrollment = async e => {
    // console.log("free enrollment");
    e.preventDefault();
    try {
      // check if user is logged in
      if (!user) router.push("/login");

      //check if already enrolled
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`);

      setLoading(true);
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`);
      toast(data.message);
      setLoading(false);
      router.push(`/user/course/${data.course.slug}`);
    } catch (err) {
      toast("Enrollment failed. Try again.");
      console.log(err);
      setLoading(false);
    }
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
        enrolled={enrolled}
        setEnrolled={setEnrolled}
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
  console.log("context", context);
  const { data } = await axios.get(`${process.env.API}/course/${slug}`);
  return {
    props: {
      course: data
    }
  };
}

export default SingleCourse;
