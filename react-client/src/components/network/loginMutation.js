import { useMutation } from "@apollo/react-hooks";
import { useAuthToken, useAuthUserToken } from "../config/auth";
import { loginMutationGQL } from "../queries/LoginQueries";
import { useNavigate } from "react-router-dom";

export const useLoginMutation = () => {
  let navigate = useNavigate();
  const [_, setAuthToken, removeAuthtoken] = useAuthToken();
  const [__, setAuthUserToken, removeAuthUsertoken] = useAuthUserToken();

  const [mutation, mutationResults] = useMutation(loginMutationGQL, {
    onCompleted: (data) => {
      setAuthToken(data.login.token);
      setAuthUserToken(data.login.userId);
      navigate("/");
    },
    onError: (err) => {
      console.log({ err });
      alert("Invalid credentials");
    },
  });

  // full login function
  const login = (studentNumber, password) => {
    removeAuthtoken();
    removeAuthUsertoken();

    return mutation({
      variables: {
        studentNumber: studentNumber,
        password,
      },
    });
  };
  return [login, mutationResults];
};
