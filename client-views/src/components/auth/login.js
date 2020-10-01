import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

import { login } from "../../actions/auth";
const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();

    login({ email, password });
  };
  //redirect if loggin in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment>
      <div className="row shadow3">
        <h1 className=" large text-p">Sign In</h1>
      </div>
      <div className="row">
        <div className="col sideer"></div>
        <div className="col">
          <h1 className=" large text-p">Sign In</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form__group">
              <input
                className="form__input"
                type="email"
                placeholder="Email Address"
                required
                value={email}
                onChange={(e) => onChange(e)}
                name="email"
              />
              <label for="email" class="form__label">
                Email Address
              </label>
            </div>
            <div className="form__group">
              <input
                className="form__input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => onChange(e)}
                name="password"
                minLength="6"
              />
              <label for="password" class="form__label">
                Password
              </label>
            </div>

            <input type="submit" className="btn" value="login" />
          </form>
          <p className="my-1">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
