import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";
import { QUERY_COURSES } from "../queries/CourseQueries";
import { QUERY_COURSESTUDENTS } from "../queries/StudentQueries";

const CourseList = () => {
  const [selectdCourse, setSelectedCourse] = useState(null);
  const [courseStudents, setCourseStudents] = useState([]);
  const [currentCourseName, setCurrentCourseName] = useState("");

  const { loading, error, data } = useQuery(QUERY_COURSES, {
    onError: (err) => {
      console.log({ err });
    },
  });

  const [getStudents, { refetch }] = useLazyQuery(QUERY_COURSESTUDENTS, {
    onError: (err) => {
      console.log({ err });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return `Submission error! ${error.message}`;

  const viewActiveCourse = (courseId, courseName) => {
    getStudents({
      variables: { id: courseId },
      onCompleted: (someData) => {
        setCourseStudents(someData);
        setSelectedCourse(courseId);
        setCurrentCourseName(courseName);
      },
    });
  };

  return (
    <div>
      <div className="container">
        <div className="mybox-form">
          <h2>List of All Courses</h2>
          <div className="table-responsive">
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th className="text-center col-1">#</th>
                  <th className="text-center">Course Code</th>
                  <th className="text-center">Course Name</th>
                  <th className="text-center">Section</th>
                  <th className="text-center">Semester</th>
                  <th className="text-center col-1">Action</th>
                  <th className="text-center">Students</th>
                </tr>
              </thead>
              <tbody>
                {data.length !== 0 ? (
                  <>
                    {data.courses.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.courseCode}</td>
                        <td>{item.courseName}</td>
                        <td>{item.section}</td>
                        <td>{item.semester}</td>
                        <td>
                          <Link
                            to="/course/"
                            state={{ course: item }}
                            className="badge badge-warning"
                          >
                            Edit
                          </Link>
                        </td>
                        <td>
                          <button
                            className="badge badge-secondary"
                            onClick={() =>
                              viewActiveCourse(item._id, item.courseName)
                            }
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : null}
              </tbody>
            </table>
          </div>
          {selectdCourse ? (
            <div>
              <h4>List Students of {currentCourseName}</h4>
              <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                  <thead>
                    <tr>
                      <th className="text-center col-1">#</th>
                      <th className="text-center">Student Number</th>
                      <th className="text-center">First Name</th>
                      <th className="text-center">Last Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courseStudents.length !== 0 ? (
                      <>
                        {courseStudents.courseStudents.map((item, idx) => (
                          <tr key={idx}>
                            <td>{idx + 1}</td>
                            <td>{item.studentNumber}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                          </tr>
                        ))}
                      </>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click view of any Course...</p>
            </div>
          )}
          <div className="form-group">
            <button className="btn btn-primary" onClick={() => refetch()}>
              Refetch
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
