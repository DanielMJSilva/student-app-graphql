import { gql } from "@apollo/client";

const QUERY_USER = gql`
  query User($id: String!) {
    user(id: $id) {
      _id
    }
  }
`;

const loginMutationGQL = gql`
  mutation login($studentNumber: String!, $password: String!) {
    login(studentNumber: $studentNumber, password: $password) {
      token
      userId
    }
  }
`;

export { QUERY_USER, loginMutationGQL };
