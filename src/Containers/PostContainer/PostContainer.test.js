import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { PostContainer } from './PostContainer';

const makePost = (id, type) => ({
  id: id,
  type: type || 'image',
  image: 'http://localhost:3001/exampleImg.png',
  title: 'test card ' + id,
  youtubeID: 'xxxxxxxxxxx',
  creator: {
    id: '100',
    username: 'testUser'
  }
});

test('it renders correctly', () => {
  const data = {
    post: makePost('1')
  }
  const component = shallow(<PostContainer postId="1" data={data} />);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
