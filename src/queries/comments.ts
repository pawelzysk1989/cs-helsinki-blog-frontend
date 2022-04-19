import { gql } from '@apollo/client';

export const POST_BLOG_COMMENT_MUTATION = gql`
  mutation PostBlogComment($blogId: String!, $content: String!) {
    insert_comments_one(object: { blog_id: $blogId, content: $content }) {
      id
      blog_id
      content
      created_at
      updated_at
    }
  }
`;
