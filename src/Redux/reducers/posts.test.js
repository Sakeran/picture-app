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

    it('Updates existing posts with newer information', () => {
      const postData = {
        id: '1111111111',
        type: 'image',
        description: 'test',
        likeCount: 0
      };

      const state = {
        '1111111111': Object.assign({}, postData)
      };

      const newPostData = {
        id: '1111111111',
        likeCount: 1
      }

      const newState = postsReducer(state, {type: 'ADD_POST', post: newPostData});

      expect(state !== newState);
      expect(state['1111111111'] !== newState['11111111111']);
      expect(newState['1111111111'].id).toBe(state['1111111111'].id);
      expect(newState['1111111111'].type).toBe(state['1111111111'].type);
      expect(newState['1111111111'].likeCount).not.toBe(state['1111111111'].likeCount);
      expect(newState['1111111111'].likeCount).toBe(1);
    });

    it('Can remove a post from the state', () => {
      const state = {aabbccddeeffgg: postOne};
      const newState = postsReducer(state, {type: 'REMOVE_POST', id: 'aabbccddeeffgg'});
      expect(newState['aabbccddeeffgg']).toBeUndefined();
    })
});
