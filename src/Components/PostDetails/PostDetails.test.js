import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import PostDetails from './PostDetails';

test('PostDetails component renders correctly', () => {
    const props = {
      title: 'Test Post',
      description: 'A test post.',
      postDate: 'January 1st 2001',
      creator: {
        id: '1111',
        username: 'Test User'
      }
    };
    const component = shallow(<PostDetails {...props} />);
    const tree = toJson(component);
    expect(tree).toMatchSnapshot();
});
