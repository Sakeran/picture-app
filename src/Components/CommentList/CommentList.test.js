import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import CommentList from './CommentList';

const makeComment = (id) => ({
  id,
  text: 'Test Comment ' + id,
  user: {
    username: 'Test User'
  },
  date: 'January 1st 2001'
});

test('CommentList component renders correctly with comments', () => {
  const comments = [1,2,3].map(id => makeComment(id) );
  const props = {
    comments,
    count: 3,
    loadMore: jest.fn()
  };
  const component = shallow(<CommentList {...props} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('CommentList component renders correctly with no comments', () => {
  const props = {
    comments: [],
    count: 0,
    loadMore: jest.fn()
  };
  const component = shallow(<CommentList {...props} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
