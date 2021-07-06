import { SyncOutlined } from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Context } from "../../context";

const StripeCallback = () => {
  const {
    state: { user }
  } = useContext(Context);

  useEffect(() => {
    if (user) {
      axios.post("/api/get-account-status").then(res => {
        console.log("res :>> ", res);
        // window.location.href = "/instructor";
      });
    }
  }, [user]);
  return (
    <SyncOutlined
      spin
      className="d-flex justify-content-center display-1 text-danger p-5"
    />
  );
};

export default StripeCallback;
