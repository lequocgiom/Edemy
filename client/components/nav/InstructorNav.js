import Link from "next/link";

import React from "react";

const InstructorNav = () => {
  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link href="/instructor">
        <a className="nav-link active">Dasboard</a>
      </Link>
      <Link href="/instructor/course/create">
        <a className="nav-link">Course Create</a>
      </Link>
    </div>
  );
};

export default InstructorNav;
