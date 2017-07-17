import query from './query';

export default () => {
  const myQuery = `query LatestPostsQuery{
    posts {
      id
      image
    }
  }`

  return query({
    query: myQuery,
  })
  .then(res => res.posts);
};
