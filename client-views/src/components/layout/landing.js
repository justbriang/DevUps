import React from "react";
import { Link, Redirect } from "react-router-dom";
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

export const landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Redirect to='/dashboard'/>
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, Changing the world from the
            back of a computer
          </p>
          <div className="buttons">
            <Link to="/register" className="btn spacer btn-circle">
              Sign Up
            </Link>
            <Link to="/login" className="btn spacer btn-circle">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
landing.propTypes={
  isAuthenticated:PropTypes.bool,
}
const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})
export default connect(mapStateToProps) (landing);
