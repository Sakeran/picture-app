import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import {ProfileContainer} from './ProfileContainer';
import {PostList} from '../PostList/PostList';
import ProfileInfo from '../../Components/ProfileInfo/ProfileInfo';

const makePost = (id) => ({
  id,
  image: 'http://example.com/img.png',
  likeCount: 0,
  commentCount: 0,
});

const testPosts = [1,2,3].map(i => makePost(i));

test('Renders properly while loading', () => {
  const containerProps = {
    userId: '11111',
    data: {
      loading: true
    }
  };
  const component = shallow(<ProfileContainer {...containerProps} />);
  expect(component.find(ProfileInfo)).toHaveLength(0);
  expect(component.find(PostList)).toHaveLength(0);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('Renders properly with an error', () => {
  const containerProps = {
    userId: '11111',
    data: {
      loading: false,
      error: true,
    }
  };
  const component = shallow(<ProfileContainer {...containerProps} />);
  expect(component.find(ProfileInfo)).toHaveLength(0);
  expect(component.find(PostList)).toHaveLength(0);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('Renders properly when loaded', () => {
  const containerProps = {
    userId: '11111',
    data: {
      loading: false,
      error: false,
      user: {
        profile: {
          name: 'Test User',
          location: 'Somewhere',
          bio: 'A test user',
        },
        posts: testPosts,
        postCount: testPosts.length
      }
    }
  };
  const component = shallow(<ProfileContainer {...containerProps} />);
  expect(component.find(ProfileInfo)).toHaveLength(1);
  expect(component.find(PostList)).toHaveLength(1);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});
