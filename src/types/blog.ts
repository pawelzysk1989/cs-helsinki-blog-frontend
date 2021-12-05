export interface Blog {
  id: string;
  title: string;
  author: string;
  url: string;
  likes: number;
}

export type BlogFormState = Omit<Blog, 'id' | 'likes'>;
