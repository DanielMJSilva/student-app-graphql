import React, { useState } from "react";
import { useLoginMutation } from "./network/loginMutation";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelopeOpenText,
  faKey,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

const Login = ({ loading }) => {
  const [loginMutation, loginMutationResults] = useLoginMutation();
  const [studentNumber, setstudentNumber] = useState("");
  const [password, setPassword] = useState("");

  const onChangeStudentNumber = (e) => {
    const studentNumber = e.target.value;
    setstudentNumber(studentNumber);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const disableForm = loginMutationResults.loading || loading;

  const handleLogin = (e) => {
    e.preventDefault();
    // console.log(studentNumber);
    loginMutation(studentNumber, password);
  };

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="studentNumber">
              <FontAwesomeIcon icon={faEnvelopeOpenText} /> Student Number
            </label>
            <input
              type="text"
              className="form-control"
              name="studentNumber"
              value={studentNumber}
              onChange={onChangeStudentNumber}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <FontAwesomeIcon icon={faKey} /> Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={disableForm}
            >
              <FontAwesomeIcon icon={faArrowRightToBracket} />
              <span> Login</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
