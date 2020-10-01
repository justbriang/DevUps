import React, { Fragment, useState } from "react";

import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <Fragment className="container">
      <div className="row shadow3">
        <h1 className=" large text-p">Create Account</h1>
      </div>
      <div className="row">
        <div className="col sideer"></div>
        <div className="col">
          <h1 className=" large text-p">Create Account</h1>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className="form__group">
              <input
                type="text"
                className="form__input"
                placeholder="Name"
                value={name}
                onChange={(e) => onChange(e)}
                name="name"
                // required
              />
            </div>
            <div className="form__group">
              <input
                type="email"
                placeholder="Email Address"
                // required
                className="form__input"
                value={email}
                onChange={(e) => onChange(e)}
                name="email"
              />
            </div>
            <div className="form__group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                className="form__input"
                onChange={(e) => onChange(e)}
                name="password"
                // minLength="6"
              />
            </div>
            <div className="form__group">
              <input
                type="password"
                value={password2}
                className="form__input"
                onChange={(e) => onChange(e)}
                placeholder="Confirm Password"
                name="password2"
              />
            </div>

            <input type="submit" className="btn" value="Register" />
          </form>
          <p className="my-1">
            Already have an account? <Link to="/login">Sign up</Link>
          </p>
        </div>
      </div>
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
