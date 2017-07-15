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
  youtubeID: null
});

const getPost = (id) => Promise.resolve(makePost(id));

const mountWithRouter = node => mount(<Router>{node}</Router>);

test('renders PostList element correctly', () => {
  const ids = ['11111','22222','33333','44444','55555'];
  const posts = {};
  ids.forEach(e => { posts[e] = makePost(e)});
  const component = shallow(<PostList postIDs={ids} getPost={getPost} posts={posts} addPost={jest.fn()}/>);
  const tree = toJson(component);
  expect(tree).toMatchSnapshot();
});

test('queries for posts not present in store', (done) => {
  const ids = ['11111','22222','33333','44444','55555'];
  const posts = {};
  const addPost = jest.fn();
  const component = mountWithRouter(<PostList postIDs={ids} getPost={getPost} posts={posts} addPost={addPost}/>);
  process.nextTick(() => {
    expect(addPost.mock.calls).toHaveLength(5);
    done();
  });
});

test('does not query for posts present in store', (done) => {
  const ids = ['11111','22222','33333','44444','55555'];
  const posts = {};
  ids.forEach(e => { posts[e] = makePost(e)});
  const addPost = jest.fn();
  const component = mountWithRouter(<PostList postIDs={ids} getPost={getPost} posts={posts} addPost={addPost}/>);
  process.nextTick(() => {
    expect(addPost.mock.calls).toHaveLength(0);
    done();
  });
});
