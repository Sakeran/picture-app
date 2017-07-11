import query from './query';

export default (username, password, passwordConfirm) => {
  const myQuery = `query {
    posts {
      title
    }
  }`

  return query({
    query: myQuery,
  })
  .then(res => res.posts);
};
