import React, { useEffect, useState } from "react";
import axios from "axios";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar, Tooltip } from "antd";
import Link from "next/link";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

export const myStyle = { marginTop: "-10px", fontSize: "10px" };

const InstructorIndex = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };
  return (
    <InstructorRoute>
      <h1 className="jumbotron text-center square">Instructor Dashboard</h1>
      {/* <pre>{JSON.stringify(courses, null, 4)}</pre> */}
      {courses?.map(course => (
        <React.Fragment key={course._id}>
          <div className="media pt-2 d-flex">
            <Avatar
              size={80}
              src={course.image ? course.image.Location : "/course.png"}
            />

            <div className="media-body pl-2 w-100">
              <div className="row">
                <div className="col">
                  <Link
                    href={`/instructor/course/view/${course.slug}`}
                    className="pointer"
                  >
                    <a className="text-primary d-inline-block">
                      <h5 className="pt-2">{course.name}</h5>
                    </a>
                  </Link>
                  <p style={{ marginTop: "-10px" }}>
                    {course.lessons.length} Lessons
                  </p>

                  {course.lessons.length < 5 ? (
                    <p style={myStyle} className="text-warning">
                      At least 5 lessons are required to publish a course
                    </p>
                  ) : course.published ? (
                    <p style={myStyle} className="text-success">
                      Your course is live in the marketplace
                    </p>
                  ) : (
                    <p style={myStyle} className="text-success">
                      Your course is ready to be published
                    </p>
                  )}
                </div>
                <div className="col-md-3 mt-3 text-center">
                  {course.published ? (
                    <Tooltip title="Published">
                      <CheckCircleOutlined className="h5 pointer text-success" />
                    </Tooltip>
                  ) : (
                    <Tooltip title="Unpublished">
                      <CloseCircleOutlined className="h5 pointer text-warning" />
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
    </InstructorRoute>
  );
};

export default InstructorIndex;
