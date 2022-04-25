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

export const FETCH_USER_BY_ID_QUERY = gql`
  query FetchUserById($user_id: String!) {
    users_by_pk(id: $user_id) {
      id
      name
      created_at
      blogs(order_by: { created_at: desc }) {
        id
        title
        user {
          id
          created_at
          name
        }
        created_at
        author
      }
    }
  }
`;
