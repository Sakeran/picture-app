import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import PostStats from './PostStats';

test('renders correctly when "liked" is false', () => {
  const component = shallow(<PostStats liked={false} />);
  const tree = toJson(component);
  expect(component.find('.PostStats-is-liked')).toHaveLength(0);
  expect(tree).toMatchSnapshot();
});

test('renders correctly when "liked" is false', () => {
  const component = shallow(<PostStats liked={true} />);
  const tree = toJson(component);
  expect(component.find('.PostStats-is-liked')).toHaveLength(1);
  expect(tree).toMatchSnapshot();
});
