import React, { Fragment, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    //   const newUser = {
    //     name,
    //     email,
    //     password,
    //   };
    //   try {
    //     const config = {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     };
    //     const body = JSON.stringify(newUser);
    //     const res = await axios.post("/api/users", body, config);
    //     console.log(res.data);
    //   } catch (err) {
    //     console.error(err.response.data);
    //   }
  };
  return (
    <Fragment className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign In
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => onChange(e)}
            name="email"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
            name="password"
            minLength="6"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </Fragment>
  );
};
export default Register;
