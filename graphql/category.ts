import { gql } from '@apollo/client';

export const CATEGORIES_QUERY = gql`
  query CATEGORIES_QUERY {
    categories {
      name
      products {
        id
        name
      }
    }
  }
`;
