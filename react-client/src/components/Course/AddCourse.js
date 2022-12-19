import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COURSE, QUERY_COURSES } from "../queries/CourseQueries";

const AddCourse = () => {
  const [addCourse, { error, loading }] = useMutation(ADD_COURSE, {
    refetchQueries: [{ query: QUERY_COURSES }],
    onError: (err) => {
      console.log({ err });
    },
  });
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const initialCourseState = {
    id: null,
    courseCode: "",
    courseName: "",
    section: "",
    semester: "",
    userId: "",
  };
  const [currentCourse, setCurrentCourse] = useState(initialCourseState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentCourse({ ...currentCourse, [name]: value });
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const saveCourse = (e) => {
    e.preventDefault();
    setMessage("Add Course Successful");
    setSuccessful(true);
    addCourse({
      variables: {
        courseCode: currentCourse.courseCode,
        courseName: currentCourse.courseName,
        section: currentCourse.section,
        semester: currentCourse.semester,
      },
    });
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
                  id="courseCode"
                  name="courseCode"
                  value={currentCourse.courseCode}
                  onChange={handleInputChange}
                  placeholder="Course Code"
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseCode">Course Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="courseName"
                  name="courseName"
                  value={currentCourse.courseName}
                  onChange={handleInputChange}
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
                  value={currentCourse.section}
                  onChange={handleInputChange}
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
                  value={currentCourse.semester}
                  onChange={handleInputChange}
                  placeholder="Semester"
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Add Course
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

export default AddCourse;
