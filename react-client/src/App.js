import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./components/Home";
import AddCourse from "./components/Course/AddCourse";
import AddStudent from "./components/Student/AddStudent";
import ListCourse from "./components/Course/ListCourse";
import EditCourse from "./components/Course/EditCourse";
import MyCourses from "./components/Student/MyCourses";
import Login from "./components/Login";

import {
  useAuthToken,
  useAuthUserToken,
  useLogout,
} from "./components/config/auth";
import { QUERY_USER } from "./components/queries/LoginQueries";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopHouse,
  faSignInAlt,
  faUserGraduate,
  faUserPlus,
  faRightFromBracket,
  faBook,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@apollo/client";

const App = () => {
  const [userId, setUserId] = useState("");
  const [currentUser, setCurrentUser] = useState(undefined);
  const [authToken] = useAuthToken();
  const [authUserToken] = useAuthUserToken();

  const { loading, data } = useQuery(QUERY_USER, {
    variables: { id: authUserToken },
    onCompleted: () => {
      console.log("query successful", data);
    },
  });

  useEffect(() => {
    if (authToken) {
      setCurrentUser(authUserToken);
      setUserId(authUserToken);
    }
  }, [authToken]);

  const logout = useLogout();

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          <span style={{ color: "white" }}>Daniel Machado</span>
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              <FontAwesomeIcon icon={faLaptopHouse} /> Home
            </Link>
          </li>

          {currentUser && (
            <li className="nav-item">
              <Link to={"/mycourses"} className="nav-link">
                <FontAwesomeIcon icon={faUserGraduate} /> My Courses
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/courses"} className="nav-link">
                <FontAwesomeIcon icon={faBook} /> Courses
              </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/course/add"} className="nav-link">
                <FontAwesomeIcon icon={faSquarePlus} /> Add Course
              </Link>
            </li>

            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logout}>
                <FontAwesomeIcon icon={faRightFromBracket} /> LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                <FontAwesomeIcon icon={faUserPlus} /> Sign Up
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/course/add" element={<AddCourse />} />
          <Route path="/register" element={<AddStudent />} />
          <Route path="/courses" element={<ListCourse />} />
          <Route path="/course/" element={<EditCourse />} />
          <Route path="/mycourses" element={<MyCourses id={userId} />} />
          <Route path="/login" element={<Login loading={loading} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
