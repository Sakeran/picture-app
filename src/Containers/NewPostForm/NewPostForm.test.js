import React from 'react';
import { NewPostForm } from './NewPostForm';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

test('renders all fields correctly', () => {
  const fn = () => null;
  const component = mount(<NewPostForm sendFunc={fn}/>);
  expect(component.find('input[name="link"]').exists()).toBe(true);
  expect(component.find('input[name="title"]').exists()).toBe(true);
  expect(component.find('textarea[name="description"]').exists()).toBe(true);
  expect(component.find('input[type="submit"]').exists()).toBe(true);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
