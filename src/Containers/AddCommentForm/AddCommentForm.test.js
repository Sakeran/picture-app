import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { AddCommentForm } from './AddCommentForm';

test('AddCommentForm renders correctly', () => {
  const component = shallow(<AddCommentForm />);
  expect(component.find('textarea[name="comment"]')).toHaveLength(1);
  expect(component.find('input[type="submit"]')).toHaveLength(1);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
