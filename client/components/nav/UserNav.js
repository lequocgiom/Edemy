import Link from "next/link";

import React from "react";

const UserNav = () => {
  return (
    <div className="nav flex-column nav-pills mt-2">
      <Link href="/user">
        <a className="nav-link active">Dasboard</a>
      </Link>
    </div>
  );
};

export default UserNav;
