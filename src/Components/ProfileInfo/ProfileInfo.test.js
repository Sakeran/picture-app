import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ProfileInfo from './ProfileInfo';

test('ProfileInfo renders correctly', () => {
  const props = {
    name: 'Test User',
    location: 'Somewhere',
    bio: 'A test user.'
  };
  const component = shallow(<ProfileInfo {...props} />);
  expect(component.text()).toContain('Test User');
  expect(component.text()).toContain('Somewhere');
  expect(component.text()).toContain('A test user');
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
