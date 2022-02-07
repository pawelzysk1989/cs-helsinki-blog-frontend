import '@testing-library/jest-dom';

import { fireEvent, render, RenderResult } from '@testing-library/react';
import * as React from 'react';

import { blog } from '../fixtures/blog';
import BlogRow from './BlogDetails';

describe('<BlogRow />', () => {
  let component: RenderResult;
  let onLike: jest.Mock<any, any>;
  let onDelete: jest.Mock<any, any>;

  beforeEach(() => {
    onLike = jest.fn();
    onDelete = jest.fn();
    component = render(
      <BlogRow blog={blog} loggedUser={blog.user} onLike={onLike} onDelete={onDelete} />,
    );
  });

  test('displays the title and the author', () => {
    const title = component.getByText(`${blog.title} by ${blog.author}`);
    expect(title).toBeVisible();
  });

  test('displays link', () => {
    const link = component.getByText('link');
    expect(link).toHaveAttribute('href', blog.url);
  });

  test('displays number of likes', () => {
    const likes = component.container.querySelector('.likes');
    expect(likes).toHaveTextContent(blog.likes.toString());
  });

  test('triggers onLike when like button clicked', () => {
    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    expect(onLike).toBeCalledTimes(1);
    expect(onLike).toBeCalledWith(blog);
  });

  test('triggers onLike twice when like button clicked twice', () => {
    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);
    expect(onLike).toBeCalledTimes(2);
  });

  test('triggers onDelete when delete button clicked', () => {
    const deleteButton = component.getByText('delete');
    fireEvent.click(deleteButton);
    expect(onDelete).toBeCalledTimes(1);
    expect(onDelete).toBeCalledWith(blog);
  });
});
