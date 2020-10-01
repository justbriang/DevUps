import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profile";

const Education = ({ education, deleteEducation }) => {
  console.log(education);
  let educations = [];
  if (education) {
    educations = education.map((e) => (
      <tr key={e._id}>
        <td>{e.school}</td>
        <td className="hide-sm">{e.degree}</td>
        <td>
          <Moment format="YYYY/MM/DD">{e.from}</Moment>-
          {e.to === null ? "Now" : <Moment format="YYYY/MM/DD">{e.to}</Moment>}
        </td>
        <td>
          <button
             onClick={() => deleteEducation(e._id)}
            className=" btn btn-danger"
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  } else {
    educations = [];
  }
  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm"> Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
