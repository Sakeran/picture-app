import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PostStats from './PostStats';

test('renders correctly when "liked" is false', () => {
  const component = shallow(<PostStats liked={false} likeCount={0} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('renders correctly when "liked" is true', () => {
  const component = shallow(<PostStats liked={true} likeCount={1} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
