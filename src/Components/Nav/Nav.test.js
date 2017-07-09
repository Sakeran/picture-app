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
  expect(component.find({to: "/login"}).exists()).toBe(true);
  expect(component.find('#logoutBtn').exists()).toBe(false);
  const tree = toJSON(component);
  expect(tree).toMatchSnapshot();
});

test('Nav component shows logout link when logged in', () => {
  const user = {data : 'Some User Data'};
  const component = shallow(<Nav user={user} />);
  expect(component.find('#logoutBtn').exists()).toBe(true);
  expect(component.find({to: "/login"}).exists()).toBe(false);
  const tree = toJSON(component);
  expect(tree).toMatchSnapshot();
});

test('Nav component has proper class when menu toggled on', () => {
  const component = shallow(<Nav toggled={true} />);
  expect(component.find('.Nav-is-toggled').exists()).toBe(true);
});

test('Nav component has proper class when menu toggled off', () => {
  const component = shallow(<Nav toggled={false} />);
  expect(component.find('.Nav-is-toggled').exists()).toBe(false);
});
