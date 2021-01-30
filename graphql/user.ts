import { gql } from '@apollo/client';

export const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      email
      name
      phone
      address
      zip
      city
      products {
        id
      }
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

export const HANDLE_PROFILE = gql`
  mutation HandleProfile(
    $name: String!
    $phone: String!
    $address: String!
    $zip: String!
    $city: String!
  ) {
    handleProfile(
      input: {
        name: $name
        phone: $phone
        address: $address
        zip: $zip
        city: $city
      }
    ) {
      user {
        id
        name
        phone
        address
        zip
        city
      }
      errors {
        path
        message
      }
    }
  }
`;

export const RESELLERS_QUERY = gql`
  query Resellers {
    resellers {
      id
      name
      address
      zip
      city
      products {
        id
      }
    }
  }
`;

export const FIND_USER_QUERY = gql`
  query FindUserById($userId: Int!) {
    findUserById(userId: $userId) {
      id
      name
      address
      city
      zip
      phone
      email
      products {
        id
        name
        description
        price
        category {
          id
          name
          slug
        }
      }
    }
  }
`;

export const USER_ORDERS_QUERY = gql`
  query ResellerOrders {
    resellerOrders {
      id
      customerId
      customerName
      customerEmail
      total
      completed
    }
  }
`;

export const USERS_WITH_PRODUCT_ID_QUERY = gql`
  query FindResellersProductId($productId: Int!) {
    findUsersByProduct(productId: $productId) {
      id
      name
      address
      zip
      city
      products {
        id
      }
    }
  }
`;
