import { gql } from '@apollo/client';

export const FETCH_USERS_QUERY = gql`
  query FetchUsers {
    users(order_by: { created_at: desc }) {
      id
      name
      created_at
      blogs_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`;
