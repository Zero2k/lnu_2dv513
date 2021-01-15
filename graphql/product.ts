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
