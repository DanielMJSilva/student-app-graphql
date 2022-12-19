import { gql } from "@apollo/client";

const QUERY_COURSE = gql`
  query GetCourse($id: String!) {
    course(id: $id) {
      _id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const QUERY_COURSES = gql`
  query GetCourse {
    courses {
      _id
      courseCode
      courseName
      section
      semester
    }
  }
`;

const ADD_COURSE = gql`
  mutation AddCourse(
    $courseCode: String!
    $courseName: String!
    $section: String!
    $semester: String!
  ) {
    addCourse(
      courseCode: $courseCode
      courseName: $courseName
      section: $section
      semester: $semester
    ) {
      _id
    }
  }
`;

const UPDATE_COURSE = gql`
  mutation UpdateCourse(
    $id: String!
    $courseCode: String!
    $courseName: String!
    $section: String!
    $semester: String!
  ) {
    updateCourse(
      id: $id
      courseCode: $courseCode
      courseName: $courseName
      section: $section
      semester: $semester
    ) {
      _id
    }
  }
`;

const DELETE_COURSE = gql`
  mutation DeleteCourse($id: String!) {
    deleteCourse(id: $id) {
      _id
    }
  }
`;

export {
  QUERY_COURSE,
  QUERY_COURSES,
  ADD_COURSE,
  UPDATE_COURSE,
  DELETE_COURSE,
};
