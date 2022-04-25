import { gql } from '@apollo/client';

export const FETCH_BLOGS_QUERY = gql`
  query FetchBlogs {
    blogs(order_by: { created_at: desc }) {
      id
      author
      created_at
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
      likes {
        id
        blog_id
        user_id
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
  mutation UpvoteBlog($blog_id: String!) {
    insert_blog_likes_one(object: { blog_id: $blog_id }) {
      id
    }
  }
`;
