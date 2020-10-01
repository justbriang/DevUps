import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile,deleteAccount } from "../../actions/profile";
import Spinner from "../common/Spinner";
import DashboardActions from "./dashboardActions";
import Experience from "./experience";
import Education from "./education";
const Dashboard = ({
  getCurrentProfile,
  deleteAccount,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fa fa-use"></i>Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className="my-d">
            <button className="btn btn-danger" onClick={()=>deleteAccount()}>
              <i className="fas fa-user-minus">Delete My Account</i>
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            You have not yet set a profile, please add your information{" "}
            <Link to="/create-profile" className="btn my-1">
              Create Profile
            </Link>{" "}
          </p>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
deleteAccount:PropTypes.func.isRequired,
});

export default connect(mapStateToProps, { getCurrentProfile ,deleteAccount})(Dashboard);
