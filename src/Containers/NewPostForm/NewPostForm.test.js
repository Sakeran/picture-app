import React from 'react';
import { NewPostForm } from './NewPostForm';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

test('renders all fields correctly', () => {
  const fn = () => null;
  const component = mount(<NewPostForm mutate={fn}/>);
  expect(component.find('input[name="link"]').exists()).toBe(true);
  expect(component.find('input[name="title"]').exists()).toBe(true);
  expect(component.find('textarea[name="description"]').exists()).toBe(true);
  expect(component.find('input[type="submit"]').exists()).toBe(true);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('calls a mutate function when given valid input', (done) => {
  const mockResult = { data: { newPost: 'postValues'} }
  const createFn = jest.fn();
  createFn.mockReturnValue(Promise.resolve(mockResult));
  const flashSuccess = jest.fn();
  const flashError = jest.fn();
  const requestRedirect = jest.fn();
  const props = {
    mutate: createFn,
    flashSuccess,
    flashError,
    requestRedirect
  };
  const component = mount(<NewPostForm {...props} />);

  component.find('input[name="link"]')
  .simulate('change', { target: {value: 'http://example.com/img.png'} });

  component.find('input[name="title"]')
  .simulate('change', { target: {value: 'Test Post'} });

  component.find('form').simulate('submit');

  process.nextTick(() => {
    expect(createFn.mock.calls.length).toBe(1);
    expect(flashSuccess.mock.calls.length).toBe(1);
    expect(requestRedirect.mock.calls.length).toBe(1);
    expect(flashError.mock.calls.length).toBe(0);
    done();
  });
});

test('does not call a mutate function when given invalid input', (done) => {
  const mockResult = { data: { newPost: 'postValues'} }
  const createFn = jest.fn();
  createFn.mockReturnValue(Promise.resolve(mockResult));
  const flashSuccess = jest.fn();
  const flashError = jest.fn();
  const requestRedirect = jest.fn();
  const props = {
    mutate: createFn,
    flashSuccess,
    flashError,
    requestRedirect
  };
  const component = mount(<NewPostForm {...props} />);

  component.find('input[name="link"]')
  .simulate('change', { target: {value: 'http://example.com/img.png'} });

  // Skip Title Field

  component.find('form').simulate('submit');

  process.nextTick(() => {
    expect(createFn.mock.calls.length).toBe(0);
    expect(flashSuccess.mock.calls.length).toBe(0);
    expect(requestRedirect.mock.calls.length).toBe(0);
    expect(flashError.mock.calls.length).toBe(0);
    done();
  });
});
