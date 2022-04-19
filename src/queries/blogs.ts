import { gql } from '@apollo/client';

export const FETCH_BLOGS_QUERY = gql`
  query FetchBlogs {
    blogs(order_by: { created_at: desc }) {
      id
      author
      created_at
      likes
      title
      user {
        id
        name
      }
    }
  }
`;

export const INSERT_BLOG_MUTATION = gql`
  mutation InsertBlog($author: String!, $title: String!, $url: String!) {
    insert_blogs_one(object: { author: $author, title: $title, url: $url }) {
      id
    }
  }
`;

export const FETCH_BLOG_DETAILS_QUERY = gql`
  query FetchBlogDetails($id: String!) {
    blogs_by_pk(id: $id) {
      id
      author
      created_at
      likes
      title
      url
      user {
        id
        name
      }
      comments(order_by: { created_at: asc }) {
        id
        content
        created_at
        user {
          id
          name
        }
        blog {
          user_id
        }
      }
    }
  }
`;

export const DELETE_BLOG_MUTATION = gql`
  mutation DeleteBlog($id: String!) {
    delete_blogs_by_pk(id: $id) {
      id
    }
  }
`;

export const UPVOTE_BLOG_MUTATION = gql`
  mutation UpvoteBlog($id: String!) {
    update_blogs_by_pk(pk_columns: { id: $id }, _inc: { likes: 1 }) {
      id
    }
  }
`;
