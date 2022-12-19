import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_MYCOURSES,
  DELETE_MYCOURSE,
  UPDATE_MYCOURSE,
} from "../queries/StudentQueries";
import { QUERY_COURSES } from "../queries/CourseQueries";

const MyCourses = (props) => {
  const id = props.id;
  const [course, setCourse] = useState("");

  const courses = useQuery(QUERY_COURSES, {
    onError: (err) => {
      console.log({ err });
    },
  });

  const { loading, error, data } = useQuery(QUERY_MYCOURSES, {
    variables: {
      id: id,
    },
    onError: (err) => {
      console.log({ err });
    },
  });

  const [deleteMyCourse] = useMutation(DELETE_MYCOURSE, {
    refetchQueries: [
      {
        query: QUERY_MYCOURSES,
        variables: {
          id: id,
        },
      },
    ],
    onError: (err) => {
      console.log({ err });
    },
  });

  const [updateMyCourse] = useMutation(UPDATE_MYCOURSE, {
    refetchQueries: [
      {
        query: QUERY_MYCOURSES,
        variables: {
          id: id,
        },
      },
    ],
    onError: (err) => {
      console.log({ err });
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return `Submission error! ${error.message}`;

  const deleteSelected = (courseId) => {
    deleteMyCourse({
      variables: { id: id, courseId: courseId },
    });
  };

  const handleChange = (event) => {
    setCourse(event.target.value);
  };

  const enrollNewCourse = (e) => {
    if (course === "") {
      window.alert("Selection cannot be empty");
      return;
    }
    e.preventDefault();
    updateMyCourse({
      variables: { id: id, courseId: course },
    });
    setCourse("");
  };

  return (
    <div>
      <div className="container">
        <div className="mybox-form">
          <h2>List of My Courses</h2>
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
                </tr>
              </thead>
              <tbody>
                {data.length !== 0 ? (
                  <>
                    {data.myCourses.map((item, idx) => (
                      <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td>{item.courseCode}</td>
                        <td>{item.courseName}</td>
                        <td>{item.section}</td>
                        <td>{item.semester}</td>
                        <td>
                          <button
                            className="badge badge-danger"
                            onClick={() => deleteSelected(item._id)}
                          >
                            Drop
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                ) : null}
              </tbody>
            </table>
          </div>
          <h5>Exisiting Course</h5>
          <form onSubmit={enrollNewCourse}>
            <div className="row">
              <div className="col align-self-start">
                <select
                  className="form-control"
                  style={{ width: "300px" }}
                  value={course}
                  onChange={handleChange}
                >
                  <option value=""></option>
                  {courses.length !== 0 && (
                    <>
                      {courses.data.courses.map((item, idx) => (
                        <option key={idx} value={item._id}>
                          {item.courseCode}
                        </option>
                      ))}
                    </>
                  )}
                </select>
              </div>
              <div className="col align-self-end">
                <button type="submit" className="btn btn-success btn-sm">
                  Enroll New Course
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
