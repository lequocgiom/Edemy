import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Context } from "../context";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    state: { user }
  } = useContext(Context);

  const router = useRouter();

  useEffect(() => {
    if (user !== null) router.push("/");
  }, [user]);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/forgot-password", { email });
      setSuccess(true);
      toast("Check your email for the secret code");
    } catch (err) {
      setLoading(false);
      toast.POSITION(err.response.data);
    }
  };
  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">
        Forgot Password
      </h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />
          <br />
          <button
            className="btn btn-primary btn-block p-2 w-100"
            type="submit"
            disabled={loading || !email}
          >
            {loading ? <SyncOutlined spin /> : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
