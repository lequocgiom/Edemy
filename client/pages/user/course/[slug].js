import React, { useEffect, useState, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import {
  CheckCircleFilled,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MinusCircleFilled,
  PlayCircleOutlined
} from "@ant-design/icons";

const { Item } = Menu;

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapse, setCollapse] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      loadCourse();
    }
  }, [slug]);

  useEffect(() => {
    if (course) {
      loadCompletedLessons();
    }
  }, [course]);

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id
    });
    console.log("Completed lessons data", data);
    setCompletedLessons(data);
  };

  const loadCourse = async () => {
    try {
      const { data } = await axios.get(`/api/user/course/${slug}`);
      setCourse(data);
    } catch (err) {
      console.log(err);
    }
  };

  const markCompleted = async () => {
    try {
      const { data } = await axios.post(`/api/mark-completed`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id
      });

      console.log(data);
      setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
    } catch (err) {
      console.log(err);
    }
  };

  const markIncompleted = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incompleted`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id
      });

      console.log(data);
      const all = [...completedLessons];
      const index = all.indexOf(course.lessons[clicked]._id);
      if (index > -1) {
        all.splice(index, 1);
        setCompletedLessons(all);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StudentRoute>
        <div className="row flex-1">
          <div className="" style={{ maxWidth: 320 }}>
            <Button
              className={`text-primary mt-1 btn-block mb-2 d-flex justify-content-center align-items-center ${
                !collapse ? "width-100" : "width-80px"
              }`}
              onClick={() => setCollapse(!collapse)}
            >
              {createElement(collapse ? MenuUnfoldOutlined : MenuFoldOutlined)}{" "}
              {!collapse && "Lessons"}
            </Button>
            <Menu
              defaultSelectedKeys={[clicked]}
              inlineCollapsed={collapse}
              style={{ height: "100%", overflow: "auto" }}
            >
              {course.lessons.map((lesson, index) => (
                <Item
                  onClick={() => setClicked(index)}
                  key={index}
                  icon={<Avatar>{index + 1}</Avatar>}
                >
                  {lesson.title.substring(0, 30)}{" "}
                  {completedLessons.includes(lesson._id) ? (
                    <CheckCircleFilled
                      className="float-end text-primary ml-2"
                      style={{ marginTop: "13px" }}
                    />
                  ) : (
                    <MinusCircleFilled
                      className="float-end text-danger ml-2"
                      style={{ marginTop: "13px" }}
                    />
                  )}
                </Item>
              ))}
            </Menu>
          </div>
          <div className="col">
            {clicked !== -1 ? (
              <>
                <div className="col alert alert-primary square">
                  <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                  {completedLessons.includes(course.lessons[clicked]._id) ? (
                    <span
                      className="float-end pointer"
                      onClick={markIncompleted}
                    >
                      Mark as incompleted
                    </span>
                  ) : (
                    <span className="float-end pointer" onClick={markCompleted}>
                      Mark as completed
                    </span>
                  )}
                </div>
                {course.lessons[clicked].video &&
                  course.lessons[clicked].video.Location && (
                    <>
                      <div className="wrapper">
                        <ReactPlayer
                          className="player"
                          url={course.lessons[clicked].video.Location}
                          width="100%"
                          height="100%"
                          controls
                          onEnded={markCompleted}
                        />
                      </div>
                    </>
                  )}
                <ReactMarkdown
                  source={course.lessons[clicked].content}
                  className="single-post"
                />
              </>
            ) : (
              <div className="d-flex justify-content-center p-5">
                <div className="text-center p-5">
                  <PlayCircleOutlined className="text-primary display-1 p-5" />
                  <p className="lead">Click on the lessons to start learning</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </StudentRoute>
    </>
  );
};

export default SingleCourse;
