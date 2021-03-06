import React from 'react';
import { LoginForm } from './LoginForm';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';

test('renders all fields correctly', () => {
  const fn = () => null;
  const component = mount(<LoginForm sendFunc={fn}/>);
  expect(component.find('input[name="username"]').exists()).toBe(true);
  expect(component.find('input[name="password"]').exists()).toBe(true);
  expect(component.find('input[type="submit"]').exists()).toBe(true);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('calls a login function when given valid data', (done) => {
  const mockResult = { data: { some: 'values'} }
  const loginFn = jest.fn();
  loginFn.mockReturnValue(Promise.resolve(mockResult));
  const props = {
    mutate: loginFn,
    flashSuccess: jest.fn(),
    flashError: jest.fn(),
    requestRedirect: jest.fn()
  };
  const component = mount(<LoginForm {...props} />);

  component.find('input[name="username"]')
  .simulate('change', { target: {value: 'user'} });

  component.find('input[name="password"]')
  .simulate('change', { target: {value: 'password'} });

  component.find('form').simulate('submit');

  process.nextTick(() => {
    expect(loginFn.mock.calls.length).toBe(1);
    done();
  });
});

test('does not call a login function when given invalid data', (done) => {
  const mockResult = { data: { some: 'values'} }
  const loginFn = jest.fn();
  loginFn.mockReturnValue(Promise.resolve(mockResult));
  const props = {
    mutate: loginFn,
    flashSuccess: jest.fn(),
    flashError: jest.fn(),
    requestRedirect: jest.fn()
  };
  const component = mount(<LoginForm {...props} />);

  component.find('input[name="username"]')
  .simulate('change', { target: {value: 'user'} });

  // Skip password field on purpose

  component.find('form').simulate('submit');

  process.nextTick(() => {
    expect(loginFn.mock.calls.length).toBe(0);
    done();
  });
});
