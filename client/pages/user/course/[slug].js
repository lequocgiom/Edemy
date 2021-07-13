import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";

const { Item } = Menu;

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapse, setCollapse] = useState(false);
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
      const { data } = await axios.get(`/api/user/course/${slug}`);
      setCourse(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <StudentRoute>
        <div className="row flex-1">
          <div className="" style={{ maxWidth: 320 }}>
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
                  {lesson.title.substring(0, 30)}
                </Item>
              ))}
            </Menu>
          </div>
          <div className="col">
            {clicked !== -1 ? (
              <>{JSON.stringify(course.lessons[clicked])}</>
            ) : (
              <>Click on the lesson to start learning</>
            )}
          </div>
        </div>
      </StudentRoute>
    </>
  );
};

export default SingleCourse;
