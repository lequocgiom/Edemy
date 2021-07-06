import Link from "next/link";

import React, { useEffect, useState } from "react";

const UserNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);
  return (
    <div className="nav flex-column nav-pills">
      <Link href="/user">
        <a className={`nav-link ${current === "/user" && "active"}`}>
          Dasboard
        </a>
      </Link>
    </div>
  );
};

export default UserNav;
