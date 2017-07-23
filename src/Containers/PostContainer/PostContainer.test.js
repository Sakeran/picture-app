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
  description: 'Test post.',
  creator: {
    id: '100',
    username: 'testUser'
  },
  postDate: 'May 1st 2000'
});

test('it renders correctly', () => {
  const data = {
    post: makePost('1')
  };
  const userData = {
    currentUser: {
      id: '1111',
      likesPost: false
    }
  }
  const component = shallow(<PostContainer postId="1" PostQuery={data} UserQuery={userData}/>);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
