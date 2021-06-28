import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    // console.table({ name, email, password });
    const { data } = await axios.post(`http://localhost:8000/api/register`, {
      name,
      email,
      password
    });
    console.log("data :>> ", data);
  };
  return (
    <>
      <h1 className="jumbotron text-center  bg-primary square">Register</h1>
      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Enter name"
          />
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Enter email"
          />
          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Enter password"
          />
          <br />
          <button type="submit" className="btn btn-lock btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
