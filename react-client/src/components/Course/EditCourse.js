import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import {
  QUERY_COURSES,
  UPDATE_COURSE,
  DELETE_COURSE,
} from "../queries/CourseQueries";

const UpdateCourse = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [courseCode, setCourseCode] = useState(
    location.state.course.courseCode
  );
  const [courseName, setCourseName] = useState(
    location.state.course.courseName
  );
  const [semester, setSemester] = useState(location.state.course.semester);
  const [section, setSection] = useState(location.state.course.section);

  const [updateCourse, { error, loading }] = useMutation(UPDATE_COURSE, {
    variables: {
      id: location.state.course._id,
      courseCode,
      courseName,
      semester,
      section,
    },
    refetchQueries: [{ query: QUERY_COURSES }],
    onError: (err) => {
      console.log({ err });
    },
  });

  const [deleteCourse] = useMutation(DELETE_COURSE, {
    refetchQueries: [{ query: QUERY_COURSES }],
    onError: (err) => {
      console.log({ err });
    },
  });

  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const saveCourse = (e) => {
    e.preventDefault();
    if (!courseCode || !courseName)
      return alert("Please fill out required fields");
    setMessage("Update Course Successful");
    setSuccessful(true);
    updateCourse(
      location.state.course._id,
      courseCode,
      courseName,
      semester,
      section
    );
  };

  const deleteSelected = (e) => {
    deleteCourse({
      variables: { id: location.state.course._id },
    });
    navigate("/courses");
  };

  return (
    <>
      {!successful && (
        <div>
          <form onSubmit={saveCourse}>
            <div className="container">
              <div className="form-group">
                <label htmlFor="courseCode">Course Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="courseCode"
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="Course Code"
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseCode">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="courseName"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="Course Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseCode">Section</label>
                <input
                  type="text"
                  className="form-control"
                  id="section"
                  name="section"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  placeholder="Section"
                />
              </div>

              <div className="form-group">
                <label htmlFor="courseCode">Semester</label>
                <input
                  type="text"
                  className="form-control"
                  id="semester"
                  name="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  placeholder="Semester"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary mr-2">
                  Update Course
                </button>
                <button
                  className="btn btn-danger mr-2"
                  onClick={deleteSelected}
                >
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCourse;
