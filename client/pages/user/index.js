import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../context";

const UserIndex = () => {
  const [hidden, setHidden] = useState(true);
  const {
    state: { user }
  } = useContext(Context);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log(data);
      setHidden(false);
    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      {!hidden && (
        <h1 className="jumbotron text-center square">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
      )}
    </>
  );
};

export default UserIndex;
