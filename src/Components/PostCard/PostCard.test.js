import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

import PostCard from './PostCard';

test('PostCard element renders correctly', () => {
  const post = {
    type: 'image',
    image: 'http://localhost:3001/exampleImg.png',
    title: 'test card',
    youtubeID: null
  };
  const component = mount(<PostCard post={post} />);
  expect(component.find('img')).toHaveLength(1);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
