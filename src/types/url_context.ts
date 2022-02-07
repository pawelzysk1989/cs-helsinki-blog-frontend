export type UrlContext = 'blog' | 'user';

export const UserContextParams = {
  userId: 'userId',
} as const;

export const BlogContextParams = {
  blogId: 'blogId',
} as const;

type ParamToValue<T> = { [k in keyof T]: string };

export type ContextParams<T extends UrlContext> = 'user' extends T
  ? ParamToValue<typeof UserContextParams>
  : 'blog' extends T
  ? ParamToValue<typeof BlogContextParams>
  : never;
