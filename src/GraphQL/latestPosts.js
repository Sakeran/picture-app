import query from './query';

export default () => {
  const myQuery = `query {
    posts {
      id
      title
      description
      type
      image
      youtubeID
    }
  }`

  return query({
    query: myQuery,
  })
  .then(res => res.posts);
};
