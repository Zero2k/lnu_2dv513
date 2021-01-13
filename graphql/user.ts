import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const SIGNIN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUp($email: String!, $password: String!) {
    signUp(input: { email: $email, password: $password }) {
      user {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;
