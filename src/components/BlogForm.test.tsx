import '@testing-library/jest-dom';

import { fireEvent, render, RenderResult } from '@testing-library/react';
import * as React from 'react';

import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  let component: RenderResult;
  let onSubmit = jest.fn();

  beforeEach(() => {
    component = render(<BlogForm onSubmit={onSubmit} />);
  });

  test('calls onSubmit when form is submitted', async () => {
    const titleInput = await component.findByLabelText('title');
    const authorInput = await component.findByLabelText('author');
    const urlInput = await component.findByLabelText('url');
    const form = component.container.querySelector('.form')!;
    const title = 'some_title';
    const author = 'some_author';
    const url = 'some_url';

    fireEvent.change(titleInput, {
      target: { value: title },
    });
    fireEvent.change(authorInput, {
      target: { value: author },
    });
    fireEvent.change(urlInput, {
      target: { value: url },
    });
    fireEvent.submit(form);

    expect(onSubmit).toBeCalledTimes(1);
    expect(onSubmit).toBeCalledWith({
      title,
      author,
      url,
    });
  });
});
