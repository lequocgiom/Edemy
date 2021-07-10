import { Card, Badge } from "antd";
import Link from "next/link";

import React from "react";
const { Meta } = Card;

const CourseCard = ({ course }) => {
  const { name, slug, instructor, price, image, paid, category } = course;
  return (
    <Link href={`/course/${slug}`}>
      <a>
        <Card
          className="mb-4"
          cover={
            <img
              src={image.Location ? image.Location : "/course.png"}
              alt={name}
              style={{ height: "200px", objectFit: "cover" }}
              className="p-1"
            />
          }
        >
          <h2 className="font-weigt-bold">{name}</h2>
          <p>by {instructor.name}</p>
          <Badge
            count={category}
            style={{ backgroundColor: "#03a9f4" }}
            className="pb-2 mr-2"
          />
          <h4 className="pt-2">{paid ? price : "Free"}</h4>
        </Card>
      </a>
    </Link>
  );
};

export default CourseCard;
