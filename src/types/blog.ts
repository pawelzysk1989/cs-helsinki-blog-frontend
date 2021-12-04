export interface Blog {
  id: string;
  title: string;
  author: string;
  url: string;
  likes?: number;
}

export type BlogForm = Omit<Blog, 'id'>;
