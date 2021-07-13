import React from "react";
import { useRouter } from "next/router";

const SingleCourse = () => {
  const router = useRouter();

  return <h1>course slug is {router.query.slug}</h1>;
};

export default SingleCourse;
