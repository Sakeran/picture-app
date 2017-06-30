import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Nav from './Nav';
import { Link } from 'react-router-dom';

test('Nav component renders', () => {
  const component = shallow(<Nav />);
});

test('Nav component shows login link when logged out', () => {
  const user = null;
  const component = shallow(<Nav user={user} />);
  expect(component.exists({to: "/login"})).toBe(true);
  const tree = toJSON(component);
  expect(tree).toMatchSnapshot();
});

test('Nav component shows logout link when logged in', () => {
  const user = null;
  const component = shallow(<Nav user={user} />);
  expect(component.exists({to: "/logout"})).toBe(true);
  const tree = toJSON(component);
  expect(tree).toMatchSnapshot();
});
