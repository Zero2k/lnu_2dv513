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

export const ORDER_QUERY = gql`
  query FindOrderRowsById($orderId: Int!) {
    findOrderRowsById(orderId: $orderId) {
      rowId
      productName
      price
      cost
    }
    findOrderById(orderId: $orderId) {
      id
      completed
      customerName
      customerEmail
      customerId
      total
    }
  }
`;

export const COMPLETE_ORDER_MUTATION = gql`
  mutation CompleteOrder($orderId: Int!) {
    completeOrder(orderId: $orderId) {
      id
      completed
    }
  }
`;

export const CHECK_ORDERSTATUS_QUERY = gql`
  query FindCustomerOrder($resellerId: Int!, $customerId: String!) {
    findCustomerOrder(resellerId: $resellerId, customerId: $customerId) {
      id
      completed
    }
  }
`;
