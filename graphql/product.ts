import { gql } from '@apollo/client';

export const HANDLE_PRODUCTS = gql`
  mutation HandleProducts($productIds: [Int!]!) {
    handleProducts(input: { productIds: $productIds }) {
      products {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query Products {
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
`;
