import React from "react";
import axiso from "axios";
import { useRouter } from "next/router";
import axios from "axios";

const SingleCourse = ({ course }) => {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <pre>{JSON.stringify(course, null, 4)}</pre>
        </div>
      </div>
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
