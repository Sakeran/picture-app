import React from 'react';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { MemoryRouter as Router } from 'react-router-dom';

import { PostList } from './PostList';

// Mocks/Factories

const makePost = (id) => ({
  id: id,
  type: 'image',
  image: 'http://localhost:3001/exampleImg.png',
  title: 'test card ' + id,
  youtubeID: 'xxxxxxxxxxx'
});

test('renders PostList element correctly', () => {
  const posts = [1,2,3,4,5].map(i => makePost(i));
  const component = shallow(<PostList posts={posts} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
