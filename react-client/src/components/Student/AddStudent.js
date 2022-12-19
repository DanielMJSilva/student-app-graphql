import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_STUDENT } from "../queries/StudentQueries";

const AddStudent = () => {
  const [addStudent, { error, loading }] = useMutation(ADD_STUDENT, {
    onError: (err) => {
      console.log({ err });
    },
  });
  const [message, setMessage] = useState("");
  const [successful, setSuccessful] = useState(false);
  const initialStudentState = {
    id: null,
    studentNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    program: "",
    password: "",
  };
  const [currentStudent, setCurrentStudent] = useState(initialStudentState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentStudent({ ...currentStudent, [name]: value });
  };

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;

  const saveStudent = (e) => {
    e.preventDefault();
    setMessage("Add Student Successful");
    setSuccessful(true);
    addStudent({
      variables: {
        studentNumber: currentStudent.studentNumber,
        firstName: currentStudent.firstName,
        lastName: currentStudent.lastName,
        email: currentStudent.email,
        address: currentStudent.address,
        city: currentStudent.city,
        phone: currentStudent.phone,
        program: currentStudent.program,
        password: currentStudent.password,
      },
    });
  };

  return (
    <>
      {!successful && (
        <div>
          <form onSubmit={saveStudent}>
            <div className="container">
              <div className="form-group">
                <label htmlFor="courseCode">Student Number</label>
                <input
                  type="text"
                  className="form-control"
                  id="studentNumber"
                  name="studentNumber"
                  value={currentStudent.studentNumber}
                  onChange={handleInputChange}
                  placeholder="Student Number"
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseCode">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={currentStudent.firstName}
                  onChange={handleInputChange}
                  placeholder="First Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseCode">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={currentStudent.lastName}
                  onChange={handleInputChange}
                  placeholder="Last Name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseCode">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  value={currentStudent.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseCode">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={currentStudent.password}
                  onChange={handleInputChange}
                  placeholder="Password"
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseCode">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  name="address"
                  value={currentStudent.address}
                  onChange={handleInputChange}
                  placeholder="Address"
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseCode">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  value={currentStudent.city}
                  onChange={handleInputChange}
                  placeholder="City"
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseCode">Phone</label>
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={currentStudent.phone}
                  onChange={handleInputChange}
                  placeholder="Phone"
                />
              </div>
              <div className="form-group">
                <label htmlFor="courseCode">Program</label>
                <input
                  type="text"
                  className="form-control"
                  id="program"
                  name="program"
                  value={currentStudent.program}
                  onChange={handleInputChange}
                  placeholder="Program"
                />
              </div>

              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Add Student
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

export default AddStudent;
