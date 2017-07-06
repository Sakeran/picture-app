import React from 'react';
import { SignupForm } from './SignupForm';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

test('renders all fields correctly', () => {
  const fn = () => null;
  const component = shallow(<SignupForm sendFunc={fn}/>);
  expect(component.find('input[name="username"]').exists()).toBe(true);
  expect(component.find('input[name="password"]').exists()).toBe(true);
  expect(component.find('input[name="passwordConfirm"]').exists()).toBe(true);
  expect(component.find('input[type="submit"]').exists()).toBe(true);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
})
