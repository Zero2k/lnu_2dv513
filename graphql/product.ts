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

export const PRODUCTS_BY_CATEGORY_QUERY = gql`
  query ProductsByCategoru($category: String!) {
    productsByCategory(category: $category) {
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

export const PRODUCT_BY_ID_QUERY = gql`
  query ProductById($id: Int!) {
    product(productId: $id) {
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
