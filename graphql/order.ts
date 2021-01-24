import { gql } from '@apollo/client';

export const ORDER_MUTATION = gql`
  mutation CreateOrder(
    $userId: Int!
    $productIds: [Int!]!
    $customerId: String!
    $customerName: String!
    $customerEmail: String!
  ) {
    createOrder(
      input: {
        userId: $userId
        productIds: $productIds
        customerId: $customerId
        customerName: $customerName
        customerEmail: $customerEmail
      }
    ) {
      order {
        id
      }
      errors {
        path
        message
      }
    }
  }
`;
