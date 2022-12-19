import { gql } from "@apollo/client";

const ADD_STUDENT = gql`
  mutation AddStudent(
    $studentNumber: String!
    $firstName: String!
    $lastName: String!
    $email: String!
    $address: String!
    $city: String!
    $phone: String!
    $program: String!
    $password: String!
  ) {
    addStudent(
      studentNumber: $studentNumber
      firstName: $firstName
      lastName: $lastName
      email: $email
      address: $address
      city: $city
      phone: $phone
      program: $program
      password: $password
    ) {
      _id
    }
  }
`;

const QUERY_MYCOURSES = gql`
  query MyCourses($id: String!) {
    myCourses(id: $id) {
      _id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const DELETE_MYCOURSE = gql`
  mutation DeleteUserCourse($id: String!, $courseId: String!) {
    deleteUserCourse(id: $id, course: $courseId) {
      _id
    }
  }
`;

const UPDATE_MYCOURSE = gql`
  mutation UpdateUserCourse($id: String!, $courseId: String!) {
    updateUserCourse(id: $id, course: $courseId) {
      _id
    }
  }
`;

const QUERY_COURSESTUDENTS = gql`
  query CourseStudents($id: String!) {
    courseStudents(id: $id) {
      _id
      studentNumber
      firstName
      lastName
    }
  }
`;

export {
  ADD_STUDENT,
  QUERY_MYCOURSES,
  DELETE_MYCOURSE,
  UPDATE_MYCOURSE,
  QUERY_COURSESTUDENTS,
};
