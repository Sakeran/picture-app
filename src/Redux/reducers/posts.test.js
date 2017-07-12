import postsReducer from './posts';

describe('post reducer', () => {
    const postOne = {
      id: 'aabbccddeeffgg',
      title: 'Post One',
      description: 'A post for testing.',
      type: 'image',
      imageLink: 'http://via.placeholder.com/100x100'
    };

    it('Can add a new post to the state', () => {
      const state = {};
      const newState = postsReducer(state, {type: 'ADD_POST', post: postOne});
      expect(newState['aabbccddeeffgg']).not.toBeUndefined();
      expect(newState['aabbccddeeffgg'].title).toBe('Post One');
    });

    it('Can remove a post from the state', () => {
      const state = {aabbccddeeffgg: postOne};
      const newState = postsReducer(state, {type: 'REMOVE_POST', id: 'aabbccddeeffgg'});
      expect(newState['aabbccddeeffgg']).toBeUndefined();
    })
});
