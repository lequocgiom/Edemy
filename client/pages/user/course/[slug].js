import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const SingleCourse = () => {
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      loadCourse();
    }
  }, [slug]);

  const loadCourse = async () => {
    try {
      const { data } = await axios.get(`/api/course/${slug}`);
      setCourse(data);
    } catch (err) {
      console.log(err);
    }
  };

  return <h1>{JSON.stringify(course, null, 4)}</h1>;
};

export default SingleCourse;
