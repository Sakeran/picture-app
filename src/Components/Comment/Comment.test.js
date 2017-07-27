import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Link } from 'react-router-dom';
import Comment from './Comment';

const testComment = {
  text: 'Test Comment',
  user: {
    id: '1111',
    username: 'Test User'
  },
  date: 'January 1st 2001'
};

test('Comment component renders correctly', () => {
  const component = shallow(<Comment comment={testComment} />);
  expect(component.find(Link)).toHaveLength(1);
  expect(component.text()).toContain('Test Comment');
  expect(component.text()).toContain('January 1st 2001');
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
