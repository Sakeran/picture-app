import React from 'react';
import { App } from './App';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

it('renders without crashing', () => {
  const component = shallow(<App />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
