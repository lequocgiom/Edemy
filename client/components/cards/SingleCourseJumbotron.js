import { Badge, Modal } from "antd";
import React from "react";
import { currencyFormatter } from "../../utils/helpers";
import ReactPlayer from "react-player";

const SingleCourseJumbotron = ({
  course,
  setPreview,
  preview,
  showModal,
  setShowModal
}) => {
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
    <div className="jumbotron bg-primary square">
      <div className="row">
        <div className="col-md-8">
          {/* title */}
          <h1 className="text-light font-weight-bold">{name}</h1>
          {/* description */}
          <p className="lead">{description?.substring(0, 100)}...</p>
          {/* category */}
          <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-4 mr-2"
          />
          {/* instructor */}
          <p>Created by {instructor.name}</p>
          {/* last updated */}
          <p>Last updated {new Date(updatedAt).toLocaleDateString()}</p>
          {/* price */}
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
          {lessons[0].video &&
          lessons[0].free_preview &&
          lessons[0].video.Location ? (
            <div
              onClick={() => {
                setPreview(lessons[0].video.Location);
                setShowModal(!showModal);
              }}
            >
              <ReactPlayer
                className="react-player-div"
                url={lessons[0].video.Location}
                light={image.Location}
                width="100%"
                height="225px"
              />
            </div>
          ) : (
            <>
              <img
                src={image.Location ? image.Location : "/course.png"}
                alt={name}
                className="img img-fluid"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseJumbotron;
