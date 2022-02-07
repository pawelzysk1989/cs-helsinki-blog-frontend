import { Params } from 'react-router-dom';

import {
  BlogContextParams,
  ContextParams,
  UrlContext,
  UserContextParams,
} from '../types/url_context';

const getParams = <T extends UrlContext>(
  urlContext: T,
  urlParams: Readonly<Params<string>>,
): ContextParams<T> => {
  switch (urlContext) {
    case 'user': {
      const userId = urlParams[UserContextParams.userId];
      if (!userId) {
        throw Error('URL param `userId` not found');
      }
      return {
        userId,
      } as ContextParams<T>;
    }
    case 'blog': {
      const blogId = urlParams[BlogContextParams.blogId];
      if (!blogId) {
        throw Error('URL param `blogId` not found');
      }
      return {
        blogId,
      } as ContextParams<T>;
    }
    default: {
      const _exhaustiveCheck: never = urlContext;
      return _exhaustiveCheck;
    }
  }
};

export default {
  getParams,
};
