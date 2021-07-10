import React from "react";
import axiso from "axios";
import { useRouter } from "next/router";
import axios from "axios";
import { Badge } from "antd";
import { currencyFormatter } from "../../utils/helpers";

const SingleCourse = ({ course }) => {
  const router = useRouter();
  const { slug } = router.query;

  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category
  } = course;

  return (
    <>
      <div className="jumbotron bg-primary square">
        <div className="row">
          <div className="col-md-8">
            <h1 className="text-light font-weight-bold">{name}</h1>
            <p className="lead">{description?.substring(0, 100)}...</p>
            <Badge
              count={category}
              style={{ backgroundColor: "#03a9f4" }}
              className="pb-4 mr-2"
            />
            <p>Created by {instructor.name}</p>
            <p>Last updated {new Date(updatedAt).toLocaleDateString()}</p>
            <h4 className="text-light">
              {paid
                ? currencyFormatter({
                    amount: price,
                    currency: "usd"
                  })
                : "Free"}
            </h4>
          </div>
          <div className="col-md-4">
            <p>show course image</p>
          </div>
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
