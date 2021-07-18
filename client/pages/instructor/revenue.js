import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../context";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { DollarOutlined, SettingOutlined } from "@ant-design/icons";
import { stripeCurrencyFormatter } from "../../utils/helpers";
const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] });

  useEffect(() => {
    sendBalanceRequest();
  }, []);

  const sendBalanceRequest = async () => {
    console.log("send balance request");
    const { data } = await axios.get("/api/instructor/balance");
    setBalance(data);
  };

  const handlePayoutSettings = async () => {
    console.log("handlePayoutSettings");
  };

  return (
    <InstructorRoute>
      <div className="container">
        <div className="row pt-2">
          <div className="col-md-8 offset-md-2 bg-light p-5">
            <h2>
              Revenue report <DollarOutlined className="float-end" />
            </h2>
            <small>
              You get paid directly from stripe to your bank account every 48
              hours
            </small>
            <hr />
            <h4>
              Pending balance{" "}
              <span className="float-end">
                {balance.pending?.map((bp, i) => (
                  <span key={i} className="float-end">
                    {stripeCurrencyFormatter(bp)}
                  </span>
                ))}{" "}
              </span>
            </h4>
            <small>For last 48 hours</small>
            <hr />
            {/* {JSON.stringify(balance, null, 4)} */}
            <h4>
              Payouts{" "}
              <SettingOutlined
                className="float-end pointer"
                onClick={handlePayoutSettings}
              />
            </h4>
            <small>
              Update your stripe account details or view previous payouts
            </small>
          </div>
        </div>
      </div>
    </InstructorRoute>
  );
};

export default InstructorRevenue;
