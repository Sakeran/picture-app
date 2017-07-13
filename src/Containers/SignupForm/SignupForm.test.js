import React from 'react';
import { SignupForm } from './SignupForm';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

test('renders all fields correctly', () => {
  const fn = () => null;
  const component = mount(<SignupForm sendFunc={fn}/>);
  expect(component.find('input[name="username"]').exists()).toBe(true);
  expect(component.find('input[name="password"]').exists()).toBe(true);
  expect(component.find('input[name="passwordConfirm"]').exists()).toBe(true);
  expect(component.find('input[type="submit"]').exists()).toBe(true);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('calls a login function when given valid data', (done) => {
  const userData = {username: 'user'};
  const sendFn = () => Promise.resolve(JSON.stringify(userData));
  const loginFn = jest.fn();
  const component = mount(<SignupForm sendFunc={sendFn} loginUser={loginFn} />);

  component.find('input[name="username"]')
  .simulate('change', { target: {value: 'user'} });

  component.find('input[name="password"]')
  .simulate('change', { target: {value: 'password'} });

  component.find('input[name="passwordConfirm"]')
  .simulate('change', { target: {value: 'password'} });

  component.find('form').simulate('submit');
  process.nextTick(() => {
    expect(loginFn.mock.calls).toHaveLength(1);
    done();
  });
});

test('does not call a login function when given invalid data', (done) => {
  const userData = {username: 'user'};
  const sendFn = () => Promise.resolve(JSON.stringify(userData));
  const loginFn = jest.fn();
  const component = mount(<SignupForm sendFunc={sendFn} loginUser={loginFn} />);

  component.find('input[name="username"]')
  .simulate('change', { target: {value: 'user'} });

  component.find('input[name="password"]')
  .simulate('change', { target: {value: 'password'} });

  // Skip Password Confirm field on purpose

  component.find('form').simulate('submit');

  process.nextTick(() => {
    expect(loginFn.mock.calls.length).toBe(0);
    done();
  });
});
